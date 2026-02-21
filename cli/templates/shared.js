/**
 * Shared template generators for all project types.
 */

const THEME_CSS = {
  'light': ':root{--c0:#ffffff;--c1:#1366D9;--c2:#f8fafc;--c3:#020817;--c4:#606D80;--c5:#DDE3ED;--c6:#0f52b5;--c7:#22c55e;--c8:#f59e0b;--c9:#ef4444;--d-radius:8px;--d-radius-lg:16px;--d-shadow:none;--d-transition:all 0.3s cubic-bezier(0.4,0,0.2,1)}',
  'dark': ':root{--c0:#1F1F1F;--c1:#0078D4;--c2:#181818;--c3:#CCCCCC;--c4:#858585;--c5:#3C3C3C;--c6:#026EC1;--c7:#2EA043;--c8:#CCA700;--c9:#F85149;--d-radius:4px;--d-radius-lg:6px;--d-shadow:none;--d-transition:all 0.15s ease}',
  'retro': ':root{--c0:#fffef5;--c1:#e63946;--c2:#fff8e7;--c3:#1a1a1a;--c4:#6b7280;--c5:#1a1a1a;--c6:#c1121f;--c7:#2d6a4f;--c8:#f77f00;--c9:#d00000;--d-radius:4px;--d-radius-lg:4px;--d-shadow:4px 4px 0 #1a1a1a;--d-transition:all 0.1s ease}',
  'hot-lava': ':root{--c0:#050810;--c1:#ff4d4d;--c2:#0a0f1a;--c3:#f0f4ff;--c4:#8892b0;--c5:rgba(136,146,176,0.15);--c6:#e63946;--c7:#00e5cc;--c8:#fbbf24;--c9:#ef4444;--d-radius:12px;--d-radius-lg:16px;--d-shadow:0 4px 24px rgba(255,77,77,0.15),0 2px 8px rgba(0,0,0,0.3);--d-transition:all 0.3s cubic-bezier(0.22,1,0.36,1)}',
  'stormy-ai': ':root{--c0:#0a0c10;--c1:#38bdf8;--c2:#111318;--c3:#c5d3e8;--c4:#6b7a94;--c5:#252a33;--c6:#7dd3fc;--c7:#4ade80;--c8:#fbbf24;--c9:#ef4444;--d-radius:12px;--d-radius-lg:16px;--d-shadow:0 8px 32px rgba(0,0,0,0.3);--d-transition:all 0.25s cubic-bezier(0.4,0,0.2,1)}'
};

const ICON_MAP = {
  home:           { material: 'home',          lucide: 'home' },
  dashboard:      { material: 'dashboard',     lucide: 'layout-dashboard' },
  table:          { material: 'table_chart',   lucide: 'table' },
  settings:       { material: 'settings',      lucide: 'settings' },
  bell:           { material: 'notifications', lucide: 'bell' },
  user:           { material: 'person',        lucide: 'user' },
  'trending-up':  { material: 'trending_up',   lucide: 'trending-up' },
  'trending-down':{ material: 'trending_down', lucide: 'trending-down' },
  users:          { material: 'group',         lucide: 'users' },
  dollar:         { material: 'attach_money',  lucide: 'dollar-sign' },
  activity:       { material: 'show_chart',    lucide: 'activity' },
  chart:          { material: 'bar_chart',     lucide: 'bar-chart-3' },
  search:         { material: 'search',        lucide: 'search' },
  edit:           { material: 'edit',          lucide: 'pencil' },
  delete:         { material: 'delete',        lucide: 'trash-2' },
  'user-plus':    { material: 'person_add',    lucide: 'user-plus' },
  save:           { material: 'save',          lucide: 'save' },
  bolt:           { material: 'bolt',          lucide: 'zap' },
  package:        { material: 'inventory_2',   lucide: 'package' },
  bot:            { material: 'smart_toy',     lucide: 'bot' },
  compress:       { material: 'compress',      lucide: 'minimize-2' },
  palette:        { material: 'palette',       lucide: 'palette' },
  flask:          { material: 'science',       lucide: 'flask-conical' },
  code:           { material: 'code',          lucide: 'code' },
  check:          { material: 'check',         lucide: 'check' },
  star:           { material: 'star',          lucide: 'star' },
  shield:         { material: 'shield',        lucide: 'shield' },
  mail:           { material: 'mail',          lucide: 'mail' },
  lock:           { material: 'lock',          lucide: 'lock' },
  alert:          { material: 'warning',       lucide: 'alert-triangle' }
};

