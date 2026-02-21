import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('scaffolder', () => {
  it('loadBlueprint loads a valid blueprint', async () => {
    const { loadBlueprint } = await import('../tools/scaffolder.js');
    const bp = await loadBlueprint('dashboard/analytics');
    assert.equal(bp.id, 'analytics');
    assert.equal(bp.category, 'dashboard');
    assert.ok(Array.isArray(bp.routes));
    assert.ok(bp.pages);
  });

  it('loadCatalog returns full catalog', async () => {
    const { loadCatalog } = await import('../tools/scaffolder.js');
    const catalog = await loadCatalog();
    assert.ok(catalog.categories);
    assert.ok(catalog.categories.length >= 3);
    for (const cat of catalog.categories) {
      assert.ok(cat.id);
      assert.ok(Array.isArray(cat.variants));
    }
  });

  it('scaffoldProject generates file list for analytics', async () => {
    const { scaffoldProject } = await import('../tools/scaffolder.js');
    const files = await scaffoldProject('/tmp/test-project', 'dashboard/analytics', {
      name: 'test-app',
      theme: 'dark',
      router: 'hash'
    });
    assert.ok(Array.isArray(files));
    assert.ok(files.length > 0);

    const paths = files.map(f => f[0]);
    assert.ok(paths.includes('package.json'), 'has package.json');
    assert.ok(paths.includes('decantr.config.json'), 'has config');
    assert.ok(paths.includes('public/index.html'), 'has index.html');
    assert.ok(paths.includes('src/app.js'), 'has app.js');
    assert.ok(paths.includes('CLAUDE.md'), 'has CLAUDE.md');
    assert.ok(paths.some(p => p.startsWith('src/pages/')), 'has page files');
  });

  it('scaffoldProject generates valid JS imports', async () => {
    const { scaffoldProject } = await import('../tools/scaffolder.js');
    const files = await scaffoldProject('/tmp/test-project', 'dashboard/analytics', {
      name: 'test-app',
      theme: 'light',
      router: 'hash'
    });

    const appJs = files.find(f => f[0] === 'src/app.js');
    assert.ok(appJs, 'app.js exists');
    const content = appJs[1];
    assert.ok(content.includes("import"), 'has imports');
    assert.ok(content.includes("mount"), 'has mount call');
    assert.ok(content.includes("setTheme('light')"), 'sets theme');
    assert.ok(content.includes("createRouter"), 'creates router');
  });

  it('scaffoldProject generates correct config', async () => {
    const { scaffoldProject } = await import('../tools/scaffolder.js');
    const files = await scaffoldProject('/tmp/test-project', 'content/blog', {
      name: 'my-blog',
      theme: 'retro',
      router: 'history'
    });

    const configFile = files.find(f => f[0] === 'decantr.config.json');
    assert.ok(configFile);
    const config = JSON.parse(configFile[1]);
    assert.equal(config.name, 'my-blog');
    assert.equal(config.theme, 'retro');
    assert.equal(config.router, 'history');
    assert.equal(config.scaffolded, true);
  });

  it('getRequiredDirs extracts correct directories', async () => {
    const { getRequiredDirs } = await import('../tools/scaffolder.js');
    const dirs = getRequiredDirs([
      ['package.json', ''],
      ['src/app.js', ''],
      ['src/pages/home.js', ''],
      ['public/index.html', ''],
      ['.decantr/manifest.json', '']
    ]);
    assert.ok(dirs.includes('src'));
    assert.ok(dirs.includes('src/pages'));
    assert.ok(dirs.includes('public'));
    assert.ok(dirs.includes('.decantr'));
  });

  it('scaffoldProject works for all 10 blueprints', async () => {
    const { scaffoldProject } = await import('../tools/scaffolder.js');
    const blueprints = [
      'dashboard/analytics', 'dashboard/stock-tracker', 'dashboard/daily-planner', 'dashboard/project-manager',
      'content/blog', 'content/portfolio', 'content/documentation',
      'marketing/saas-landing', 'marketing/agency', 'marketing/startup'
    ];

    for (const bp of blueprints) {
      const files = await scaffoldProject('/tmp/test', bp, {
        name: 'test',
        theme: 'light',
        router: 'hash'
      });
      assert.ok(files.length > 0, `${bp} generates files`);
      assert.ok(files.some(f => f[0] === 'src/app.js'), `${bp} has app.js`);
    }
  });

  it('portfolio scaffold generates 5 pages', async () => {
    const { scaffoldProject } = await import('../tools/scaffolder.js');
    const files = await scaffoldProject('/tmp/test-portfolio', 'content/portfolio', {
      name: 'my-portfolio',
      theme: 'stormy-ai',
      router: 'hash'
    });

    const pages = files.filter(f => f[0].startsWith('src/pages/'));
    const pageNames = pages.map(f => f[0]);
    assert.ok(pageNames.includes('src/pages/home.js'), 'has home page');
    assert.ok(pageNames.includes('src/pages/about.js'), 'has about page');
    assert.ok(pageNames.includes('src/pages/portfolio.js'), 'has portfolio page');
    assert.ok(pageNames.includes('src/pages/hobbies.js'), 'has hobbies page');
    assert.ok(pageNames.includes('src/pages/contact.js'), 'has contact page');
    assert.equal(pages.length, 5, 'exactly 5 pages');
  });

  it('portfolio scaffold uses block imports', async () => {
    const { scaffoldProject } = await import('../tools/scaffolder.js');
    const files = await scaffoldProject('/tmp/test-portfolio', 'content/portfolio', {
      name: 'my-portfolio',
      theme: 'stormy-ai',
      router: 'hash'
    });

    const homePage = files.find(f => f[0] === 'src/pages/home.js');
    assert.ok(homePage, 'home page exists');
    assert.ok(homePage[1].includes("from 'decantr/blocks'"), 'home imports from decantr/blocks');
    assert.ok(homePage[1].includes('ProfileHero'), 'home uses ProfileHero');
    assert.ok(homePage[1].includes('ExpertiseGrid'), 'home uses ExpertiseGrid');
    assert.ok(homePage[1].includes('StatsRow'), 'home uses StatsRow');
  });

  it('portfolio scaffold renders SocialSidebar in app.js', async () => {
    const { scaffoldProject } = await import('../tools/scaffolder.js');
    const files = await scaffoldProject('/tmp/test-portfolio', 'content/portfolio', {
      name: 'my-portfolio',
      theme: 'stormy-ai',
      router: 'hash'
    });

    const appJs = files.find(f => f[0] === 'src/app.js');
    assert.ok(appJs, 'app.js exists');
    assert.ok(appJs[1].includes("import { SocialSidebar } from 'decantr/blocks'"), 'imports SocialSidebar');
    assert.ok(appJs[1].includes('SocialSidebar('), 'renders SocialSidebar');
  });

  it('portfolio scaffold sets stormy-ai theme', async () => {
    const { scaffoldProject } = await import('../tools/scaffolder.js');
    const files = await scaffoldProject('/tmp/test-portfolio', 'content/portfolio', {
      name: 'my-portfolio',
      theme: 'stormy-ai',
      router: 'hash'
    });

    const appJs = files.find(f => f[0] === 'src/app.js');
    assert.ok(appJs[1].includes("setTheme('stormy-ai')"), 'sets stormy-ai theme');
  });
});
