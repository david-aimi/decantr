import { h } from '../../core/index.js';
import { CardGrid } from '../components/card-grid.js';

/**
 * Step 2: Variant selection within chosen category.
 * @param {Object} props
 * @param {Array} props.variants
 * @param {string} props.categoryName
 * @param {Function} props.selected - Signal getter
 * @param {Function} props.onSelect
 * @returns {HTMLElement}
 */
export function VariantStep(props = {}) {
  const { variants = [], categoryName = '', selected, onSelect } = props;

  return h('div', { class: 'wiz-step' },
    h('h2', { style: 'margin:0 0 0.5rem;font-size:1.5rem;color:var(--c3)' }, `Choose a ${categoryName} variant`),
    h('p', { style: 'margin:0 0 1.5rem;color:var(--c4)' }, 'Each variant includes a complete set of pages and components.'),
    CardGrid({
      items: variants.map(v => ({ id: v.id, name: v.name, description: v.description })),
      selected,
      onSelect
    })
  );
}
