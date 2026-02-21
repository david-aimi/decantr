import { h, createEffect, css, injectBase, cx, resolve } from '../_shared.js';
import { Input, Table, Button } from '../../components/index.js';
import { createSignal } from '../../state/index.js';

/**
 * Searchable data table.
 * @param {Object} [props]
 * @param {Array<{key: string, label: string, width?: string}>} [props.columns] - Column definitions
 * @param {Array<Object>|Function} [props.data] - Row objects (can be signal getter)
 * @param {boolean} [props.searchable] - Adds search input above table
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function DataTable(props = {}) {
  injectBase();

  const { columns = [], data, searchable, class: cls } = props;

  const [searchTerm, setSearchTerm] = createSignal('');

  const wrap = h('div', { class: cx(css('_flex _col _gap3'), cls) });

  // Search bar
  if (searchable) {
    const searchInput = Input({
      type: 'search',
      placeholder: 'Filter rows...',
      oninput(e) { setSearchTerm(e.target.value.toLowerCase()); }
    });
    wrap.appendChild(searchInput);
  }

  // Table container — rebuilt reactively when data or search changes
  const tableContainer = h('div', null);
  wrap.appendChild(tableContainer);

  createEffect(() => {
    const rawData = typeof data === 'function' ? data() : (data || []);
    const term = searchTerm();

    // Filter rows by search term
    const filtered = term
      ? rawData.filter(row =>
          columns.some(col => {
            const val = row[col.key];
            return val != null && String(val).toLowerCase().includes(term);
          })
        )
      : rawData;

    // Clear previous table
    while (tableContainer.firstChild) {
      tableContainer.removeChild(tableContainer.firstChild);
    }

    // Render new table
    const table = Table({
      columns,
      data: filtered,
      striped: true,
      hoverable: true
    });

    tableContainer.appendChild(table);
  });

  return wrap;
}
