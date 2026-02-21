import { h } from '../core/index.js';
import { Chip } from '../components/chip.js';
import { icon } from '../components/icon.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {{ icon?: string, name: string }[]} props.items
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function TechGrid(props = {}) {
  injectBlockBase();

  const { title, items = [], class: cls } = props;

  const section = h('section', {
    class: `d-tech-grid${cls ? ' ' + cls : ''}`
  });

  if (title) {
    section.appendChild(h('h2', { class: 'd-tech-grid-title' }, title));
  }

  const grid = h('div', { class: 'd-tech-grid-items' });

  for (const item of items) {
    const chipIcon = item.icon ? icon(item.icon, { size: '1em' }) : undefined;
    grid.appendChild(Chip({ icon: chipIcon, label: item.name }));
  }

  section.appendChild(grid);
  return section;
}
