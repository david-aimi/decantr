import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blueprintsDir = join(__dirname, '..', 'blueprints');

async function loadJson(path) {
  return JSON.parse(await readFile(path, 'utf-8'));
}

describe('blueprints', () => {
  it('_index.json has valid structure', async () => {
    const index = await loadJson(join(blueprintsDir, '_index.json'));
    assert.ok(index.version);
    assert.ok(Array.isArray(index.categories));
    assert.ok(index.categories.length >= 3);
    for (const cat of index.categories) {
      assert.ok(cat.id);
      assert.ok(cat.name);
      assert.ok(cat.description);
    }
  });

  it('each category has _index.json with variants', async () => {
    const index = await loadJson(join(blueprintsDir, '_index.json'));
    for (const cat of index.categories) {
      const catIndex = await loadJson(join(blueprintsDir, cat.id, '_index.json'));
      assert.equal(catIndex.category, cat.id);
      assert.ok(Array.isArray(catIndex.variants));
      assert.ok(catIndex.variants.length > 0, `${cat.id} has variants`);
      for (const v of catIndex.variants) {
        assert.ok(v.id, `variant has id in ${cat.id}`);
        assert.ok(v.name, `variant has name in ${cat.id}`);
      }
    }
  });

  const blueprintFiles = [
    'dashboard/analytics', 'dashboard/stock-tracker', 'dashboard/daily-planner', 'dashboard/project-manager',
    'content/blog', 'content/portfolio', 'content/documentation',
    'marketing/saas-landing', 'marketing/agency', 'marketing/startup'
  ];

  for (const bp of blueprintFiles) {
    const [cat, id] = bp.split('/');

    it(`${bp} has required fields`, async () => {
      const data = await loadJson(join(blueprintsDir, cat, `${id}.json`));
      assert.ok(data.id, 'has id');
      assert.ok(data.name, 'has name');
      assert.equal(data.category, cat, 'category matches directory');
      assert.ok(data.description, 'has description');
      assert.ok(Array.isArray(data.kits), 'has kits array');
      assert.ok(data.kits.length > 0, 'has at least one kit');
    });

    it(`${bp} has valid layout`, async () => {
      const data = await loadJson(join(blueprintsDir, cat, `${id}.json`));
      assert.ok(data.layout, 'has layout');
      assert.ok(['sidebar', 'topnav', 'minimal', 'landing'].includes(data.layout.type), `valid layout type: ${data.layout.type}`);
    });

    it(`${bp} has valid routes`, async () => {
      const data = await loadJson(join(blueprintsDir, cat, `${id}.json`));
      assert.ok(Array.isArray(data.routes), 'has routes array');
      assert.ok(data.routes.length > 0, 'has at least one route');
      for (const route of data.routes) {
        assert.ok(route.path, 'route has path');
        assert.ok(route.page, 'route has page');
        assert.ok(route.label, 'route has label');
      }
    });

    it(`${bp} has pages matching routes`, async () => {
      const data = await loadJson(join(blueprintsDir, cat, `${id}.json`));
      assert.ok(data.pages, 'has pages');
      for (const route of data.routes) {
        // Dynamic routes (with :param) may not have page entries
        if (!route.path.includes(':')) {
          assert.ok(data.pages[route.page], `page ${route.page} exists for route ${route.path}`);
        }
      }
    });

    it(`${bp} references valid kit names`, async () => {
      const data = await loadJson(join(blueprintsDir, cat, `${id}.json`));
      const validKits = ['dashboard', 'auth', 'content'];
      for (const kit of data.kits) {
        assert.ok(validKits.includes(kit), `valid kit: ${kit}`);
      }
    });
  }
});
