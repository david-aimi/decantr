import { h } from '../core/index.js';
import { Card } from '../components/card.js';
import { Chip } from '../components/chip.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {{ icon?: string, name: string, description: string, stats?: { label: string, value: string }[], tags?: string[] }[]} props.items
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function HobbyGrid(props = {}) {
  injectBlockBase();

  const { title, items = [], class: cls } = props;

  const section = h('section', {
    class: `d-hobby-grid${cls ? ' ' + cls : ''}`
  });

  if (title) {
    section.appendChild(h('h2', { class: 'd-hobby-grid-title' }, title));
  }

  const grid = h('div', { class: 'd-hobby-grid-items' });

  for (const item of items) {
    const card = Card({ hoverable: true, class: 'd-hobby-card' });

    if (item.icon) {
      card.appendChild(h('div', { class: 'd-hobby-card-icon', 'aria-hidden': 'true' }, item.icon));
    }

    card.appendChild(h('h3', { class: 'd-hobby-card-name' }, item.name));
    card.appendChild(h('p', { class: 'd-hobby-card-desc' }, item.description));

    if (item.stats && item.stats.length) {
      const statsEl = h('div', { class: 'd-hobby-card-stats' });
      for (const s of item.stats) {
        statsEl.appendChild(h('span', null,
          h('span', { style: 'font-weight:600' }, s.value),
          h('span', null, ` ${s.label}`)
        ));
      }
      card.appendChild(statsEl);
    }

    if (item.tags && item.tags.length) {
      const tagsEl = h('div', { class: 'd-hobby-card-tags' });
      for (const tag of item.tags) {
        tagsEl.appendChild(Chip({ label: tag, size: 'sm' }));
      }
      card.appendChild(tagsEl);
    }

    grid.appendChild(card);
  }

  section.appendChild(grid);
  return section;
}
