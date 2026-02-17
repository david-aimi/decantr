import { h } from 'decantr/core';
import { CodeBlock } from '../components/code-block.js';
import { ApiTable } from '../components/api-table.js';

export function CorePage() {
  return h('div', null,
    h('h1', { style: { fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' } }, 'Core'),
    h('p', { style: { color: 'var(--c4)', marginBottom: '2rem', lineHeight: '1.6' } },
      'DOM engine: create elements, reactive text, conditional rendering, keyed lists, and mounting.'
    ),
    h('p', { style: { marginBottom: '1.5rem' } },
      h('code', { style: { fontSize: '0.875rem', background: 'var(--c2)', padding: '0.125rem 0.375rem', borderRadius: '4px' } },
        "import { h, text, cond, list, mount, onMount, onDestroy } from 'decantr/core'"
      )
    ),

    // h()
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem', marginTop: '1rem' } }, 'h(tag, attrs, ...children)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Create a real DOM element. No virtual DOM \u2014 returns an actual HTMLElement.'
    ),
    CodeBlock({ code: `// Basic element
h('div', { class: 'container' }, 'Hello world')

// Nested elements
h('nav', null,
  h('a', { href: '/' }, 'Home'),
  h('a', { href: '/about' }, 'About')
)

// Inline styles
h('p', {
  style: { color: 'var(--c1)', fontSize: '1.25rem' }
}, 'Styled text')

// Event handlers
h('button', { onclick: () => console.log('clicked') }, 'Click')

// Reactive attributes (pass a function)
h('div', { class: () => isActive() ? 'active' : '' })` }),

    h('p', { style: { marginTop: '0.75rem', marginBottom: '1.5rem', lineHeight: '1.6' } },
      'Children can be strings, numbers, DOM nodes, arrays, or functions (which become reactive text nodes).'
    ),

    // text()
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'text(fn)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Create a reactive text node that updates automatically when its signal dependencies change.'
    ),
    CodeBlock({ code: `const [name, setName] = createSignal('World');

h('p', null,
  'Hello, ',
  text(() => name()),  // Updates when name changes
  '!'
)` }),

    h('p', { style: { marginTop: '0.75rem', marginBottom: '1.5rem', lineHeight: '1.6' } },
      'You can also pass a function directly as a child of h() \u2014 it will be auto-wrapped in a reactive text node.'
    ),

    // cond()
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'cond(predicate, trueBranch, falseBranch)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Conditional rendering. The predicate is a reactive function; branches are called to produce DOM when their condition is active.'
    ),
    CodeBlock({ code: `const [loggedIn, setLoggedIn] = createSignal(false);

cond(
  () => loggedIn(),
  () => h('p', null, 'Welcome back!'),
  () => Button({ onclick: () => setLoggedIn(true) }, 'Log in')
)` }),

    // list()
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'list(items, keyFn, renderFn)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Keyed list rendering. Efficiently adds, removes, and reorders DOM nodes when the items signal changes.'
    ),
    CodeBlock({ code: `const [todos, setTodos] = createSignal([
  { id: 1, text: 'Learn decantr' },
  { id: 2, text: 'Build an app' }
]);

list(
  () => todos(),
  item => item.id,
  item => h('li', null, item.text)
)` }),

    // mount()
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'mount(target, component)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Mount a component function to a DOM element. This is your app entry point.'
    ),
    CodeBlock({ code: `function App() {
  return h('div', null, 'Hello!');
}

mount(document.getElementById('app'), App);` }),

    // Lifecycle
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'Lifecycle Hooks'),

    ApiTable({ rows: [
      { name: 'onMount', signature: 'onMount(fn)', description: 'Run a callback after the component is mounted to the DOM.' },
      { name: 'onDestroy', signature: 'onDestroy(fn)', description: 'Run a callback when the component is torn down. Use for cleanup.' }
    ]}),

    CodeBlock({ code: `import { onMount, onDestroy } from 'decantr/core';

function Timer() {
  onMount(() => {
    const id = setInterval(() => console.log('tick'), 1000);
    return () => clearInterval(id);  // cleanup
  });

  return h('p', null, 'Timer running...');
}` }),

    // API summary
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '0.75rem' } }, 'API Summary'),
    ApiTable({ rows: [
      { name: 'h', signature: 'h(tag, attrs, ...children)', description: 'Create a DOM element (hyperscript). Returns HTMLElement.' },
      { name: 'text', signature: 'text(fn)', description: 'Create a reactive text node from a getter function.' },
      { name: 'cond', signature: 'cond(predicate, trueFn, falseFn)', description: 'Conditional rendering based on a reactive predicate.' },
      { name: 'list', signature: 'list(items, keyFn, renderFn)', description: 'Keyed list rendering with efficient diffing.' },
      { name: 'mount', signature: 'mount(target, component)', description: 'Mount a component to a DOM element.' },
      { name: 'onMount', signature: 'onMount(fn)', description: 'Register a callback for after mount.' },
      { name: 'onDestroy', signature: 'onDestroy(fn)', description: 'Register a callback for teardown.' }
    ]})
  );
}
