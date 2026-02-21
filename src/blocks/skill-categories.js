import { h } from '../core/index.js';
import { Card } from '../components/card.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {{ name: string, icon?: string, skills: string[] }[]} props.categories
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function SkillCategories(props = {}) {
  injectBlockBase();

  const { title, categories = [], class: cls } = props;

  const section = h('section', {
    class: `d-skill-categories${cls ? ' ' + cls : ''}`
  });

  if (title) {
    section.appendChild(h('h2', { class: 'd-skill-categories-title' }, title));
  }

  const grid = h('div', { class: 'd-skill-categories-grid' });

  for (const cat of categories) {
    const card = Card({ class: 'd-skill-category' });

    const header = h('div', { class: 'd-skill-category-name' });
    if (cat.icon) {
      header.appendChild(h('span', { 'aria-hidden': 'true', style: 'margin-right:0.5rem' }, cat.icon));
    }
    header.appendChild(h('span', null, cat.name));
    card.appendChild(header);

    const list = h('ul', { class: 'd-skill-category-list' });
    for (const skill of cat.skills) {
      list.appendChild(h('li', { class: 'd-skill-category-item' }, skill));
    }
    card.appendChild(list);

    grid.appendChild(card);
  }

  section.appendChild(grid);
  return section;
}
