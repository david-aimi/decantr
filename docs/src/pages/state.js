import { h } from 'decantr/core';
import { CodeBlock } from '../components/code-block.js';
import { ApiTable } from '../components/api-table.js';

export function StatePage() {
  return h('div', null,
    h('h1', { style: { fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' } }, 'State'),
    h('p', { style: { color: 'var(--c4)', marginBottom: '2rem', lineHeight: '1.6' } },
      'Reactive primitives: signals, effects, memos, stores, and batching.'
    ),
    h('p', { style: { marginBottom: '1.5rem' } },
      h('code', { style: { fontSize: '0.875rem', background: 'var(--c2)', padding: '0.125rem 0.375rem', borderRadius: '4px' } },
        "import { createSignal, createEffect, createMemo, createStore, batch } from 'decantr/state'"
      )
    ),

    // createSignal
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'createSignal(initial)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Returns a [getter, setter] pair. Reading the getter inside an effect or memo automatically subscribes to changes.'
    ),
    CodeBlock({ code: `const [count, setCount] = createSignal(0);

// Read
console.log(count());  // 0

// Write with value
setCount(5);

// Write with updater function
setCount(prev => prev + 1);  // 6` }),

    // createEffect
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'createEffect(fn)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Runs immediately, then re-runs whenever any signal it reads changes. Returns a dispose function.'
    ),
    CodeBlock({ code: `const [name, setName] = createSignal('Alice');

const dispose = createEffect(() => {
  console.log('Name is:', name());
});
// Logs: "Name is: Alice"

setName('Bob');
// Logs: "Name is: Bob"

dispose();  // Stop tracking` }),

    h('p', { style: { marginTop: '0.75rem', marginBottom: '1.5rem', lineHeight: '1.6' } },
      'Return a function from the effect callback to run cleanup before each re-run:'
    ),
    CodeBlock({ code: `createEffect(() => {
  const id = setInterval(() => console.log(count()), 1000);
  return () => clearInterval(id);  // cleanup on re-run
});` }),

    // createMemo
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'createMemo(fn)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Cached derived value. Only recomputes when its dependencies change. Acts as a signal itself \u2014 effects that read it subscribe to it.'
    ),
    CodeBlock({ code: `const [items, setItems] = createSignal([1, 2, 3, 4, 5]);
const [filter, setFilter] = createSignal(n => n > 2);

const filtered = createMemo(() => items().filter(filter()));

console.log(filtered());  // [3, 4, 5]

setFilter(() => n => n < 3);
console.log(filtered());  // [1, 2]` }),

    // createStore
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'createStore(obj)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Reactive object with per-property tracking via Proxy. Read properties to subscribe, set properties to notify.'
    ),
    CodeBlock({ code: `const user = createStore({
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin'
});

createEffect(() => {
  console.log('Name:', user.name);  // Only re-runs on name changes
});

user.name = 'Bob';    // Triggers the effect
user.email = 'x';     // Does NOT trigger the effect` }),

    // batch
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'batch(fn)'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Batch multiple signal updates into a single effect flush. Prevents intermediate re-renders.'
    ),
    CodeBlock({ code: `const [first, setFirst] = createSignal('');
const [last, setLast] = createSignal('');

createEffect(() => {
  console.log(first(), last());
});

// Without batch: effect runs twice
// With batch: effect runs once with both updates
batch(() => {
  setFirst('John');
  setLast('Doe');
});` }),

    // API summary
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '0.75rem' } }, 'API Summary'),
    ApiTable({ rows: [
      { name: 'createSignal', signature: 'createSignal(initial) \u2192 [getter, setter]', description: 'Reactive primitive. Getter auto-tracks, setter notifies subscribers.' },
      { name: 'createEffect', signature: 'createEffect(fn) \u2192 dispose', description: 'Auto-tracking side effect. Re-runs when dependencies change.' },
      { name: 'createMemo', signature: 'createMemo(fn) \u2192 getter', description: 'Cached derived computation. Only recomputes when dependencies change.' },
      { name: 'createStore', signature: 'createStore(obj) \u2192 Proxy', description: 'Reactive object with per-property tracking.' },
      { name: 'batch', signature: 'batch(fn)', description: 'Batch signal updates into one effect flush.' }
    ]})
  );
}
