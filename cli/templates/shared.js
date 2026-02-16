/**
 * Shared template generators for all project types.
 */

const THEME_CSS = {
  light: ':root{--c0:#ffffff;--c1:#3b82f6;--c2:#f8fafc;--c3:#0f172a;--c4:#64748b;--c5:#e2e8f0;--c6:#2563eb;--c7:#22c55e;--c8:#f59e0b;--c9:#ef4444}',
  dark: ':root{--c0:#0f172a;--c1:#3b82f6;--c2:#1e293b;--c3:#f1f5f9;--c4:#94a3b8;--c5:#334155;--c6:#60a5fa;--c7:#4ade80;--c8:#fbbf24;--c9:#f87171}',
  ai: ':root{--c0:#0a0a1a;--c1:#8b5cf6;--c2:#1a1a2e;--c3:#e0e7ff;--c4:#818cf8;--c5:#312e81;--c6:#a78bfa;--c7:#34d399;--c8:#fbbf24;--c9:#f472b6}',
  nature: ':root{--c0:#fefce8;--c1:#16a34a;--c2:#f0fdf4;--c3:#1a2e05;--c4:#4d7c0f;--c5:#d9f99d;--c6:#15803d;--c7:#22c55e;--c8:#eab308;--c9:#dc2626}',
  pastel: ':root{--c0:#fdf2f8;--c1:#ec4899;--c2:#fce7f3;--c3:#831843;--c4:#be185d;--c5:#fbcfe8;--c6:#db2777;--c7:#86efac;--c8:#fde68a;--c9:#fca5a5}',
  spice: ':root{--c0:#1c1917;--c1:#ea580c;--c2:#292524;--c3:#fef3c7;--c4:#d97706;--c5:#44403c;--c6:#f97316;--c7:#4ade80;--c8:#fbbf24;--c9:#ef4444}',
  mono: ':root{--c0:#ffffff;--c1:#171717;--c2:#f5f5f5;--c3:#171717;--c4:#737373;--c5:#d4d4d4;--c6:#404040;--c7:#525252;--c8:#737373;--c9:#a3a3a3}'
};

export function packageJson(name) {
  return JSON.stringify({
    name,
    version: '0.1.0',
    type: 'module',
    scripts: {
      dev: 'decantr dev',
      build: 'decantr build',
      test: 'decantr test'
    },
    dependencies: {
      decantr: '^0.2.0'
    }
  }, null, 2);
}

export function configJson(opts) {
  const config = {
    $schema: 'https://decantr.ai/schemas/config.v2.json',
    name: opts.name,
    projectType: opts.projectType,
    theme: opts.theme,
    style: opts.style,
    router: opts.router,
    dev: { port: opts.port },
    build: { outDir: 'dist' }
  };
  if (opts.icons) {
    config.icons = { library: opts.icons, delivery: opts.iconDelivery };
  }
  return JSON.stringify(config, null, 2);
}

