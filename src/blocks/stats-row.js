import { h } from '../core/index.js';
import { Card } from '../components/card.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {{ value: string, label: string }[]} props.items
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function StatsRow(props = {}) {
  injectBlockBase();

  const { title, items = [], class: cls } = props;

  const section = h('section', {
    class: `d-stats-row${cls ? ' ' + cls : ''}`
  });

  if (title) {
    section.appendChild(h('h2', { class: 'd-stats-row-title' }, title));
  }

  for (const item of items) {
    const card = Card({ class: 'd-stat-card' });
    card.appendChild(h('div', { class: 'd-stat-value' }, item.value));
    card.appendChild(h('div', { class: 'd-stat-label' }, item.label));
    section.appendChild(card);
  }

  return section;
}
