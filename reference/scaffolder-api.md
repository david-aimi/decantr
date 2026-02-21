# Scaffolder API

The scaffolder (`tools/scaffolder.js`) reads a blueprint JSON + user options and generates all project files as `[path, content]` tuples.

## Public API

### `scaffoldProject(projectRoot, blueprintId, options)`

Main entry point. Returns all files needed for a scaffolded project.

```javascript
import { scaffoldProject, getRequiredDirs } from './tools/scaffolder.js';

const files = await scaffoldProject('/path/to/project', 'dashboard/analytics', {
  name: 'my-dashboard',
  theme: 'dark',
  router: 'hash',
  icons: 'lucide',          // optional
  iconDelivery: 'cdn',      // optional
  port: 4200                 // optional
});

// files = [
//   ['package.json', '{"name":"my-dashboard",...}'],
//   ['decantr.config.json', '...'],
//   ['public/index.html', '...'],
//   ['src/app.js', '...'],
//   ['src/pages/overview.js', '...'],
//   ...
// ]
```

**Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `projectRoot` | string | Absolute path to project directory |
| `blueprintId` | string | Format: `"category/id"` (e.g., `"dashboard/analytics"`) |
| `options.name` | string | Project name |
| `options.theme` | string | Theme ID: `light`, `dark`, `retro`, `hot-lava`, `stormy-ai` |
| `options.router` | string | Router mode: `hash` (default) or `history` |
| `options.icons` | string | Optional icon library: `lucide` or `material` |
| `options.iconDelivery` | string | Optional: `cdn` or `npm` |
| `options.port` | number | Dev server port (default: 4200) |

**Returns:** `Promise<Array<[string, string]>>` — array of `[relativePath, fileContent]` tuples.

### `loadBlueprint(blueprintId)`

Loads a single blueprint JSON.

```javascript
const blueprint = await loadBlueprint('dashboard/analytics');
// Returns parsed JSON object
```

### `loadCatalog()`

Loads the full catalog with all categories and their variants populated.

```javascript
const catalog = await loadCatalog();
// {
//   version: '1.0.0',
//   categories: [
//     { id: 'dashboard', name: 'Dashboards', ..., variants: [{id, name, description}, ...] },
//     ...
//   ]
// }
```

### `getRequiredDirs(files)`

Extracts unique directory paths from file tuples (for `mkdir -p`).

```javascript
const dirs = getRequiredDirs(files);
// ['public', 'src', 'src/components', 'src/pages', 'test', '.decantr']
```

## Generated File Structure

For a `sidebar` layout blueprint:

```
package.json              — name, version, scripts (dev/build/test), dependencies
decantr.config.json       — theme, router, blueprint ref, scaffolded: true
public/index.html         — HTML shell with inline theme CSS, icon links
.decantr/manifest.json    — Build metadata (entrypoint, shell, mount target)
CLAUDE.md                 — Generated project-specific docs with imports and commands
src/
  app.js                  — Entry point: imports, setTheme, createRouter, mount
  components/
    sidebar.js            — AppSidebar() using kit Sidebar component
    header.js             — AppHeader() using kit DashboardHeader
  pages/
    overview.js           — OverviewPage() with kit components
    analytics.js          — AnalyticsPage()
    ...
test/
  app.test.js             — Basic mount test
```

For `topnav`/`landing`/`minimal` layouts, no `sidebar.js` is generated. The `header.js` uses a custom top nav instead of the dashboard kit's DashboardHeader.

## SECTION_MAP

Maps blueprint section types to kit module imports:

```javascript
const SECTION_MAP = {
  // Dashboard kit
  StatsGrid:        { kit: 'dashboard', component: 'StatsGrid' },
  KPICard:          { kit: 'dashboard', component: 'KPICard' },
  ActivityFeed:     { kit: 'dashboard', component: 'ActivityFeed' },
  DataTable:        { kit: 'dashboard', component: 'DataTable' },
  ChartPlaceholder: { kit: 'dashboard', component: 'ChartPlaceholder' },
  DashboardHeader:  { kit: 'dashboard', component: 'DashboardHeader' },
  Sidebar:          { kit: 'dashboard', component: 'Sidebar' },
  // Auth kit
  LoginForm:        { kit: 'auth', component: 'LoginForm' },
  RegisterForm:     { kit: 'auth', component: 'RegisterForm' },
  ForgotPasswordForm: { kit: 'auth', component: 'ForgotPasswordForm' },
  AuthLayout:       { kit: 'auth', component: 'AuthLayout' },
  // Content kit
  ArticleLayout:    { kit: 'content', component: 'ArticleLayout' },
  AuthorCard:       { kit: 'content', component: 'AuthorCard' },
  TableOfContents:  { kit: 'content', component: 'TableOfContents' },
  PostList:         { kit: 'content', component: 'PostList' },
  CategoryNav:      { kit: 'content', component: 'CategoryNav' }
};
```

Sections NOT in SECTION_MAP are "generic sections" handled by inline code generators (hero, features, pricing, etc.).

## Template Utilities — `tools/scaffold-templates.js`

| Export | Purpose |
|--------|---------|
| `packageJson(name, opts)` | Generates `package.json` string |
| `configJson(opts)` | Generates `decantr.config.json` string |
| `indexHtml(opts)` | Generates `public/index.html` with inline theme CSS |
| `manifest(opts)` | Generates `.decantr/manifest.json` |
| `claudeMd(opts, blueprint)` | Generates project-specific `CLAUDE.md` |
| `iconExpr(semantic, opts, props)` | Returns icon() call expression string |
| `iconImport(opts)` | Returns icon import line or empty string |
| `THEME_CSS` | Object mapping theme IDs to inline CSS strings |
| `ICON_MAP` | Object mapping semantic icon names to material/lucide names |

## Code Generation Flow

```
scaffoldProject()
  ├── loadBlueprint()           → Parse blueprint JSON
  ├── Generate shared files     → packageJson, configJson, indexHtml, manifest, claudeMd
  ├── Generate layout           → sidebar.js or header.js based on layout.type
  ├── For each page:
  │   └── generatePage()
  │       ├── Collect kit imports (scan sections against SECTION_MAP)
  │       ├── Build import lines (tags, css, kit components, primitives)
  │       └── For each section:
  │           └── generateSectionCode()
  │               ├── Kit section → generateKitSectionCode()
  │               │   ├── StatsGrid → inline items JSON
  │               │   ├── DataTable → lookup mockData, generate rows
  │               │   ├── PostList → lookup mockData
  │               │   └── etc.
  │               └── Generic section → hero/features/pricing/etc. generators
  ├── generateAppJs()           → Router setup, layout composition, mount
  └── generateTestFile()        → Basic mount test
```

## Mock Data Resolution

The scaffolder resolves mock data in this order:

1. If section has `props.dataKey` matching a key in `blueprint.mockData` → use that
2. Otherwise, use the first available key in `blueprint.mockData`
3. `generateMockData(spec)` cycles through `spec.fields[].values` up to `spec.count` rows

## Adding Support for New Section Types

1. If it maps to a kit component: add to `SECTION_MAP` and handle in `generateKitSectionCode()`
2. If it's a generic section: add a `case` in `generateSectionCode()` switch and implement a `generate{Type}Code()` function
3. Add any new tags needed to the `tagsNeeded` set in `generatePage()`
