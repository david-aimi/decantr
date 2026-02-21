# Dev Server Routes & Wizard Integration

The dev server (`tools/dev-server.js`) serves the development environment with HMR, import rewriting, and the visual wizard for unscaffolded projects.

## Scaffold Detection

The server checks if a project has been scaffolded:

1. **Primary check**: `decantr.config.json` has `"scaffolded": false`
2. **Fallback check**: `src/app.js` does not exist

If unscaffolded, the server serves the wizard UI instead of the project.

## Special Routes

### `GET /__decantr_hmr`

Server-Sent Events stream for hot module reload.

- Sends `data: reload` when files change
- Sends `data: reload` after successful scaffold
- Client connects via `new EventSource('/__decantr_hmr')`

### `GET /__decantr/blueprints`

Returns the full blueprint catalog with all categories and their variants populated.

**Response:**
```json
{
  "version": "1.0.0",
  "categories": [
    {
      "id": "dashboard",
      "name": "Dashboards",
      "description": "...",
      "icon": "chart",
      "count": 4,
      "variants": [
        { "id": "analytics", "name": "Analytics Dashboard", "description": "..." }
      ]
    }
  ]
}
```

Uses `loadCatalog()` from `tools/scaffolder.js`.

### `GET /__decantr/blueprints/:category/:id`

Returns a single blueprint JSON.

**Example:** `GET /__decantr/blueprints/dashboard/analytics`

**Response:** Full blueprint object (see `reference/blueprint-reference.md`).

Uses `loadBlueprint()` from `tools/scaffolder.js`.

### `POST /__decantr/scaffold`

Runs the scaffolder, writes files to disk, broadcasts HMR reload.

**Request body:**
```json
{
  "blueprint": "dashboard/analytics",
  "options": {
    "name": "my-app",
    "theme": "dark",
    "router": "hash"
  }
}
```

**Process:**
1. Calls `scaffoldProject(projectRoot, blueprint, options)`
2. Creates all required directories via `getRequiredDirs()`
3. Writes all generated files to disk
4. Updates `decantr.config.json` with `scaffolded: true`
5. Broadcasts `data: reload` to all HMR SSE clients

**Response:**
```json
{ "ok": true, "files": 10 }
```

### `GET /__decantr/{module}/**`

Serves framework source files for browser import. Handles:

- `/__decantr/core/index.js` → `src/core/index.js`
- `/__decantr/components/index.js` → `src/components/index.js`
- `/__decantr/kit/dashboard/index.js` → `src/kit/dashboard/index.js`
- `/__decantr/wizard/index.js` → `src/wizard/index.js` (when serving wizard)

All JS files served through this route get import rewriting applied.

## Import Rewriting

The server rewrites bare module specifiers in JS files to browser-compatible paths:

| Source Import | Rewritten To |
|--------------|-------------|
| `from 'decantr/core'` | `from '/__decantr/core/index.js'` |
| `from 'decantr/state'` | `from '/__decantr/state/index.js'` |
| `from 'decantr/css'` | `from '/__decantr/css/index.js'` |
| `from 'decantr/components'` | `from '/__decantr/components/index.js'` |
| `from 'decantr/tags'` | `from '/__decantr/tags/index.js'` |
| `from 'decantr/router'` | `from '/__decantr/router/index.js'` |
| `from 'decantr/kit/dashboard'` | `from '/__decantr/kit/dashboard/index.js'` |
| `from 'decantr/kit/auth'` | `from '/__decantr/kit/auth/index.js'` |
| `from 'decantr/kit/content'` | `from '/__decantr/kit/content/index.js'` |

Relative imports (`./`, `../`) are passed through unchanged.

## Wizard Serving

When unscaffolded, `GET /` returns a minimal HTML shell:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>decantr — Setup</title>
  <style>/* reset + base styles */</style>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/__decantr/wizard/index.js"></script>
</body>
</html>
```

The wizard UI (`src/wizard/`) is served via `/__decantr/wizard/*` with import rewriting, so it can use all decantr modules (core, state, css, components).

## Wizard Flow

```
User visits localhost:4200
  → Server detects unscaffolded → serves wizard HTML
  → Wizard loads, fetches GET /__decantr/blueprints
  → User selects: Category → Variant → Theme → Customize → Confirm
  → Wizard sends POST /__decantr/scaffold
  → Server writes files, sets scaffolded: true, broadcasts HMR
  → Browser reloads → now serves the scaffolded app
```

## Wizard State (src/wizard/app.js)

| Signal | Type | Description |
|--------|------|-------------|
| `step` | number (0-4) | Current wizard step |
| `catalog` | object | Full catalog from API |
| `category` | string | Selected category ID |
| `variant` | string | Selected variant ID |
| `theme` | string | Selected theme ID |
| `name` | string | Project name (default: `"my-app"`) |
| `router` | string | Router mode (default: `"hash"`) |
| `scaffolding` | boolean | True while scaffold request in-flight |
| `error` | string | Error message |

| Memo | Derives From | Returns |
|------|-------------|---------|
| `categories` | `catalog` | Category array |
| `selectedCategory` | `categories`, `category` | Selected category object |
| `variants` | `selectedCategory` | Variants array for selected category |
| `canNext` | `step`, selections | Whether Next button is enabled |

## Wizard Steps

| Step | Component | File | User Action |
|------|-----------|------|-------------|
| 0 | CategoryStep | `src/wizard/steps/category.js` | Select dashboard/content/marketing |
| 1 | VariantStep | `src/wizard/steps/variant.js` | Select specific blueprint variant |
| 2 | ThemeStep | `src/wizard/steps/theme.js` | Pick theme (light/dark/retro/hot-lava/stormy-ai) |
| 3 | CustomizeStep | `src/wizard/steps/customize.js` | Set project name + router mode |
| 4 | ConfirmStep | `src/wizard/steps/confirm.js` | Review choices + scaffold |

## Wizard Components

| Component | File | Purpose |
|-----------|------|---------|
| `StepIndicator` | `src/wizard/components/step-indicator.js` | 5-dot progress bar |
| `CardGrid` | `src/wizard/components/card-grid.js` | Selectable card grid with keyboard support |
| `ThemePreview` | `src/wizard/components/theme-preview.js` | Theme color swatch cards |
