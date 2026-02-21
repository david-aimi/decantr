import { mkdir, writeFile } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { welcome, success, info, heading } from '../art.js';

/**
 * Minimal skeleton init — no prompts, no terminal wizard.
 * Creates a bare project that launches the visual wizard via `decantr dev`.
 */
export async function run() {
  const cwd = process.cwd();
  const name = process.argv[3] || basename(cwd);

  console.log(welcome('0.3.0'));
  console.log(heading('Creating project skeleton...'));

  // Create directories
  const dirs = ['public', '.decantr', 'src'];
  for (const dir of dirs) {
    await mkdir(join(cwd, dir), { recursive: true });
  }

  // Minimal config with scaffolded: false
  const config = JSON.stringify({
    $schema: 'https://decantr.ai/schemas/config.v2.json',
    name,
    scaffolded: false,
    dev: { port: 4200 },
    build: { outDir: 'dist' }
  }, null, 2);

  // Minimal package.json
  const pkg = JSON.stringify({
    name,
    version: '0.1.0',
    type: 'module',
    scripts: {
      dev: 'decantr dev',
      build: 'decantr build',
      test: 'decantr test'
    },
    dependencies: {
      decantr: '^0.3.0'
    }
  }, null, 2);

  // Minimal HTML shell (will be replaced by scaffolder)
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${name}</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>`;

  // Manifest
  const manifestJson = JSON.stringify({
    $schema: 'https://decantr.ai/schemas/manifest.v2.json',
    version: '0.3.0',
    name,
    scaffolded: false,
    entrypoint: 'src/app.js',
    shell: 'public/index.html',
    mountTarget: '#app'
  }, null, 2);

  const files = [
    ['package.json', pkg],
    ['decantr.config.json', config],
    ['public/index.html', html],
    ['.decantr/manifest.json', manifestJson]
  ];

  for (const [path, content] of files) {
    await writeFile(join(cwd, path), content + '\n');
    console.log('  ' + success(path));
  }

  console.log('');
  console.log(heading('Project skeleton created!'));
  console.log(info('Next steps:'));
  console.log('    npm install');
  console.log('    npx decantr dev    \u2190 launches the visual wizard');
  console.log('');
}
