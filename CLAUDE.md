# decantr — Framework Reference

AI-first web framework. Zero dependencies. Native JS/CSS/HTML. v0.3.0

Decantr is designed for LLMs to generate, read, and maintain — not for human readability. Every API is optimized for token efficiency: terse atomic CSS atoms, proxy-based tag functions that eliminate string tag names, and a machine-readable registry (`src/registry/`) so agents can look up props and exports without parsing source files.

## Project Structure

```
src/
  core/         — DOM engine: h(), text(), cond(), list(), mount(), lifecycle hooks
  state/        — Reactivity: signals, effects, memos, stores, batching
  router/       — Client-side routing: hash and history strategies
  css/          — Unified themes, atomic CSS, runtime injection
    themes/     — 5 unified theme definitions (light, dark, retro, hot-lava, stormy-ai)
  tags/         — Proxy-based tag functions for concise markup
  components/   — UI component library (21 components + icon)
  blocks/       — Content block library (Hero, Features, Pricing, Testimonials, CTA, Footer)
  kit/          — Domain-specific component kits (dashboard, auth, content)
    dashboard/  — Sidebar, DashboardHeader, StatsGrid, KPICard, ActivityFeed, DataTable, ChartPlaceholder
    auth/       — LoginForm, RegisterForm, ForgotPasswordForm, AuthLayout
    content/    — ArticleLayout, AuthorCard, TableOfContents, PostList, CategoryNav
  wizard/       — Built-in visual project wizard (served by dev server)
  test/         — Test runner with lightweight DOM implementation
  registry/     — Machine-readable API catalog (index.json + per-module specs, auto-generated)
blueprints/     — Declarative scaffold specs (10 website variants in 3 categories)
cli/
  commands/     — CLI commands: init, dev, build, test
  templates/    — Legacy project scaffolding templates
tools/          — Build tooling: dev-server, builder, scaffolder, css-extract, minify, registry generator
test/           — Framework test suite
playground/     — Scaffolded test project
```

## Module Exports

### `decantr/core` — src/core/index.js
- `h(tag, attrs, ...children)` — Create DOM elements (hyperscript)
- `text(fn)` — Create reactive text node from getter function
- `cond(predicate, trueBranch, falseBranch)` — Conditional rendering
- `list(items, keyFn, renderFn)` — Keyed list rendering
- `mount(component, target)` — Mount component to DOM element
- `onMount(fn)` — Register callback for after mount
- `onDestroy(fn)` — Register callback for teardown

### `decantr/state` — src/state/index.js
- `createSignal(initial)` — Returns `[getter, setter]` reactive primitive
- `createEffect(fn)` — Auto-tracking reactive effect
- `createMemo(fn)` — Cached derived computation
- `createStore(obj)` — Reactive object with per-property proxy tracking
- `batch(fn)` — Batch multiple signal updates into one effect flush

### `decantr/router` — src/router/index.js
- `createRouter(config)` — Create router. Config: `{ mode: 'hash'|'history', routes: [{path, component}] }`
- `link(href, attrs, ...children)` — Router-aware anchor element
- `navigate(path)` — Programmatic navigation
- `useRoute()` — Get current route signal

Strategies: `hash` (default), `history` (History API)

### `decantr/css` — src/css/index.js
- `css(...classes)` — Compose atomic CSS class names
- `define(name, declarations)` — Define custom atomic classes
- `extractCSS()` — Get all generated CSS as string
- `reset()` — Clear injected styles
- `setTheme(id)` / `getTheme()` / `getThemeMeta()` — Theme control (5 unified themes)
- `registerTheme(theme)` / `getThemeList()` — Custom themes
- `getActiveCSS()` — Get complete CSS for active theme
- `resetStyles()` — Reset to default (light) theme
- `setAnimations(enabled)` / `getAnimations()` — JS animation control (disable all transitions/animations)
- `setStyle()` / `getStyle()` / `getStyleList()` / `registerStyle()` — **Deprecated** (log warnings, no-op)

