import { h } from '../core/index.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {{ period: string, role: string, company: string, description?: string, color?: string }[]} props.items
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function Timeline(props = {}) {
  injectBlockBase();

  const { title, items = [], class: cls } = props;

  const section = h('section', {
    class: `d-timeline${cls ? ' ' + cls : ''}`
  });

  if (title) {
    section.appendChild(h('h2', { class: 'd-timeline-title' }, title));
  }

  const list = h('div', { class: 'd-timeline-list' });

  for (const item of items) {
    const entry = h('div', { class: 'd-timeline-item' });

    const dot = h('span', { class: 'd-timeline-dot' });
    if (item.color) dot.style.background = item.color;
    entry.appendChild(dot);

    entry.appendChild(h('div', { class: 'd-timeline-period' }, item.period));
    entry.appendChild(h('h3', { class: 'd-timeline-role' }, item.role));
    entry.appendChild(h('div', { class: 'd-timeline-company' }, item.company));

    if (item.description) {
      entry.appendChild(h('p', { class: 'd-timeline-desc' }, item.description));
    }

    list.appendChild(entry);
  }

  section.appendChild(list);
  return section;
}
