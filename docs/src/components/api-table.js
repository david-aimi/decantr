import { h } from 'decantr/core';

/**
 * @param {{ rows: Array<{ name: string, signature: string, description: string }> }} props
 */
export function ApiTable({ rows }) {
  const cellStyle = { padding: '0.625rem 1rem', borderBottom: '1px solid var(--c5)', fontSize: '0.875rem', verticalAlign: 'top' };
  const headerStyle = { ...cellStyle, fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c4)', textAlign: 'left' };

  return h('div', { style: { overflowX: 'auto', marginBottom: '1.5rem' } },
    h('table', { style: { width: '100%', borderCollapse: 'collapse', background: 'var(--c2)', borderRadius: 'var(--d-radius, 6px)', overflow: 'hidden' } },
      h('thead', null,
        h('tr', null,
          h('th', { style: headerStyle }, 'Name'),
          h('th', { style: headerStyle }, 'Signature'),
          h('th', { style: headerStyle }, 'Description')
        )
      ),
      h('tbody', null,
        ...rows.map(row =>
          h('tr', null,
            h('td', { style: { ...cellStyle, fontWeight: '500', whiteSpace: 'nowrap' } },
              h('code', { style: { fontSize: '0.8125rem', color: 'var(--c1)' } }, row.name)
            ),
            h('td', { style: cellStyle },
              h('code', { style: { fontSize: '0.8125rem', color: 'var(--c4)' } }, row.signature)
            ),
            h('td', { style: cellStyle }, row.description)
          )
        )
      )
    )
  );
}
