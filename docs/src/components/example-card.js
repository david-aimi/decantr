import { h } from 'decantr/core';
import { Card } from 'decantr/components';
import { CodeBlock } from './code-block.js';

/**
 * @param {{ title?: string, code: string }} props
 * @param {...Node} children - Live rendered output
 */
export function ExampleCard({ title, code }, ...children) {
  return Card({},
    title ? Card.Header({},
      h('span', { style: { fontSize: '0.875rem', fontWeight: '600' } }, title)
    ) : null,
    h('div', {
      style: {
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '0', minHeight: '120px'
      }
    },
      h('div', { style: { borderRight: '1px solid var(--c5)', overflow: 'auto' } },
        CodeBlock({ code })
      ),
      h('div', { style: { padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' } },
        ...children
      )
    )
  );
}