### `decantr/tags` — src/tags/index.js (primary API for code generation — always prefer over h())
- `tags` — Proxy object that creates tag functions on demand
- Destructure what you need: `const { div, h2, p, button, span } = tags;`
- First arg auto-detected as props object or child node
- `div({ class: 'card' }, h2('Title'))` — with props
- `p('Hello')` — no props, just children
- ~25% fewer tokens than `h()` calls — no string tag names, no `null` for empty props

### `decantr/components` — src/components/index.js
21 components + icon helper. All return HTMLElement. Reactive props accept signal getters.
Before generating component code, read `src/registry/components.json` for full props, types, and enums.

**Form:** Button, Input, Textarea, Checkbox, Switch, Select
**Display:** Card (+Header/Body/Footer), Badge, Table, Avatar, Progress, Skeleton
**Layout:** Tabs, Accordion, Separator, Breadcrumb
**Overlay & Feedback:** Modal, Tooltip, Alert, toast(), icon()

### Domain Kits — `decantr/kit/*`

Three domain kits compose primitives into higher-level components. Full architecture docs: `reference/kit-architecture.md`

**`decantr/kit/dashboard`**: Sidebar, DashboardHeader, StatsGrid, KPICard, ActivityFeed, DataTable, ChartPlaceholder
**`decantr/kit/auth`**: LoginForm, RegisterForm, ForgotPasswordForm, AuthLayout
**`decantr/kit/content`**: ArticleLayout, AuthorCard, TableOfContents, PostList, CategoryNav

Registry: `src/registry/kit-dashboard.json`, `kit-auth.json`, `kit-content.json` for full props/types.

**Kit utilities** (`src/kit/_shared.js`):
- `resolve(prop)` — Returns `prop()` if function (signal getter), else `prop` as-is
- `reactiveText(prop)` — Creates auto-updating text node from signal getter
- `injectBase()` — Injects base CSS (called first in every kit component)
- `cx()` — Safe CSS class composition (merges user `class` prop)

**Reactive prop pattern**: Kit components accept signal getters OR static values:
```javascript
// Signal getter — auto-tracks changes
StatsGrid({ items: () => stats() })
// Static value — no tracking
StatsGrid({ items: staticArray })
```
Detection: `typeof prop === 'function'`

**Note**: Kit source uses `h()` internally. User-facing code (pages, app.js) uses `tags`.

### Blueprints — `blueprints/`

Declarative JSON specs for 10 website variants across 3 categories. Full schema and section type reference: `reference/blueprint-reference.md`

- `blueprints/_index.json` — Master catalog (3 categories, 10 variants)
- `blueprints/dashboard/` — analytics, stock-tracker, daily-planner, project-manager
- `blueprints/content/` — blog, portfolio, documentation
- `blueprints/marketing/` — saas-landing, agency, startup

Each blueprint defines: `layout` (sidebar/topnav/minimal/landing), `routes`, `pages` with `sections` (mapped to kit components via SECTION_MAP), optional `mockData`.

### Scaffolder — `tools/scaffolder.js`

Blueprint-to-code generator. Full API reference: `reference/scaffolder-api.md`

- `scaffoldProject(projectRoot, blueprintId, options)` → `[path, content]` tuples
- `loadBlueprint(blueprintId)` → single blueprint JSON
- `loadCatalog()` → full catalog with variants
- `getRequiredDirs(files)` → directory list for mkdir

### `decantr/test` — src/test/index.js
- `describe`, `it`, `test`, `before`, `after`, `beforeEach`, `afterEach`, `mock` — Re-exports from `node:test`
- `assert` — `node:assert/strict`
- `createDOM()` — Create isolated DOM environment
- `render(fn)` — Render component, returns `{ container }`
- `fire(element, event, detail)` — Dispatch DOM events
- `flush()` — Flush pending reactive effects

## Code Generation Rules

