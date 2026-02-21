import { h } from '../../core/index.js';
import { createEffect } from '../../state/index.js';

/**
 * Selectable card grid.
 * @param {Object} props
 * @param {Array<{id: string, name: string, description: string, icon?: string}>} props.items
 * @param {Function} props.selected - Signal getter for selected ID
 * @param {Function} props.onSelect - Callback with selected ID
 * @returns {HTMLElement}
 */
export function CardGrid(props = {}) {
  const { items = [], selected, onSelect } = props;

  const container = h('div', { class: 'wiz-cards', role: 'radiogroup' });
  const cards = [];

  for (const item of items) {
    const card = h('div', {
      class: 'wiz-card',
      role: 'radio',
      tabindex: '0',
      'aria-checked': 'false',
      'aria-label': item.name,
      onclick: () => onSelect && onSelect(item.id),
      onkeydown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect && onSelect(item.id);
        }
      }
    },
      h('h3', null, item.name),
      h('p', null, item.description)
    );

    cards.push({ el: card, id: item.id });
    container.appendChild(card);
  }

  if (typeof selected === 'function') {
    createEffect(() => {
      const sel = selected();
      for (const c of cards) {
        const isSelected = c.id === sel;
        c.el.className = 'wiz-card' + (isSelected ? ' selected' : '');
        c.el.setAttribute('aria-checked', String(isSelected));
      }
    });
  }

  return container;
}
