import { createServer } from 'node:http';
import { readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import { watch } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const frameworkSrc = resolve(__dirname, '..', 'src');
const blueprintsDir = resolve(__dirname, '..', 'blueprints');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const HMR_CLIENT = `<script>
(function(){
  const es = new EventSource('/__decantr_hmr');
  es.onmessage = function(e) {
    const d = JSON.parse(e.data);
    if (d.type === 'reload') location.reload();
  };
  es.onerror = function() { setTimeout(() => location.reload(), 1000); };
})();
</script>`;

const IMPORT_MAP = {
  'themes': 'css/theme-registry.js',
  'styles': 'css/theme-registry.js'
};

/**
 * @param {string} source
 * @returns {string}
 */
function rewriteImports(source) {
  return source.replace(
    /from\s+['"]decantr(?:\/([^'"]*))?\s*['"]/g,
    (match, subpath) => {
      const mod = subpath || 'core';
      const mapped = IMPORT_MAP[mod];
      if (mapped) return `from '/__decantr/${mapped}'`;
      // Kit imports: decantr/kit/dashboard → /__decantr/kit/dashboard/index.js
      if (mod.startsWith('kit/')) return `from '/__decantr/${mod}/index.js'`;
      return `from '/__decantr/${mod}/index.js'`;
    }
  );
}

/**
 * Check if a project has been scaffolded.
 * @param {string} projectRoot
 * @returns {Promise<boolean>}
 */
async function isScaffolded(projectRoot) {
  // Check config flag first
  try {
    const raw = await readFile(join(projectRoot, 'decantr.config.json'), 'utf-8');
    const cfg = JSON.parse(raw);
    if (cfg.scaffolded === false) return false;
  } catch { /* no config or parse error */ }

  // Fallback: check if src/app.js exists
  try {
    const s = await stat(join(projectRoot, 'src', 'app.js'));
    return s.isFile();
  } catch {
    return false;
  }
}

/**
 * Generate the wizard HTML shell.
 * @returns {string}
 */
function wizardHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>decantr — Project Wizard</title>
  <style>:root{--c0:#ffffff;--c1:#1366D9;--c2:#f8fafc;--c3:#020817;--c4:#606D80;--c5:#DDE3ED;--c6:#0f52b5;--c7:#22c55e;--c8:#f59e0b;--c9:#ef4444;--d-radius:8px;--d-radius-lg:16px;--d-shadow:none;--d-transition:all 0.3s cubic-bezier(0.4,0,0.2,1);--d-pad:1.5rem}*{margin:0;box-sizing:border-box}body{font-family:Inter,"Inter Fallback",system-ui,sans-serif;color:var(--c3);background:var(--c0);min-height:100vh}a{color:var(--c1);text-decoration:none}a:hover{color:var(--c6)}</style>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/__decantr/wizard/index.js"></script>
${HMR_CLIENT}
</body>
</html>`;
}

/**
 * @param {string} projectRoot
 * @param {number} port
 */
export function startDevServer(projectRoot, port = 3000) {
  /** @type {Set<import('node:http').ServerResponse>} */
  const sseClients = new Set();

  /** @type {boolean|null} */
  let scaffoldedCache = null;

  const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`);
    let pathname = url.pathname;

    // SSE endpoint
    if (pathname === '/__decantr_hmr') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
      res.write('data: {"type":"connected"}\n\n');
      sseClients.add(res);
      req.on('close', () => sseClients.delete(res));
      return;
    }

    // --- Blueprint API endpoints ---

    // GET /__decantr/blueprints — full catalog
    if (pathname === '/__decantr/blueprints' && req.method === 'GET') {
      try {
        const { loadCatalog } = await import('./scaffolder.js');
        const catalog = await loadCatalog();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(catalog));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
      return;
    }

    // GET /__decantr/blueprints/:cat/:id — single blueprint
    const bpMatch = pathname.match(/^\/__decantr\/blueprints\/([^/]+)\/([^/]+)$/);
    if (bpMatch && req.method === 'GET') {
      try {
        const filePath = join(blueprintsDir, bpMatch[1], `${bpMatch[2]}.json`);
        const content = await readFile(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(content);
      } catch (e) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Blueprint not found' }));
      }
      return;
    }

    // POST /__decantr/scaffold — run scaffolder
    if (pathname === '/__decantr/scaffold' && req.method === 'POST') {
      let body = '';
      for await (const chunk of req) body += chunk;

      try {
        const { blueprint, options } = JSON.parse(body);
        const { scaffoldProject, getRequiredDirs } = await import('./scaffolder.js');

        const files = await scaffoldProject(projectRoot, blueprint, options);
        const dirs = getRequiredDirs(files);

        // Create directories
        for (const dir of dirs) {
          await mkdir(join(projectRoot, dir), { recursive: true });
        }

        // Write files
        for (const [path, content] of files) {
          await writeFile(join(projectRoot, path), content + '\n');
        }

        // Auto npm install for npm icon delivery
        if (options.iconDelivery === 'npm' && options.icons) {
          try {
            execSync('npm install', { cwd: projectRoot, stdio: 'pipe', timeout: 60000 });
            console.log('  [scaffold] npm install completed (icon package installed)');
          } catch (e) {
            console.log('  [scaffold] npm install failed — run manually:', e.message);
          }
        }

        scaffoldedCache = true;

        // Broadcast HMR reload
        for (const client of sseClients) {
          client.write('data: {"type":"reload"}\n\n');
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, files: files.map(f => f[0]) }));
      } catch (e) {
        console.error('  [scaffold] Error:', e.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(e.message);
      }
      return;
    }

    // Serve framework source files (including wizard and kit)
    if (pathname.startsWith('/__decantr/')) {
      const modPath = pathname.slice('/__decantr/'.length);
      const filePath = join(frameworkSrc, modPath);
      return serveFile(filePath, res, true);
    }

    // --- Wizard vs normal serving ---

    // Check scaffold state (cache for performance)
    if (scaffoldedCache === null) {
      scaffoldedCache = await isScaffolded(projectRoot);
    }

    // If not scaffolded, serve wizard
    if (!scaffoldedCache) {
      if (pathname === '/' || pathname === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
        res.end(wizardHtml());
        return;
      }
    }

    // Try public/ first, then src/
    if (pathname === '/') pathname = '/index.html';

    const publicPath = join(projectRoot, 'public', pathname);
    const srcPath = join(projectRoot, pathname.startsWith('/src/') ? pathname : `src/${pathname}`);

    // Try public first
    if (await fileExists(publicPath)) {
      return serveFile(publicPath, res, false, pathname.endsWith('.html'));
    }

    // Try src
    if (pathname.startsWith('/src/') && await fileExists(join(projectRoot, pathname))) {
      return serveFile(join(projectRoot, pathname), res, true);
    }

    // SPA fallback: serve index.html for non-file routes
    if (!extname(pathname)) {
      const indexPath = join(projectRoot, 'public', 'index.html');
      if (await fileExists(indexPath)) {
        return serveFile(indexPath, res, false, true);
      }
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  });

  async function serveFile(filePath, res, rewrite = false, injectHmr = false) {
    try {
      const ext = extname(filePath);
      const mime = MIME[ext] || 'application/octet-stream';
      const isText = ext === '.js' || ext === '.mjs' || ext === '.css' || ext === '.html' || ext === '.json' || ext === '.svg';

      if (!isText) {
        const buf = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'no-store' });
        res.end(buf);
        return;
      }

      let content = await readFile(filePath, 'utf-8');

      if (rewrite && ext === '.js') {
        content = rewriteImports(content);
      }

      if (injectHmr) {
        content = content.replace('</body>', `${HMR_CLIENT}\n</body>`);
      }

      res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'no-store' });
      res.end(content);
    } catch (e) {
      const rel = filePath.startsWith(projectRoot) ? filePath.slice(projectRoot.length + 1) : filePath;
      console.error(`  [error] Failed to serve ${rel}: ${e.message}`);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
    }
  }

  async function fileExists(path) {
    try {
      const s = await stat(path);
      return s.isFile();
    } catch {
      return false;
    }
  }

  // Watch src/ for changes
  try {
    watch(join(projectRoot, 'src'), { recursive: true }, (eventType, filename) => {
      console.log(`  [hmr] ${eventType}: ${filename}`);
      for (const client of sseClients) {
        client.write('data: {"type":"reload"}\n\n');
      }
    });
  } catch (e) {
    console.log('  [warn] File watching not available');
  }

  // Log config info at startup
  readFile(join(projectRoot, 'decantr.config.json'), 'utf-8').then(raw => {
    try {
      const cfg = JSON.parse(raw);
      const scaffoldStatus = cfg.scaffolded === false ? ' (unscaffolded — wizard active)' : '';
      console.log(`  Config: decantr.config.json (theme: ${cfg.theme || 'default'}, router: ${cfg.router || 'hash'}, port: ${port})${scaffoldStatus}`);
    } catch { console.log('  [warn] decantr.config.json found but could not be parsed'); }
  }).catch(() => {
    console.log(`  Config: no decantr.config.json found, using defaults (port: ${port})`);
  });

  server.listen(port, () => {
    console.log(`\n  decantr dev server running at http://localhost:${port}\n`);
    console.log('  Watching src/ for changes...\n');
  });

  return server;
}
