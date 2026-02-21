import { h, css, injectBase, cx } from '../_shared.js';
import { KPICard } from './kpi-card.js';

/**
 * Grid of KPI cards.
 * @param {Object} [props]
 * @param {number} [props.columns] - Grid column count (default 4)
 * @param {Array<{title: string, value: string|number|Function, change?: string, icon?: string, status?: string}>} [props.items] - KPICard props
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function StatsGrid(props = {}) {
  injectBase();

  const { columns = 4, items = [], class: cls } = props;

  // Map column count to atomic CSS grid class
  const gridAtom = columns >= 1 && columns <= 12 ? `_gc${columns}` : '_gc4';

  const grid = h('div', {
    class: cx(css(`_grid ${gridAtom} _gap4`), cls)
  });

  for (const item of items) {
    grid.appendChild(KPICard(item));
  }

  return grid;
}
