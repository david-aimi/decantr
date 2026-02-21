import { h } from '../core/index.js';
import { Card } from '../components/card.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {{ icon?: string, title: string, description: string, quote?: string }[]} props.items
 * @param {number} [props.columns] - 2|3|4 (default: 2)
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function IdentityGrid(props = {}) {
  injectBlockBase();

  const { title, items = [], columns = 2, class: cls } = props;

  const section = h('section', {
    class: `d-identity-grid${cls ? ' ' + cls : ''}`
  });

  if (title) {
    section.appendChild(h('h2', { class: 'd-identity-grid-title' }, title));
  }

  const grid = h('div', {
    class: 'd-identity-grid-items',
    style: `grid-template-columns:repeat(auto-fit,minmax(${columns <= 2 ? '280px' : '220px'},1fr))`
  });

  for (const item of items) {
    const card = Card({ hoverable: true, class: 'd-identity-card' });

    if (item.icon) {
      card.appendChild(h('div', { class: 'd-identity-card-icon', 'aria-hidden': 'true' }, item.icon));
    }

    card.appendChild(h('h3', { class: 'd-identity-card-title' }, item.title));
    card.appendChild(h('p', { class: 'd-identity-card-desc' }, item.description));

    if (item.quote) {
      card.appendChild(h('p', { class: 'd-identity-card-quote' }, `"${item.quote}"`));
    }

    grid.appendChild(card);
  }

  section.appendChild(grid);
  return section;
}
