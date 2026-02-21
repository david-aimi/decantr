import { h } from '../core/index.js';
import { Card } from '../components/card.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {{ src?: string, alt?: string, placeholder?: string }[]} [props.items]
 * @param {number} [props.count] - Number of placeholder slots if no items
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function PhotoGallery(props = {}) {
  injectBlockBase();

  const { title, items, count = 6, class: cls } = props;

  const section = h('section', {
    class: `d-photo-gallery${cls ? ' ' + cls : ''}`
  });

  if (title) {
    section.appendChild(h('h2', { class: 'd-photo-gallery-title' }, title));
  }

  const grid = h('div', { class: 'd-photo-gallery-grid' });

  const displayItems = items && items.length
    ? items
    : Array.from({ length: count }, (_, i) => ({ placeholder: `Photo ${i + 1}` }));

  for (const item of displayItems) {
    const card = Card({ class: 'd-photo-gallery-item' });

    if (item.src) {
      card.appendChild(h('img', { src: item.src, alt: item.alt || '', style: 'width:100%;height:100%;object-fit:cover' }));
    } else {
      card.appendChild(h('span', null, item.placeholder || 'Photo'));
    }

    grid.appendChild(card);
  }

  section.appendChild(grid);
  return section;
}
