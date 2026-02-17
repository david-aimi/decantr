import { h } from 'decantr/core';
import { link } from 'decantr/router';

const sections = [
  { heading: 'Overview', items: [
    { href: '/', label: 'Home' },
    { href: '/getting-started', label: 'Getting Started' }
  ]},
  { heading: 'API', items: [
    { href: '/core', label: 'Core' },
    { href: '/state', label: 'State' },
    { href: '/router', label: 'Router' },
    { href: '/css', label: 'CSS & Themes' },
    { href: '/components', label: 'Components' }
  ]},
  { heading: 'Tools', items: [
    { href: '/cli', label: 'CLI' }
  ]}
];

export function Sidebar() {
  return h('aside', {
    style: {
      width: '240px', background: 'var(--c2)', borderRight: '1px solid var(--c5)',
      display: 'flex', flexDirection: 'column', flexShrink: '0',
      position: 'sticky', top: '0', height: '100vh', overflowY: 'auto'
    }
  },
    h('div', { style: { padding: '1.25rem', fontWeight: '800', fontSize: '1.25rem' } },
      link({ href: '/', style: { color: 'var(--c1)', textDecoration: 'none' } }, 'decantr')
    ),
    h('nav', { 'aria-label': 'Documentation' , style: { flex: '1', padding: '0 0.75rem 1rem' } },
      ...sections.map(section =>
        h('div', { style: { marginBottom: '1.25rem' } },
          h('p', { style: { fontSize: '0.6875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c4)', padding: '0 0.75rem', marginBottom: '0.375rem' } }, section.heading),
          ...section.items.map(item =>
            link({
              href: item.href,
              style: {
                display: 'block', padding: '0.4375rem 0.75rem', borderRadius: '6px',
                color: 'var(--c3)', fontSize: '0.875rem', marginBottom: '0.125rem',
                transition: 'background 0.15s ease'
              }
            }, item.label)
          )
        )
      )
    ),
    h('div', { style: { padding: '0.75rem 1rem', borderTop: '1px solid var(--c5)', fontSize: '0.75rem', color: 'var(--c4)' } },
      'v0.2.0'
    )
  );
}