export function iconName(semantic, opts) {
  if (!opts || !opts.icons) return null;
  const entry = ICON_MAP[semantic];
  return entry ? entry[opts.icons] : null;
}

export function iconExpr(semantic, opts, props = {}) {
  const name = iconName(semantic, opts);
  if (!name) return '';
  const propsEntries = Object.entries({ size: '1em', 'aria-hidden': 'true', ...props });
  const propsStr = propsEntries.map(([k, v]) => `'${k}': '${v}'`).join(', ');
  return `icon('${name}', { ${propsStr} })`;
}

export function iconImport(opts) {
  if (!opts || !opts.icons) return '';
  return "import { icon } from 'decantr/components';\n";
}

export function optIcon(name, opts, props = {}) {
  const expr = iconExpr(name, opts, props);
  return expr || 'null';
}

export function packageJson(name, opts = {}) {
  const scripts = {
    dev: 'decantr dev',
    build: 'decantr build',
    test: 'decantr test'
  };
  const dependencies = {
    decantr: '^0.3.0'
  };

  if (opts.iconDelivery === 'npm') {
    scripts.postinstall = 'node scripts/vendor-icons.js';
    if (opts.icons === 'lucide') dependencies.lucide = '^0.474.0';
    if (opts.icons === 'material') dependencies['material-icons'] = '^1.13.12';
  }

  return JSON.stringify({
    name,
    version: '0.1.0',
    type: 'module',
    scripts,
    dependencies
  }, null, 2);
}

