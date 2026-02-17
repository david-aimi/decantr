import { h } from 'decantr/core';
import { createSignal } from 'decantr/state';
import { setTheme, getTheme, getThemeList, setStyle, getStyle, getStyleList } from 'decantr/css';
import { Button, Card } from 'decantr/components';
import { CodeBlock } from '../components/code-block.js';
import { ApiTable } from '../components/api-table.js';

const colorVars = [
  { variable: '--c0', role: 'background' },
  { variable: '--c1', role: 'primary' },
  { variable: '--c2', role: 'surface' },
  { variable: '--c3', role: 'foreground' },
  { variable: '--c4', role: 'muted' },
  { variable: '--c5', role: 'border' },
  { variable: '--c6', role: 'primary-hover' },
  { variable: '--c7', role: 'success' },
  { variable: '--c8', role: 'warning' },
  { variable: '--c9', role: 'destructive' }
];

export function CSSPage() {
  const themes = getThemeList();
  const styles = getStyleList();

  return h('div', null,
    h('h1', { style: { fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' } }, 'CSS, Themes & Styles'),
    h('p', { style: { color: 'var(--c4)', marginBottom: '2rem', lineHeight: '1.6' } },
      'Atomic CSS utilities, 7 color themes, 5 design styles, and runtime switching.'
    ),
    h('p', { style: { marginBottom: '1.5rem' } },
      h('code', { style: { fontSize: '0.875rem', background: 'var(--c2)', padding: '0.125rem 0.375rem', borderRadius: '4px' } },
        "import { css, setTheme, setStyle, getThemeList, getStyleList } from 'decantr/css'"
      )
    ),

    // Live theme/style picker
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'Live preview'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Change the theme and style to see the docs site update in real-time. 7 themes \u00d7 5 styles = 35 combinations.'
    ),
    Card({},
      h('div', { style: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap', padding: '0.25rem' } },
        h('div', null,
          h('p', { style: { fontSize: '0.75rem', fontWeight: '600', color: 'var(--c4)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' } }, 'Theme'),
          h('div', { style: { display: 'flex', gap: '0.375rem', flexWrap: 'wrap' } },
            ...themes.map(t =>
              Button({
                size: 'sm',
                variant: 'ghost',
                onclick: () => setTheme(t.id)
              }, t.name)
            )
          )
        ),
        h('div', null,
          h('p', { style: { fontSize: '0.75rem', fontWeight: '600', color: 'var(--c4)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' } }, 'Style'),
          h('div', { style: { display: 'flex', gap: '0.375rem', flexWrap: 'wrap' } },
            ...styles.map(s =>
              Button({
                size: 'sm',
                variant: 'ghost',
                onclick: () => setStyle(s.id)
              }, s.name)
            )
          )
        )
      )
    ),

    // Color variables
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '0.75rem' } }, 'Color variables'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'All themes use CSS variables --c0 through --c9 with consistent semantic meaning:'
    ),
    h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' } },
      ...colorVars.map(cv =>
        h('div', {
          style: {
            padding: '0.75rem', borderRadius: 'var(--d-radius, 6px)',
            border: '1px solid var(--c5)', textAlign: 'center'
          }
        },
          h('div', {
            style: {
              width: '100%', height: '2rem', borderRadius: '4px',
              background: `var(${cv.variable})`, marginBottom: '0.5rem',
              border: '1px solid var(--c5)'
            }
          }),
          h('code', { style: { fontSize: '0.75rem' } }, cv.variable),
          h('p', { style: { fontSize: '0.6875rem', color: 'var(--c4)', marginTop: '0.125rem' } }, cv.role)
        )
      )
    ),

    // Themes API
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'Themes API'),
    CodeBlock({ code: `import { setTheme, getTheme, getThemeMeta, getThemeList, registerTheme } from 'decantr/css';

// Switch theme
setTheme('dark');

// Get current theme signal
const theme = getTheme();
console.log(theme());  // 'dark'

// Get theme metadata
const meta = getThemeMeta();
console.log(meta.isDark);  // true

// List available themes
const themes = getThemeList();
// [{ id: 'light', name: 'Light' }, ...]

// Register custom theme
registerTheme({
  id: 'ocean',
  name: 'Ocean',
  colors: { '--c0': '#0c1929', '--c1': '#0ea5e9', /* ... */ },
  meta: { isDark: true, contrastText: '#fff', surfaceAlpha: 'rgba(12,25,41,0.8)' }
});` }),

    // Built-in themes
    h('p', { style: { marginTop: '0.75rem', marginBottom: '1.5rem', lineHeight: '1.6' } },
      'Built-in themes: light, dark, ai, nature, pastel, spice, mono.'
    ),

    // Styles API
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'Design styles'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Design styles control visual treatment: border radius, shadows, transitions, and component-specific CSS.'
    ),
    CodeBlock({ code: `import { setStyle, getStyle, getStyleList } from 'decantr/css';

setStyle('glass');

const style = getStyle();
console.log(style());  // 'glass'` }),

    // Style tokens table
    h('h3', { style: { fontSize: '1.125rem', fontWeight: '600', marginTop: '1.25rem', marginBottom: '0.75rem' } }, 'Style tokens'),
    h('div', { style: { overflowX: 'auto', marginBottom: '1.5rem' } },
      h('table', { style: { width: '100%', borderCollapse: 'collapse', background: 'var(--c2)', borderRadius: 'var(--d-radius, 6px)', overflow: 'hidden', fontSize: '0.8125rem' } },
        h('thead', null,
          h('tr', null,
            ...['Style', '--d-radius', '--d-shadow'].map(label =>
              h('th', { style: { padding: '0.625rem 1rem', fontWeight: '600', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c4)', textAlign: 'left', borderBottom: '1px solid var(--c5)' } }, label)
            )
          )
        ),
        h('tbody', null,
          ...[ ['flat', '6px', 'none'], ['brutalist', '4px', '4px 4px 0 var(--c3)'], ['glass', '12px', '0 8px 32px rgba(0,0,0,0.1)'], ['skeuo', '8px', '0 2px 4px rgba(0,0,0,0.2)'], ['sketchy', '255px 15px...', '2px 3px 0 rgba(0,0,0,0.15)'] ].map(([style, radius, shadow]) =>
            h('tr', null,
              h('td', { style: { padding: '0.625rem 1rem', borderBottom: '1px solid var(--c5)' } }, h('code', null, style)),
              h('td', { style: { padding: '0.625rem 1rem', borderBottom: '1px solid var(--c5)' } }, h('code', null, radius)),
              h('td', { style: { padding: '0.625rem 1rem', borderBottom: '1px solid var(--c5)' } }, h('code', null, shadow))
            )
          )
        )
      )
    ),

    // Atomic CSS
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'Atomic CSS'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'The css() function composes atomic class names and injects their styles at runtime. 150+ built-in atoms.'
    ),
    CodeBlock({ code: `import { css, define } from 'decantr/css';

// Use built-in atoms
h('div', { class: css('p4', 'flex', 'gap2', 'bg2', 'rounded') }, ...)

// Define custom atoms
define('brand-bg', 'background: linear-gradient(135deg, var(--c1), var(--c6))');

h('div', { class: css('brand-bg', 'p4') }, ...)` }),

    // Animations
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem' } }, 'Animations'),
    h('p', { style: { marginBottom: '0.75rem', lineHeight: '1.6' } },
      'Disable all JS-driven transitions and animations for users who prefer reduced motion.'
    ),
    CodeBlock({ code: `import { setAnimations, getAnimations } from 'decantr/css';

setAnimations(false);  // Disable all animations
setAnimations(true);   // Re-enable` }),

    h('p', { style: { marginTop: '0.75rem', marginBottom: '1.5rem', lineHeight: '1.6' } },
      'The prefers-reduced-motion media query is also respected automatically via base CSS.'
    ),

    // API summary
    h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '0.75rem' } }, 'API Summary'),
    ApiTable({ rows: [
      { name: 'css', signature: 'css(...classes) \u2192 string', description: 'Compose atomic CSS class names.' },
      { name: 'define', signature: 'define(name, declarations)', description: 'Define custom atomic classes.' },
      { name: 'setTheme', signature: 'setTheme(id)', description: 'Switch the active color theme.' },
      { name: 'getTheme', signature: 'getTheme() \u2192 signal', description: 'Get the current theme ID signal.' },
      { name: 'getThemeMeta', signature: 'getThemeMeta() \u2192 object', description: 'Get isDark, contrastText, surfaceAlpha.' },
      { name: 'getThemeList', signature: 'getThemeList() \u2192 array', description: 'List all registered themes.' },
      { name: 'registerTheme', signature: 'registerTheme(theme)', description: 'Register a custom theme.' },
      { name: 'setStyle', signature: 'setStyle(id)', description: 'Switch the active design style.' },
      { name: 'getStyle', signature: 'getStyle() \u2192 signal', description: 'Get the current style ID signal.' },
      { name: 'getStyleList', signature: 'getStyleList() \u2192 array', description: 'List all registered styles.' },
      { name: 'setAnimations', signature: 'setAnimations(enabled)', description: 'Enable or disable all JS animations.' }
    ]})
  );
}
