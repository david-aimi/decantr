import { h } from 'decantr/core';
import { CodeBlock } from '../components/code-block.js';
import { ApiTable } from '../components/api-table.js';

export function RouterPage() {
  return h('div', null,
    h('h1', { style: { fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' } }, 'Router'),
    h('p', { style: { color: 'var(--c4)', marginBottom: '2rem', lineHeight: '1.6' } },
      'Client-side routing with hash and history strategies, dynamic parameters, and programmatic navigation.'
    ),
    h('p', { style: { marginBottom: '1.5rem' } },
      h('code', { style: { fontSize: '0.875rem', background: 'var(--c2)', padding: '0.125rem 0.375rem', borderRadius: '4px' } },
        "import { createRouter, link, navigate, useRoute } from 'decantr/router'"
      )
    ),

    // createRouter
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'createRouter(config)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Create a router with route definitions. Returns an object with navigate, outlet, and route signal.'
    ),
    CodeBlock({ code: `import { createRouter } from 'decantr/router';

const router = createRouter({
  mode: 'hash',  // or 'history'
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/users/:id', component: UserProfile }
  ]
});` }),

    h('p', { style: { marginTop: '0.75rem', marginBottom: '0.5rem', lineHeight: '1.6' } },
      'The router object has:'
    ),
    h('ul', { style: { lineHeight: '1.8', paddingLeft: '1.5rem', marginBottom: '1.5rem' } },
      h('li', null, h('code', { style: { fontSize: '0.875rem' } }, 'router.outlet()'), ' \u2014 returns a DOM element that renders the matched route component'),
      h('li', null, h('code', { style: { fontSize: '0.875rem' } }, 'router.navigate(path)'), ' \u2014 navigate to a path programmatically'),
      h('li', null, h('code', { style: { fontSize: '0.875rem' } }, 'router.current'), ' \u2014 signal returning { path, params, component, matched }'),
      h('li', null, h('code', { style: { fontSize: '0.875rem' } }, 'router.path'), ' \u2014 signal returning the current path string'),
      h('li', null, h('code', { style: { fontSize: '0.875rem' } }, 'router.destroy()'), ' \u2014 clean up listeners')
    ),

    // Using the outlet
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'Rendering routes'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Use router.outlet() in your layout to render the matched component:'
    ),
    CodeBlock({ code: `function App() {
  return h('div', null,
    h('nav', null, /* ... */),
    h('main', null, router.outlet())
  );
}

mount(document.getElementById('app'), App);` }),

    // link()
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'link(attrs, ...children)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Router-aware anchor element. Prevents default navigation and uses the router instead.'
    ),
    CodeBlock({ code: `import { link } from 'decantr/router';

link({ href: '/about' }, 'About')

link({
  href: '/users/42',
  style: { fontWeight: 'bold' }
}, 'User 42')` }),

    // navigate()
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'navigate(path)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Programmatic navigation using the active router.'
    ),
    CodeBlock({ code: `import { navigate } from 'decantr/router';

Button({ onclick: () => navigate('/dashboard') }, 'Go to Dashboard')` }),

    // useRoute()
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'useRoute()'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Get the current route signal. Returns { path, params, component, matched }.'
    ),
    CodeBlock({ code: `import { useRoute } from 'decantr/router';

const route = useRoute();

createEffect(() => {
  const { path, params } = route();
  console.log('Current path:', path);
  console.log('Params:', params);
});` }),

    // Dynamic routes
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'Dynamic routes'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Use :param in route paths. The params are passed to the component function.'
    ),
    CodeBlock({ code: `const router = createRouter({
  mode: 'hash',
  routes: [
    { path: '/users/:id', component: UserProfile },
    { path: '/posts/:slug', component: BlogPost }
  ]
});

function UserProfile(params) {
  return h('div', null,
    h('h1', null, 'User ', params.id)
  );
}` }),

    // Strategies
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'Routing strategies'),
    h('div', { style: { overflowX: 'auto', marginBottom: '1.5rem' } },
      h('table', { style: { width: '100%', borderCollapse: 'collapse', background: 'var(--c2)', borderRadius: 'var(--d-radius, 6px)', overflow: 'hidden' } },
        h('thead', null,
          h('tr', null,
            h('th', { style: { padding: '0.625rem 1rem', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c4)', textAlign: 'left', borderBottom: '1px solid var(--c5)' } }, 'Strategy'),
            h('th', { style: { padding: '0.625rem 1rem', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c4)', textAlign: 'left', borderBottom: '1px solid var(--c5)' } }, 'URLs'),
            h('th', { style: { padding: '0.625rem 1rem', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c4)', textAlign: 'left', borderBottom: '1px solid var(--c5)' } }, 'Server config')
          )
        ),
        h('tbody', null,
          h('tr', null,
            h('td', { style: { padding: '0.625rem 1rem', borderBottom: '1px solid var(--c5)', fontSize: '0.875rem' } }, h('code', null, 'hash')),
            h('td', { style: { padding: '0.625rem 1rem', borderBottom: '1px solid var(--c5)', fontSize: '0.875rem' } }, 'example.com/#/about'),
            h('td', { style: { padding: '0.625rem 1rem', borderBottom: '1px solid var(--c5)', fontSize: '0.875rem' } }, 'None required')
          ),
          h('tr', null,
            h('td', { style: { padding: '0.625rem 1rem', fontSize: '0.875rem' } }, h('code', null, 'history')),
            h('td', { style: { padding: '0.625rem 1rem', fontSize: '0.875rem' } }, 'example.com/about'),
            h('td', { style: { padding: '0.625rem 1rem', fontSize: '0.875rem' } }, 'SPA fallback to index.html')
          )
        )
      )
    ),

    // API summary
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '0.75rem' } }, 'API Summary'),
    ApiTable({ rows: [
      { name: 'createRouter', signature: 'createRouter({ mode, routes })', description: 'Create a router with route definitions and strategy.' },
      { name: 'link', signature: 'link(attrs, ...children)', description: 'Router-aware anchor element.' },
      { name: 'navigate', signature: 'navigate(path)', description: 'Programmatic navigation.' },
      { name: 'useRoute', signature: 'useRoute() \u2192 signal', description: 'Get the current route signal.' }
    ]})
  );
}
