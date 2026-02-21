// Resets playground/ to unscaffolded skeleton state for wizard testing.
// Run: npm run reset (or: node tools/reset-playground.js)

import { rm, writeFile, mkdir } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pg = join(__dirname, '..', 'playground');

// 0. Kill any dev server on port 4200
try {
  const pid = execSync('lsof -ti :4200', { encoding: 'utf8' }).trim();
  if (pid) {
    process.kill(Number(pid));
    console.log(`Killed dev server (pid ${pid}) on port 4200.`);
  }
} catch {
  // nothing listening on 4200
}

// 1. Delete scaffolded content
await rm(join(pg, 'src'), { recursive: true, force: true });
await rm(join(pg, 'test'), { recursive: true, force: true });
await rm(join(pg, 'CLAUDE.md'), { force: true });
await rm(join(pg, 'dist'), { recursive: true, force: true });
await rm(join(pg, 'public', 'vendor'), { recursive: true, force: true });

// 2. Re-create empty src/
await mkdir(join(pg, 'src'), { recursive: true });

// 3. Write unscaffolded config
await writeFile(join(pg, 'decantr.config.json'), JSON.stringify({
  $schema: 'https://decantr.ai/schemas/config.v2.json',
  name: 'playground',
  scaffolded: false,
  dev: { port: 4200 },
  build: { outDir: 'dist' }
}, null, 2) + '\n');

// 4. Write unscaffolded manifest
await mkdir(join(pg, '.decantr'), { recursive: true });
await writeFile(join(pg, '.decantr', 'manifest.json'), JSON.stringify({
  $schema: 'https://decantr.ai/schemas/manifest.v2.json',
  version: '0.3.0',
  name: 'playground',
  scaffolded: false,
  entrypoint: 'src/app.js',
  shell: 'public/index.html',
  mountTarget: '#app'
}, null, 2) + '\n');

// 5. Write minimal HTML shell
await writeFile(join(pg, 'public', 'index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>playground</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
`);

console.log('Playground reset to unscaffolded state.');
console.log('Run: cd playground && npx decantr dev');
