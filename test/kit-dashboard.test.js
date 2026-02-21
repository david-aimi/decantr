import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createDOM } from '../src/test/dom.js';

let cleanup;

before(() => {
  const env = createDOM();
  cleanup = env.cleanup;
});

after(() => {
  if (cleanup) cleanup();
});

describe('kit/dashboard', () => {
  it('exports all dashboard components', async () => {
    const mod = await import('../src/kit/dashboard/index.js');
    assert.ok(typeof mod.Sidebar === 'function', 'Sidebar exported');
    assert.ok(typeof mod.DashboardHeader === 'function', 'DashboardHeader exported');
    assert.ok(typeof mod.StatsGrid === 'function', 'StatsGrid exported');
    assert.ok(typeof mod.KPICard === 'function', 'KPICard exported');
    assert.ok(typeof mod.ActivityFeed === 'function', 'ActivityFeed exported');
    assert.ok(typeof mod.DataTable === 'function', 'DataTable exported');
    assert.ok(typeof mod.ChartPlaceholder === 'function', 'ChartPlaceholder exported');
  });

  it('Sidebar renders a nav element', async () => {
    const { Sidebar } = await import('../src/kit/dashboard/sidebar.js');
    const el = Sidebar({
      branding: 'TestApp',
      nav: [{ href: '/', label: 'Home' }]
    });
    assert.ok(el && el.nodeType === 1);
    assert.equal(el.tagName, 'NAV');
    assert.equal(el.getAttribute('role'), 'navigation');
    assert.equal(el.getAttribute('aria-label'), 'Main navigation');
  });

  it('KPICard renders with value', async () => {
    const { KPICard } = await import('../src/kit/dashboard/kpi-card.js');
    const el = KPICard({ title: 'Users', value: '1,234', change: '+12%' });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('1,234'));
    assert.ok(el.textContent.includes('Users'));
  });

  it('StatsGrid renders multiple KPI cards', async () => {
    const { StatsGrid } = await import('../src/kit/dashboard/stats-grid.js');
    const el = StatsGrid({
      columns: 2,
      items: [
        { title: 'A', value: '10' },
        { title: 'B', value: '20' }
      ]
    });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('10'));
    assert.ok(el.textContent.includes('20'));
  });

  it('ChartPlaceholder renders with title', async () => {
    const { ChartPlaceholder } = await import('../src/kit/dashboard/chart-placeholder.js');
    const el = ChartPlaceholder({ title: 'Revenue' });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('Revenue'));
  });

  it('DataTable renders with columns and data', async () => {
    const { DataTable } = await import('../src/kit/dashboard/data-table.js');
    const el = DataTable({
      columns: [{ key: 'name', label: 'Name' }],
      data: [{ name: 'Alice' }]
    });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('Name'));
    assert.ok(el.textContent.includes('Alice'));
  });

  it('DashboardHeader renders with title', async () => {
    const { DashboardHeader } = await import('../src/kit/dashboard/dashboard-header.js');
    const el = DashboardHeader({ title: 'Dashboard' });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('Dashboard'));
  });

  it('ActivityFeed renders', async () => {
    const { ActivityFeed } = await import('../src/kit/dashboard/activity-feed.js');
    const el = ActivityFeed({ title: 'Recent' });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('Recent'));
  });
});