1. **Use `tags` for all markup** — `const { div, section, h2, p, button } = tags;` Always prefer over `h()` (~25% fewer tokens).
2. **Atoms first** — `class: css('_flex _gap4 _p6 _bg2')` for all layout, spacing, typography, color. Only `style:` for dynamic/computed values.
3. **One component per file, named export** — Signal state at top, DOM return at bottom.
4. **Reactive props use getters** — `Button({ disabled: () => isLoading() })`, not `Button({ disabled: isLoading() })`.
5. **Consult the registry** — Read `src/registry/components.json` before generating component code. `src/registry/index.json` for full API overview.
6. **No external CSS or frameworks** — All styling through `css()` atoms and theme CSS variables.
7. **Accessibility is mandatory** — Every interactive element needs an accessible name; icon-only buttons need `aria-label`.

## Color Variable Semantics

All 5 unified themes use CSS variables `--c0` through `--c9` with consistent semantic meaning:

| Variable | Semantic Role  | Example (light)  | Example (dark)   |
|----------|---------------|------------------|------------------|
| `--c0`   | background    | `#ffffff`        | `#1F1F1F`        |
| `--c1`   | primary       | `#1366D9`        | `#0078D4`        |
| `--c2`   | surface       | `#f8fafc`        | `#181818`        |
| `--c3`   | foreground    | `#020817`        | `#CCCCCC`        |
| `--c4`   | muted         | `#606D80`        | `#858585`        |
| `--c5`   | border        | `#DDE3ED`        | `#3C3C3C`        |
| `--c6`   | primary-hover | `#0f52b5`        | `#026EC1`        |
| `--c7`   | success       | `#22c55e`        | `#2EA043`        |
| `--c8`   | warning       | `#f59e0b`        | `#CCA700`        |
| `--c9`   | destructive   | `#ef4444`        | `#F85149`        |

Theme metadata: each theme also exposes `isDark`, `contrastText`, and `surfaceAlpha` via `getThemeMeta()`.

## Unified Themes

Each theme is a complete visual identity: colors, design tokens, global CSS, and per-component CSS (20 components).

| Theme      | Description                                    | isDark |
|------------|------------------------------------------------|--------|
| light      | Clean flat + frosted glass cards, blue accents | false  |
| dark       | Same design approach, deep navy palette        | true   |
| retro      | Neobrutalism — bold borders, offset shadows    | false  |
| hot-lava   | Deep space, coral & cyan glassmorphism         | true   |
| stormy-ai  | Storm grays, lightning blue/cyan glows         | true   |

Design tokens are bundled per-theme (`--d-radius`, `--d-radius-lg`, `--d-shadow`, `--d-transition`, `--d-pad`).

### Custom Themes

```javascript
registerTheme({
  id: 'my-theme',
  name: 'My Theme',
  colors: { '--c0': '#fff', '--c1': '#000', /* ... c2-c9 */ },
  meta: { isDark: false, contrastText: '#fff', surfaceAlpha: 'rgba(255,255,255,0.8)' },
  tokens: { '--d-radius': '8px', '--d-radius-lg': '16px', '--d-shadow': 'none', '--d-transition': 'all 0.2s ease', '--d-pad': '1.25rem' },
  global: '',       // optional: body styles, keyframes, scrollbar CSS
  components: {}    // optional: 20 component CSS keys (button, card, input, etc.)
});
```

## Component Spacing Architecture

Components use a two-layer CSS system: base CSS (`_base.js`) for structure, theme CSS (`themes/*.js`) for visual identity.

**Spacing token `--d-pad`** controls internal padding for container components (card header/body/footer, modal header/body/footer). Base CSS uses `var(--d-pad, 1.25rem)` as the fallback, and each theme sets its own value:

| Token | light | dark | retro | hot-lava | stormy-ai |
|-------|-------|------|-------|----------|-----------|
| `--d-pad` | 1.5rem | 1.25rem | 1.25rem | 1.5rem | 1.5rem |