export function configJson(opts) {
  const config = {
    $schema: 'https://decantr.ai/schemas/config.v2.json',
    name: opts.name,
    projectType: opts.projectType,
    theme: opts.theme,
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
  } else if (opts.icons === 'material' && opts.iconDelivery === 'npm') {
    iconLink = '\n  <link href="/vendor/material-icons/material-icons.css" rel="stylesheet" data-icons="material">';
  } else if (opts.icons === 'lucide' && opts.iconDelivery === 'cdn') {
    iconLink = '\n  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" data-icons="lucide"></script>';
  } else if (opts.icons === 'lucide' && opts.iconDelivery === 'npm') {
    iconLink = '\n  <script src="/vendor/lucide.min.js" data-icons="lucide"></script>';
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${opts.name}</title>${iconLink}
  <style>${themeCSS}*{margin:0;box-sizing:border-box}body{font-family:Inter,"Inter Fallback",system-ui,sans-serif;color:var(--c3);background:var(--c0);min-height:100vh}a{color:var(--c1);text-decoration:none}a:hover{color:var(--c6)}</style>
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

Built with [decantr](https://decantr.ai) v0.3.0 — AI-first web framework. Zero dependencies. Native JS/CSS/HTML.

## Project Structure

- \`src/app.js\` — Entry point, mounts the app to \`#app\`
${srcStructure}
- \`src/components/\` — Reusable components
- \`public/index.html\` — HTML shell with theme CSS variables
- \`decantr.config.json\` — Project configuration
- \`.decantr/manifest.json\` — Machine-readable project metadata
- \`src/registry/\` — Machine-readable API catalog (index.json + per-module specs)

## Framework Conventions

### Rendering (use decantr/tags — fewer tokens)
\`\`\`js
import { tags } from 'decantr/tags';
const { div, section, h2, p, button, span, a, nav, input, label, form } = tags;
\`\`\`
- First arg: props object or first child (auto-detected)
- \`div({ class: 'card' }, h2('Title'))\` — with props
- \`p('Hello')\` — no props, just children
- For reactivity: \`import { text, cond, list } from 'decantr/core'\`
- Fallback: \`import { h } from 'decantr/core'\` — \`h(tag, props, ...children)\`

### Imports
All framework imports use the \`decantr/\` prefix:
- \`import { tags } from 'decantr/tags'\` — Proxy tag functions (recommended for markup)
- \`import { h, text, cond, list, mount } from 'decantr/core'\` — DOM engine
- \`import { createSignal, createEffect, createMemo, createStore, batch } from 'decantr/state'\` — Reactivity
- \`import { createRouter, link, navigate, useRoute } from 'decantr/router'\` — Client-side routing
- \`import { setTheme } from 'decantr/css'\` — Theme switching
- \`import { Button, Input, Card, Badge, Modal, ... } from 'decantr/components'\` — UI components

### Components
Components are plain functions: \`function(props, ...children) → HTMLElement\`
- Reactive props accept signal getters: \`Button({ disabled: () => isLoading() })\`
- No JSX, no build step required for components

### Reactivity
- \`const [getter, setter] = createSignal(initialValue)\` — reactive primitive
- \`createEffect(fn)\` — auto-tracks signal reads, re-runs when dependencies change
- \`createMemo(fn)\` — cached derived value, only recomputes when dependencies change
- \`createStore(obj)\` — reactive object with per-property tracking
- \`batch(fn)\` — batch multiple signal updates into one effect run

### Theming
- Current theme: **${opts.theme}** — each theme is a complete visual identity (colors + design tokens + component CSS)
- 5 unified themes: light, dark, retro, hot-lava, stormy-ai
- Switch at runtime: \`setTheme('dark')\`
- Colors via CSS variables \`--c0\` through \`--c9\`, tokens via \`--d-radius\`, \`--d-radius-lg\`, \`--d-shadow\`, \`--d-transition\`

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

### Component API
21 components, all return HTMLElement. Props marked with \`*\` accept reactive signal getters.
See \`src/registry/components.json\` for full props, types, and enums.
Quick reference: Button, Input, Textarea, Checkbox, Switch, Select, Card, Badge,
Modal, Tabs, Accordion, Table, Breadcrumb, Separator, Avatar, Progress, Skeleton,
Tooltip, Alert, toast(), icon()

### Code Generation Rules
1. **Use \`tags\` for all markup** — \`const { div, section, h2, p, button } = tags;\` Always prefer over \`h()\` (~25% fewer tokens).
2. **Atoms first** — \`class: css('_flex _gap4 _p6 _bg2')\` for all layout, spacing, typography, color. Only \`style:\` for dynamic/computed values.
3. **One component per file, named export** — Signal state at top, DOM return at bottom.
4. **Reactive props use getters** — \`Button({ disabled: () => isLoading() })\`, not \`Button({ disabled: isLoading() })\`.
5. **Consult the registry** — Read \`src/registry/components.json\` before generating component code. \`src/registry/index.json\` for full API overview.
6. **No external CSS or frameworks** — All styling through \`css()\` atoms and theme CSS variables.
7. **Accessibility is mandatory** — Every interactive element needs an accessible name; icon-only buttons need \`aria-label\`.

### Accessibility (WCAG 2.1 AA)
- Every interactive element must have an accessible name (visible text or \`aria-label\`)
- Icon-only buttons need \`aria-label\`: \`Button({ 'aria-label': 'Close' }, icon('x'))\`
- Decorative icons: \`aria-hidden="true"\`
- Modal: \`role="dialog"\`, \`aria-modal="true"\`, \`aria-labelledby\`, focus trap
- Visible focus indicators on all interactive elements
- Color must not be the sole state indicator — pair with text/icons
- \`prefers-reduced-motion\` respected automatically; use \`setAnimations(false)\` for in-app toggle
- Use semantic HTML (\`<button>\`, \`<nav>\`, \`<main>\`) over generic \`<div>\`/\`<span>\`
- All components must be keyboard-operable
- No content flashing more than 3 times/second

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
  const hasIcons = !!opts.icons;
  const featureIcons = ['bolt', 'package', 'bot', 'compress', 'palette', 'flask'];

  const featureIconExprs = featureIcons.map(name => iconExpr(name, opts));

  const featureCards = hasIcons
    ? `          ...features.map((f, i) =>
            Card({ hoverable: true },
              h3({ style: { fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' } },
                featureIcons[i], f.title
              ),
              p({ style: { color: 'var(--c4)', lineHeight: '1.6' } }, f.desc)
            )
          )`
    : `          ...features.map(f =>
            Card({ hoverable: true },
              h3({ style: { fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' } }, f.title),
              p({ style: { color: 'var(--c4)', lineHeight: '1.6' } }, f.desc)
            )
          )`;

  const heroButton = hasIcons
    ? `          Button({ variant: 'primary', size: 'lg' }, 'Get Started'),
          a({ href: 'https://github.com/decantr-ai/decantr', target: '_blank', style: { textDecoration: 'none' } },
            Button({ size: 'lg' }, ${iconExpr('code', opts)}, ' GitHub')
          )`
    : `          Button({ variant: 'primary', size: 'lg' }, 'Get Started'),
          a({ href: 'https://github.com/decantr-ai/decantr', target: '_blank', style: { textDecoration: 'none' } },
            Button({ size: 'lg' }, 'GitHub')
          )`;

  const footerIcon = hasIcons
    ? `      div({ style: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' } },
        a({ href: 'https://github.com/decantr-ai/decantr', target: '_blank', 'aria-label': 'Source code', style: { color: 'var(--c4)' } },
          ${iconExpr('code', opts, { size: '1.5em', 'aria-hidden': 'true' })}
        )
      ),`
    : '';

  const featureIconsArray = hasIcons
    ? `\nconst featureIcons = [\n${featureIconExprs.map(e => `  ${e}`).join(',\n')}\n];\n`
    : '';

  return `import { tags } from 'decantr/tags';
import { Card, Button } from 'decantr/components';
${iconImport(opts)}const { div, section, h1, h2, h3, p, a, footer } = tags;

const features = [
  { title: 'Lightning Fast', desc: 'Sub-millisecond rendering with signal-based reactivity. No virtual DOM overhead.' },
  { title: 'Zero Dependencies', desc: 'Pure JavaScript, CSS, and HTML. Nothing to install, nothing to break.' },
  { title: 'AI-Native', desc: 'Designed for AI agents to read, generate, and maintain. Machine-readable manifests.' },
  { title: 'Tiny Bundle', desc: 'Under 2KB gzipped for a hello world. Your users will thank you.' },
  { title: 'Beautiful Defaults', desc: '5 unified themes. Pick your aesthetic, switch at runtime.' },
  { title: 'Built-in Testing', desc: 'Test runner with DOM helpers. No config, no setup, just write tests.' }
];
${featureIconsArray}
export function Welcome() {
  return div(
    section({
      style: {
        padding: '6rem 2rem', textAlign: 'center', background: 'var(--c2)',
        borderBottom: '1px solid var(--c5)'
      }
    },
      div({ style: { maxWidth: '680px', margin: '0 auto' } },
        h1({ style: { fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem' } },
          '${opts.name}'
        ),
        p({ style: { fontSize: '1.25rem', color: 'var(--c4)', lineHeight: '1.6', marginBottom: '2rem' } },
          'Built with decantr \\u2014 the AI-first web framework.'
        ),
        div({ style: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' } },
${heroButton}
        )
      )
    ),
    section({ style: { padding: '5rem 2rem' } },
      div({ style: { maxWidth: '1080px', margin: '0 auto' } },
        h2({ style: { fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem' } },
          'Everything you need'
        ),
        div({
          style: {
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }
        },
${featureCards}
        )
      )
    ),
    footer({
      style: { padding: '2rem', borderTop: '1px solid var(--c5)', textAlign: 'center' }
    },
${footerIcon}
      p({ style: { color: 'var(--c4)', fontSize: '0.875rem' } },
        'Built with decantr v0.3.0 \\u2014 AI-first web framework'
      ),
      p({ style: { color: 'var(--c4)', fontSize: '0.75rem', marginTop: '0.5rem' } },
        '\\u00a9 2025 ${opts.name}. Powered by decantr.'
      )
    )
  );
}
`;
}

export function vendorIconsJs(opts) {
  if (opts.icons === 'lucide') {
    return `import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, 'node_modules', 'lucide', 'dist', 'umd', 'lucide.min.js');
const dest = join(root, 'public', 'vendor', 'lucide.min.js');

if (!existsSync(src)) {
  console.log('lucide not found in node_modules — skipping vendor copy');
  process.exit(0);
}

mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);
console.log('Copied lucide.min.js to public/vendor/');
`;
  }

  if (opts.icons === 'material') {
    return `import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const srcDir = join(root, 'node_modules', 'material-icons', 'iconfont');
const destDir = join(root, 'public', 'vendor', 'material-icons');

if (!existsSync(srcDir)) {
  console.log('material-icons not found in node_modules — skipping vendor copy');
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });

const files = readdirSync(srcDir).filter(f =>
  f.endsWith('.css') || f.endsWith('.woff') || f.endsWith('.woff2')
);
for (const f of files) {
  copyFileSync(join(srcDir, f), join(destDir, f));
}
console.log(\`Copied \${files.length} material-icons files to public/vendor/material-icons/\`);
`;
  }

  return '';
}

export function manifest(opts) {
  return JSON.stringify({
    $schema: 'https://decantr.ai/schemas/manifest.v2.json',
    version: '0.2.0',
    name: opts.name,
    projectType: opts.projectType,
    theme: opts.theme,
    router: opts.router,
    entrypoint: 'src/app.js',
    shell: 'public/index.html',
    mountTarget: '#app'
  }, null, 2);
}
