import { h } from '../core/index.js';
import { Chip } from '../components/chip.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {{ name: string, issuer?: string }[]} props.items
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function CertificationRow(props = {}) {
  injectBlockBase();

  const { title, items = [], class: cls } = props;

  const section = h('section', {
    class: `d-cert-row${cls ? ' ' + cls : ''}`
  });

  if (title) {
    section.appendChild(h('h2', { class: 'd-cert-row-title' }, title));
  }

  const row = h('div', { class: 'd-cert-row-items' });

  for (const item of items) {
    const label = item.issuer ? `${item.name} \u00B7 ${item.issuer}` : item.name;
    row.appendChild(Chip({ label }));
  }

  section.appendChild(row);
  return section;
}