**Composition guidelines:**
- **External layout** — Use atomic CSS (`_gap4`, `_grid _gc3`, `_p6`) for spacing between components
- **Internal spacing** — Components handle their own padding via `--d-pad` token; don't add padding inside Card/Modal wrappers
- **Theme overrides** — Only add padding in theme CSS when it intentionally differs from base (e.g. retro's accordion/tabs)

## CLI Commands

```
decantr init [name]   # Create minimal skeleton, then run `decantr dev` for visual wizard
decantr dev           # Dev server with hot reload (serves wizard if unscaffolded)
decantr build         # Production build to dist/
decantr test          # Run tests via node --test
decantr test --watch  # Watch mode
```

### New Init Flow

1. `decantr init myapp` — creates minimal skeleton (package.json, config, HTML shell, empty src/)
2. `cd myapp && npm install && npx decantr dev` — dev server detects unscaffolded project
3. Browser opens → visual wizard at localhost
4. Wizard: Category → Variant → Theme → Customize → Scaffold
5. Scaffolder writes all files, HMR reloads → user sees their app

## Framework Conventions

- **Function components** — `function(props, ...children) → HTMLElement`. Real DOM nodes, not virtual DOM.
- **Unified themes** — 5 complete visual identities (light, dark, retro, hot-lava, stormy-ai), switchable via `setTheme(id)`.
- **Atomic CSS engine** — 1000+ utility atoms available via `css()`. All atoms are prefixed with `_` for namespace safety. See reference below.

## Testing

```javascript
import { describe, it, assert, render, flush } from 'decantr/test';

describe('MyComponent', () => {
  it('renders', () => {
    const { container } = render(() => MyComponent());
    assert.ok(container.querySelector('.my-class'));
  });
});
```

Run: `node --test test/*.test.js`

## Build Tooling (tools/)

- `dev-server.js` — Development server with file watching, hot reload, wizard serving, blueprint API, scaffold endpoint. Routes reference: `reference/dev-server-routes.md`
- `builder.js` — Production bundler (HTML, JS, CSS extraction)
- `scaffolder.js` — Blueprint → code generator. API reference: `reference/scaffolder-api.md`
- `scaffold-templates.js` — Template utilities for scaffolder (packageJson, indexHtml, configJson, etc.)
- `css-extract.js` — Extract and deduplicate atomic CSS from source
- `minify.js` — JS/CSS/HTML minification
- `registry.js` — Auto-generates `src/registry/` (index + per-module specs) from JSDoc annotations. Run: `node tools/registry.js`

## Reference Docs (reference/)

Deep-dive documentation for each subsystem. Read when working on that specific area.

- `reference/kit-architecture.md` — Kit component patterns, _shared.js utilities, reactive props, how to add new kits
- `reference/blueprint-reference.md` — Full blueprint schema, SECTION_MAP, mock data format, adding new blueprints
- `reference/scaffolder-api.md` — scaffoldProject() API, generated file structure, code generation flow
- `reference/dev-server-routes.md` — Special routes, import rewriting, wizard serving, scaffold detection

## Accessibility (WCAG 2.1 AA)

All generated code **must** meet WCAG 2.1 AA. Follow these rules:

- **Accessible names** — Every interactive element must have an accessible name (visible text, `aria-label`, or `aria-labelledby`)
- **Icon-only buttons** — Must include `aria-label`: `Button({ 'aria-label': 'Close' }, icon('x'))`
- **Decorative icons** — Use `aria-hidden="true"` on icons that don't convey meaning
- **Modal** — Use `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title, and trap focus within the modal while open
- **Focus indicators** — All interactive elements must have visible focus indicators (`:focus-visible` outline)
- **Color is not enough** — Never use color as the sole indicator of state; pair with text, icons, or patterns
- **Reduced motion** — `prefers-reduced-motion` is respected automatically via base CSS; use `setAnimations(false)` for in-app animation toggle
- **Semantic HTML** — Use `<button>`, `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>` over generic `<div>`/`<span>` where appropriate
- **Keyboard navigation** — All interactive components must be operable with keyboard alone (Tab, Enter, Escape, arrow keys)
- **No flashing** — Content must not flash more than 3 times per second

## Atomic CSS Reference

All atoms are prefixed with `_` (underscore) for namespace safety — zero conflicts with Tailwind, Bootstrap, or any CSS framework. Every decantr atom starts with `_`.

All atoms are available via `css()`. Example: `css('_grid _gc3 _gap4 _p6 _ctr')`.

### Spacing (_p, _m, _gap — scale 0-12 + 14,16,20,24,32,40,48,56,64)
| Prefix | Property | Example |
|--------|----------|---------|
| `_p` | padding | `_p4` → `1rem` |
| `_px/_py` | padding-inline/block | `_px2` → `0.5rem` |
| `_pt/_pr/_pb/_pl` | padding sides | `_pt1` → `0.25rem` |
| `_m` | margin | `_m4` → `1rem` |
| `_mx/_my` | margin-inline/block | `_mx2` → `0.5rem` |
| `_mt/_mr/_mb/_ml` | margin sides | `_mt1` → `0.25rem` |
| `_gap/_gx/_gy` | gap/column-gap/row-gap | `_gap4` → `1rem` |

### Negative Margins (scale 1-12 + 14,16,20,24,32)
`_-m2` → `margin:-0.5rem`, `_-mt4` → `margin-top:-1rem`, `_-mx1`, `_-my3`, `_-mr2`, `_-mb1`, `_-ml4`

### Auto Margins
`_ma` (margin:auto), `_mxa` (margin-inline:auto), `_mya` (margin-block:auto), `_mta`, `_mra`, `_mba`, `_mla`

### Width/Height (scale 0-12 + extended + keywords)
| Atom | Output |
|------|--------|
| `_w4/_h4` | width/height: 1rem |
| `_wfull/_hfull` | 100% |
| `_wscreen` | width:100vw |
| `_hscreen` | height:100vh |
| `_wauto/_hauto` | auto |
| `_wfit/_hfit` | fit-content |
| `_wmin/_wmax` | min-content/max-content |
| `_hmin/_hmax` | min-content/max-content |
| `_mw4/_mh4` | max-width/max-height |
| `_mwmin/_mwmax` | max-width: min/max-content |
| `_mhmin/_mhmax` | max-height: min/max-content |

### Min-Width/Height (scale 0-12 + extended + keywords)
`_minw0`-`_minw64`, `_minwfull`, `_minwscreen` (100vw), `_minwfit`, `_minwmin`, `_minwmax`
`_minh0`-`_minh64`, `_minhfull`, `_minhscreen` (100vh), `_minhfit`, `_minhmin`, `_minhmax`

### Display
`_block`, `_inline`, `_flex`, `_grid`, `_none`, `_contents`, `_iflex`, `_igrid`

### Flexbox
| Atom | Output |
|------|--------|
| `_col/_row` | flex-direction |
| `_colr/_rowr` | column-reverse/row-reverse |
| `_wrap/_nowrap/_wrapr` | flex-wrap |
| `_grow/_grow0` | flex-grow: 1/0 |
| `_shrink/_shrink0` | flex-shrink: 1/0 |
| `_flex1` | flex: 1 1 0% |
| `_flexauto` | flex: 1 1 auto |
| `_flexnone` | flex: none |
| `_flexinit` | flex: 0 1 auto |

### Flex-Basis (scale 0-12 + extended + percentages)
`_basis0`-`_basis12`, `_basis14`-`_basis64`, `_basisa` (auto)
`_basis25` (25%), `_basis33` (33.333%), `_basis50` (50%), `_basis66` (66.667%), `_basis75` (75%), `_basisfull` (100%)

### Order
`_ord0`-`_ord12`, `_ord-1` (-1), `_ordfirst` (-9999), `_ordlast` (9999)

### Alignment
| Atom | Property | Value |
|------|----------|-------|
| `_center` | align-items + justify-content | center |
| `_aic/_ais/_aifs/_aife/_aibs` | align-items | center/stretch/flex-start/flex-end/baseline |
| `_jcc/_jcsb/_jcsa/_jcse/_jcfs/_jcfe` | justify-content | center/space-between/around/evenly/flex-start/flex-end |
| `_acc/_acsb/_acsa/_acse/_acfs/_acfe/_acs` | align-content | center/space-between/around/evenly/flex-start/flex-end/stretch |
| `_asc/_ass/_asfs/_asfe/_asa/_asbs` | align-self | center/stretch/flex-start/flex-end/auto/baseline |
| `_jic/_jis/_jifs/_jife` | justify-items | center/stretch/start/end |
| `_jsc/_jss/_jsfs/_jsfe/_jsa` | justify-self | center/stretch/start/end/auto |
| `_pic/_pis` | place-items | center/stretch |
| `_pcc/_pcse/_pcsb` | place-content | center/space-evenly/space-between |

### Grid System
| Atom | Output |
|------|--------|
| `_gc1`-`_gc12` | grid-template-columns: repeat(N,minmax(0,1fr)) |
| `_gcnone` | grid-template-columns: none |
| `_gr1`-`_gr6` | grid-template-rows: repeat(N,minmax(0,1fr)) |
| `_grnone` | grid-template-rows: none |
| `_span1`-`_span12` | grid-column: span N/span N |
| `_spanfull` | grid-column: 1/-1 |
| `_rspan1`-`_rspan6` | grid-row: span N/span N |
| `_rspanfull` | grid-row: 1/-1 |
| `_gcs1`-`_gcs13` | grid-column-start |
| `_gce1`-`_gce13` | grid-column-end |
| `_grs1`-`_grs7` | grid-row-start |
| `_gre1`-`_gre7` | grid-row-end |
| `_gcaf160/200/220/250/280/300/320` | repeat(auto-fit,minmax(Npx,1fr)) |
| `_gcaf` | repeat(auto-fit,minmax(0,1fr)) |
| `_gcafl` | repeat(auto-fill,minmax(0,1fr)) |
| `_gflowr/_gflowc/_gflowd/_gflowrd/_gflowcd` | grid-auto-flow |
| `_gacfr/_gacmin/_gacmax` | grid-auto-columns |
| `_garfr/_garmin/_garmax` | grid-auto-rows |

### Aspect Ratio
`_arsq` (1), `_ar169` (16/9), `_ar43` (4/3), `_ar219` (21/9), `_ar32` (3/2), `_ara` (auto)

### Container Utilities
`_ctrsm` (640px), `_ctr` (960px), `_ctrlg` (1080px), `_ctrxl` (1280px), `_ctrfull` (100%) — all include margin-inline:auto

### Overflow
`_ohidden`, `_oauto`, `_oscroll`, `_ovisible`
`_oxhidden`, `_oxauto`, `_oxscroll`, `_oyhidden`, `_oyauto`, `_oyscroll`

### Text & Visibility
`_visible`, `_invisible`, `_wsnw` (nowrap), `_wsnormal`, `_wspre`, `_wsprewrap`
`_truncate` (overflow:hidden + text-overflow:ellipsis + white-space:nowrap)
`_clamp2`, `_clamp3` (line clamping via -webkit-line-clamp)

### Line-Height
`_lh1` (1), `_lh1a`/`_lh125` (1.25), `_lh1b`/`_lh150` (1.5), `_lh175` (1.75), `_lh2` (2)

### Typography
`_t10`-`_t48` (font-size), `_bold/_medium/_normal/_light` (weight), `_italic`, `_underline/_strike/_nounder`, `_upper/_lower/_cap`, `_tl/_tc/_tr`

### Colors
`_bg0`-`_bg9`, `_fg0`-`_fg9`, `_bc0`-`_bc9` (use theme CSS variables --c0 through --c9)

### Position
`_relative/_absolute/_fixed/_sticky` (or `_rel/_abs`), `_top0/_right0/_bottom0/_left0/_inset0`

### Borders
`_b0/_b1/_b2`, `_r0`-`_r8` (border-radius), `_rfull` (9999px), `_rcircle` (50%)

### Opacity, Transitions, Z-index, Shadow, Cursor
`_op0`-`_op10`, `_trans/_transfast/_transslow/_transnone`, `_z0/_z10/_z20/_z30/_z40/_z50`
`_shadow/_shadowmd/_shadowlg/_shadowno`, `_pointer/_grab`
