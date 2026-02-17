import { h } from 'decantr/core';
import { link } from 'decantr/router';
import { Card, Button } from 'decantr/components';
import { CodeBlock } from '../components/code-block.js';

const installCode = `npm i decantr
npx decantr init my-app
cd my-app && npx decantr dev`;

const helloCode = `import { h, mount } from 'decantr/core';
import { createSignal } from 'decantr/state';
import { Button } from 'decantr/components';

function App() {
  const [count, setCount] = createSignal(0);

  return h('div', null,
    h('p', null, 'Count: ', () => count()),
    Button({ onclick: () => setCount(c => c + 1) }, 'Increment')
  );
}

mount(document.getElementById('app'), App);`;

const features = [
  { title: 'Zero Dependencies', desc: 'Pure JavaScript, CSS, and HTML. Nothing to install beyond the framework itself.' },
  { title: 'Signal Reactivity', desc: 'Fine-grained reactivity with signals, effects, memos, and stores. No virtual DOM.' },
  { title: 'AI-Native', desc: 'Designed for AI agents to generate, read, and maintain. Simple patterns, no magic.' },
  { title: 'Tiny Bundle', desc: 'Under 2KB gzipped for hello world. Real DOM, no runtime overhead.' },
  { title: '35 Visual Combos', desc: '7 color themes and 5 design styles. Switch at runtime with a single function call.' },
  { title: 'Built-in Tooling', desc: 'Dev server, production builder, test runner, and CLI scaffolding included.' }
];

export function Home() {
  return h('div', null,
    // Hero
    h('section', { style: { textAlign: 'center', padding: '3rem 0 4rem' } },
      h('h1', { style: { fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1rem' } },
        'decantr'
      ),
      h('p', { style: { fontSize: '1.25rem', color: 'var(--c4)', lineHeight: '1.6', marginBottom: '0.5rem' } },
        'AI-first web framework. Zero dependencies.'
      ),
      h('p', { style: { fontSize: '1rem', color: 'var(--c4)', marginBottom: '2rem' } },
        'Native JS/CSS/HTML. Signal reactivity. 7 themes \u00d7 5 styles.'
      ),
      h('div', { style: { display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' } },
        link({ href: '/getting-started', style: { textDecoration: 'none' } },
          Button({ variant: 'primary', size: 'lg' }, 'Get Started')
        ),
        h('a', { href: 'https://github.com/david-aimi/decantr', target: '_blank', rel: 'noopener', style: { textDecoration: 'none' } },
          Button({ size: 'lg' }, 'GitHub')
        )
      ),
      h('div', { style: { maxWidth: '520px', margin: '0 auto', textAlign: 'left' } },
        CodeBlock({ code: installCode, lang: 'bash' })
      )
    ),

    // Hello world example
    h('section', { style: { padding: '2rem 0 3rem' } },
      h('h2', { style: { fontSize: '1.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '1.5rem' } },
        'Hello World'
      ),
      h('div', { style: { maxWidth: '640px', margin: '0 auto' } },
        CodeBlock({ code: helloCode })
      )
    ),

    // Features grid
    h('section', { style: { padding: '2rem 0 3rem' } },
      h('h2', { style: { fontSize: '1.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem' } },
        'Everything you need'
      ),
      h('div', {
        style: {
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }
      },
        ...features.map(f =>
          Card({ hoverable: true },
            h('h3', { style: { fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' } }, f.title),
            h('p', { style: { color: 'var(--c4)', fontSize: '0.875rem', lineHeight: '1.6' } }, f.desc)
          )
        )
      )
    )
  );
}
