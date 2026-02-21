import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createDOM } from '../src/test/dom.js';
import { resetBase } from '../src/components/_base.js';

let cleanup;

before(() => {
  const env = createDOM();
  cleanup = env.cleanup;
});

after(() => {
  if (cleanup) cleanup();
});

beforeEach(() => {
  resetBase();
});

describe('Chip', () => {
  it('renders with label', async () => {
    const { Chip } = await import('../src/components/chip.js');
    const el = Chip({ label: 'React' });
    assert.ok(el);
    assert.equal(el.tagName, 'SPAN');
    assert.ok(el.classList.contains('d-chip'));
    assert.ok(el.textContent.includes('React'));
  });

  it('applies outline variant class', async () => {
    const { Chip } = await import('../src/components/chip.js');
    const el = Chip({ label: 'Tag', variant: 'outline' });
    assert.ok(el.classList.contains('d-chip-outline'));
  });

  it('applies filled variant class', async () => {
    const { Chip } = await import('../src/components/chip.js');
    const el = Chip({ label: 'Tag', variant: 'filled' });
    assert.ok(el.classList.contains('d-chip-filled'));
  });

  it('applies sm size class', async () => {
    const { Chip } = await import('../src/components/chip.js');
    const el = Chip({ label: 'Small', size: 'sm' });
    assert.ok(el.classList.contains('d-chip-sm'));
  });

  it('applies selected class', async () => {
    const { Chip } = await import('../src/components/chip.js');
    const el = Chip({ label: 'Active', selected: true });
    assert.ok(el.classList.contains('d-chip-selected'));
  });

  it('renders icon element', async () => {
    const { Chip } = await import('../src/components/chip.js');
    const el = Chip({ label: 'Code', icon: 'code' });
    const iconEl = el.querySelector('.d-chip-icon');
    assert.ok(iconEl);
    assert.equal(iconEl.getAttribute('aria-hidden'), 'true');
  });

  it('renders removable button with aria-label', async () => {
    const { Chip } = await import('../src/components/chip.js');
    const el = Chip({ label: 'Removable', removable: true });
    const removeBtn = el.querySelector('.d-chip-remove');
    assert.ok(removeBtn);
    assert.equal(removeBtn.tagName, 'BUTTON');
    assert.equal(removeBtn.getAttribute('aria-label'), 'Remove Removable');
  });

  it('calls onRemove when dismiss clicked', async () => {
    const { Chip } = await import('../src/components/chip.js');
    let removed = false;
    const el = Chip({ label: 'X', removable: true, onRemove: () => { removed = true; } });
    const removeBtn = el.querySelector('.d-chip-remove');
    removeBtn.click();
    assert.ok(removed);
  });

  it('adds interactive class and role=button when onClick provided', async () => {
    const { Chip } = await import('../src/components/chip.js');
    let clicked = false;
    const el = Chip({ label: 'Click', onClick: () => { clicked = true; } });
    assert.ok(el.classList.contains('d-chip-interactive'));
    assert.equal(el.getAttribute('role'), 'button');
    assert.equal(el.getAttribute('tabindex'), '0');
    el.click();
    assert.ok(clicked);
  });

  it('merges custom class', async () => {
    const { Chip } = await import('../src/components/chip.js');
    const el = Chip({ label: 'Custom', class: 'my-chip' });
    assert.ok(el.classList.contains('d-chip'));
    assert.ok(el.classList.contains('my-chip'));
  });

  it('default variant has no modifier class', async () => {
    const { Chip } = await import('../src/components/chip.js');
    const el = Chip({ label: 'Default' });
    assert.ok(el.classList.contains('d-chip'));
    assert.ok(!el.classList.contains('d-chip-outline'));
    assert.ok(!el.classList.contains('d-chip-filled'));
  });
});
