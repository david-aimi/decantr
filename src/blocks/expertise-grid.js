import { h } from '../core/index.js';
import { Chip } from '../components/chip.js';
import { icon } from '../components/icon.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {{ icon?: string, name: string, level?: string }[]} props.items
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function ExpertiseGrid(props = {}) {
  injectBlockBase();

  const { title, items = [], class: cls } = props;

  const section = h('section', {
    class: `d-expertise-grid${cls ? ' ' + cls : ''}`
  });

  if (title) {
    section.appendChild(h('h2', { class: 'd-expertise-grid-title' }, title));
  }

  const grid = h('div', { class: 'd-expertise-grid-items' });

  for (const item of items) {
    const chipIcon = item.icon ? icon(item.icon, { size: '1em' }) : undefined;
    const label = item.level ? `${item.name} \u00B7 ${item.level}` : item.name;
    grid.appendChild(Chip({ icon: chipIcon, label }));
  }

  section.appendChild(grid);
  return section;
}