export function indexHtml(opts) {
  const themeCSS = THEME_CSS[opts.theme] || THEME_CSS.light;
  let iconLink = '';
  if (opts.icons === 'material' && opts.iconDelivery === 'cdn') {
    iconLink = '\n  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" data-icons="material">';
  } else if (opts.icons === 'lucide' && opts.iconDelivery === 'cdn') {
    iconLink = '\n  <script src="https://unpkg.com/lucide@latest" data-icons="lucide"></script>';
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${opts.name}</title>${iconLink}
  <style>${themeCSS}*{margin:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,sans-serif;color:var(--c3);background:var(--c0);min-height:100vh}a{color:var(--c1);text-decoration:none}a:hover{color:var(--c6)}</style>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/app.js"></script>
</body>
</html>`;
}

export function claudeMd(opts) {
  const srcStructure = opts.projectType === 'landing'
    ? '- `src/sections/` — Page sections (hero, features, pricing, footer)'
    : '- `src/pages/` — Route page components';

  return `# ${opts.name}

Built with [decantr](https://decantr.ai) v0.2.0 — AI-first web framework. Zero dependencies. Native JS/CSS/HTML.

## Project Structure

- \`src/app.js\` — Entry point, mounts the app to \`#app\`
${srcStructure}
- \`src/components/\` — Reusable components
- \`public/index.html\` — HTML shell with theme CSS variables
- \`decantr.config.json\` — Project configuration
- \`.decantr/manifest.json\` — Machine-readable project metadata

## Framework Conventions

### Imports
All framework imports use the \`decantr/\` prefix:
- \`import { h, mount } from 'decantr/core'\` — DOM engine (hyperscript, no JSX)
- \`import { createSignal, createEffect, createMemo, createStore } from 'decantr/state'\` — Reactivity
- \`import { createRouter, link, useRoute } from 'decantr/router'\` — Client-side routing
- \`import { setTheme, setStyle } from 'decantr/css'\` — Theme and style switching
- \`import { Button, Input, Card, Badge, Modal } from 'decantr/components'\` — UI components

### Components
Components are plain functions: \`function(props, ...children) → HTMLElement\`
- Use \`h(tag, attrs, ...children)\` to create DOM elements — returns real DOM nodes, not virtual
- Reactive props accept signal getters: \`Button({ disabled: () => isLoading() })\`
- No JSX, no build step required for components

### Reactivity
- \`const [getter, setter] = createSignal(initialValue)\` — reactive primitive
- \`createEffect(fn)\` — auto-tracks signal reads, re-runs when dependencies change
- \`createMemo(fn)\` — cached derived value, only recomputes when dependencies change
- \`createStore(obj)\` — reactive object with per-property tracking
- \`batch(fn)\` — batch multiple signal updates into one effect run

### Theming
- Current theme: **${opts.theme}** — colors via CSS variables \`--c0\` through \`--c9\`
- Current style: **${opts.style}** — visual treatment (shadows, borders, radius)
- 7 themes: light, dark, ai, nature, pastel, spice, mono
- 7 styles: glass, clay, flat, brutalist, skeuo, mono, sketchy
- Switch at runtime: \`setTheme('dark')\`, \`setStyle('glass')\`
- Any theme works with any style (49 combinations)

#### Color Variable Semantics
| Variable | Role           |
|----------|---------------|
| \`--c0\`   | background    |
| \`--c1\`   | primary       |
| \`--c2\`   | surface       |
| \`--c3\`   | foreground    |
| \`--c4\`   | muted         |
| \`--c5\`   | border        |
| \`--c6\`   | primary-hover |
| \`--c7\`   | success       |
| \`--c8\`   | warning       |
| \`--c9\`   | destructive   |

#### Style Tokens
| Style | \`--d-radius\` | \`--d-radius-lg\` | \`--d-shadow\` |
|-------|-----------|--------------|------------|
| flat | 6px | 8px | none |
| brutalist | 4px | 4px | 4px 4px 0 var(--c3) |
| glass | 12px | 16px | 0 8px 32px rgba(0,0,0,0.1) |
| clay | 16px | 24px | 8px 8px 16px ... (neumorphic) |
| skeuo | 8px | 10px | 0 2px 4px rgba(0,0,0,0.2) ... |
| mono | 6px | 8px | 0 1px 3px rgba(0,0,0,0.08) |
| sketchy | 255px 15px ... | 255px 25px ... | 2px 3px 0 rgba(0,0,0,0.15) |

### Component API
- **Button**: \`{ variant: 'primary'|'secondary'|'destructive'|'ghost'|'link', size: 'sm'|'lg', disabled, loading, block, onclick }\`
- **Input**: \`{ type, placeholder, value, disabled, error, prefix, suffix, readonly, oninput, ref }\`
- **Card**: \`{ title, hoverable }\` — composable with \`Card.Header()\`, \`Card.Body()\`, \`Card.Footer()\`
- **Badge**: \`{ count, dot, status: 'success'|'error'|'warning'|'processing' }\` — wraps children for superscript
- **Modal**: \`{ title, visible, onClose, width }\` — portals to document.body, supports Escape and click-outside

### Commands
- \`npx decantr dev\` — Dev server with hot reload (port ${opts.port})
- \`npx decantr build\` — Production build to \`dist/\`
- \`npx decantr test\` — Run tests with built-in test runner

### Testing
- \`import { describe, it, assert, render, flush } from 'decantr/test'\`
- \`const { container } = render(() => MyComponent())\` — renders into real DOM
- Run: \`npx decantr test\` or \`node --test test/*.test.js\`
`;
}

export function welcomeJs(opts) {
  return `import { h } from 'decantr/core';
import { Card, Button } from 'decantr/components';
import { icon } from 'decantr/components';

const features = [
  { title: 'Lightning Fast', desc: 'Sub-millisecond rendering with signal-based reactivity. No virtual DOM overhead.' },
  { title: 'Zero Dependencies', desc: 'Pure JavaScript, CSS, and HTML. Nothing to install, nothing to break.' },
  { title: 'AI-Native', desc: 'Designed for AI agents to read, generate, and maintain. Machine-readable manifests.' },
  { title: 'Tiny Bundle', desc: 'Under 2KB gzipped for a hello world. Your users will thank you.' },
  { title: 'Beautiful Defaults', desc: '7 themes and 7 design styles. Pick your aesthetic, switch at runtime.' },
  { title: 'Built-in Testing', desc: 'Test runner with DOM helpers. No config, no setup, just write tests.' }
];

export function Welcome() {
  return h('div', null,
    h('section', {
      style: {
        padding: '6rem 2rem', textAlign: 'center', background: 'var(--c2)',
        borderBottom: '1px solid var(--c5)'
      }
    },
      h('div', { style: { maxWidth: '680px', margin: '0 auto' } },
        h('h1', { style: { fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem' } },
          '${opts.name}'
        ),
        h('p', { style: { fontSize: '1.25rem', color: 'var(--c4)', lineHeight: '1.6', marginBottom: '2rem' } },
          'Built with decantr \\u2014 the AI-first web framework.'
        ),
        h('div', { style: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' } },
          Button({ variant: 'primary', size: 'lg' }, 'Get Started'),
          h('a', { href: 'https://github.com/david-aimi/decantr', target: '_blank', style: { textDecoration: 'none' } },
            Button({ size: 'lg' }, icon('github', { size: '1em' }), ' GitHub')
          )
        )
      )
    ),
    h('section', { style: { padding: '5rem 2rem' } },
      h('div', { style: { maxWidth: '1080px', margin: '0 auto' } },
        h('h2', { style: { fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem' } },
          'Everything you need'
        ),
        h('div', {
          style: {
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }
        },
          ...features.map(f =>
            Card({ hoverable: true },
              h('h3', { style: { fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' } }, f.title),
              h('p', { style: { color: 'var(--c4)', lineHeight: '1.6' } }, f.desc)
            )
          )
        )
      )
    ),
    h('footer', {
      style: { padding: '2rem', borderTop: '1px solid var(--c5)', textAlign: 'center' }
    },
      h('div', { style: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' } },
        h('a', { href: 'https://github.com/david-aimi/decantr', target: '_blank', style: { color: 'var(--c4)' } },
          icon('github', { size: '1.5em' })
        )
      ),
      h('p', { style: { color: 'var(--c4)', fontSize: '0.875rem' } },
        'Built with decantr v0.2.0 \\u2014 AI-first web framework'
      ),
      h('p', { style: { color: 'var(--c4)', fontSize: '0.75rem', marginTop: '0.5rem' } },
        '\\u00a9 2025 ${opts.name}. Powered by decantr.'
      )
    )
  );
}
`;
}

export function manifest(opts) {
  return JSON.stringify({
    $schema: 'https://decantr.ai/schemas/manifest.v2.json',
    version: '0.2.0',
    name: opts.name,
    projectType: opts.projectType,
    theme: opts.theme,
    style: opts.style,
    router: opts.router,
    entrypoint: 'src/app.js',
    shell: 'public/index.html',
    mountTarget: '#app'
  }, null, 2);
}
