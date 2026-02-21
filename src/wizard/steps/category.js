import { h } from '../../core/index.js';
import { CardGrid } from '../components/card-grid.js';

/**
 * Step 1: Category selection.
 * @param {Object} props
 * @param {Array} props.categories - From catalog
 * @param {Function} props.selected - Signal getter
 * @param {Function} props.onSelect - Setter
 * @returns {HTMLElement}
 */
export function CategoryStep(props = {}) {
  const { categories = [], selected, onSelect } = props;

  return h('div', { class: 'wiz-step' },
    h('h2', { style: 'margin:0 0 0.5rem;font-size:1.5rem;color:var(--c3)' }, 'What are you building?'),
    h('p', { style: 'margin:0 0 1.5rem;color:var(--c4)' }, 'Choose a category to get started.'),
    CardGrid({
      items: categories.map(c => ({ id: c.id, name: c.name, description: c.description })),
      selected,
      onSelect
    })
  );
}
