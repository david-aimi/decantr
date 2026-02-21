# Blueprint Reference

Blueprints are declarative JSON specs that describe complete website variants. The scaffolder reads a blueprint + user options and generates all project files deterministically.

## Directory Structure

```
blueprints/
  _schema.json              JSON Schema for validation
  _index.json               Master catalog (categories list)
  dashboard/
    _index.json             Category variants list
    analytics.json          Individual blueprint (~60 lines)
    stock-tracker.json
    daily-planner.json
    project-manager.json
  content/
    _index.json
    blog.json
    portfolio.json
    documentation.json
  marketing/
    _index.json
    saas-landing.json
    agency.json
    startup.json
```

## Catalog Structure

### `_index.json` — Master Catalog

```json
{
  "version": "1.0.0",
  "categories": [
    { "id": "dashboard", "name": "Dashboards", "description": "...", "icon": "chart", "count": 4 },
    { "id": "content", "name": "Content Sites", "description": "...", "icon": "edit", "count": 3 },
    { "id": "marketing", "name": "Marketing Pages", "description": "...", "icon": "bolt", "count": 3 }
  ]
}
```

### `{category}/_index.json` — Category Variants

```json
{
  "category": "dashboard",
  "variants": [
    { "id": "analytics", "name": "Analytics Dashboard", "description": "..." },
    { "id": "stock-tracker", "name": "Stock Tracker", "description": "..." }
  ]
}
```

## Blueprint JSON Format

Each blueprint file has these required fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | URL-safe identifier (lowercase, hyphens) |
| `name` | string | Display name |
| `category` | `"dashboard" \| "content" \| "marketing"` | Category this belongs to |
| `description` | string | Short description |
| `kits` | `string[]` | Kit dependencies: `"dashboard"`, `"auth"`, `"content"` |
| `layout` | object | Layout configuration (see below) |
| `routes` | array | Route definitions (see below) |
| `pages` | object | Page definitions keyed by page name (see below) |
| `mockData` | object | Optional mock data specs (see below) |

### `layout`

```json
{
  "type": "sidebar | topnav | minimal | landing",
  "sidebar": {
    "position": "left | right",
    "collapsible": true
  },
  "header": {
    "show": true,
    "search": true,
    "notifications": true,
    "userMenu": true
  }
}
```

| Layout Type | Use Case | Generated Components |
|-------------|----------|---------------------|
| `sidebar` | Dashboard apps | `src/components/sidebar.js` (kit Sidebar) + `src/components/header.js` (kit DashboardHeader) |
| `topnav` | Multi-page sites | `src/components/header.js` (custom top nav with router links) |
| `minimal` | Single-page / simple | `src/components/header.js` (optional) |
| `landing` | Marketing pages | `src/components/header.js` (optional) |

### `routes`

```json
[
  { "path": "/", "page": "overview", "label": "Overview", "icon": "home" },
  { "path": "/analytics", "page": "analytics", "label": "Analytics", "icon": "chart" }
]
```

- `path` — URL path (used by router)
- `page` — Key into `pages` object, also becomes filename `src/pages/{page}.js`
- `label` — Display text in navigation
- `icon` — Optional icon name for sidebar/nav

### `pages`

Each page is an object with `title` and `sections`:

```json
{
  "overview": {
    "title": "Overview",
    "sections": [
      { "type": "StatsGrid", "props": { "columns": 4, "items": [...] } },
      { "type": "ChartPlaceholder", "props": { "title": "Revenue Over Time" } },
      { "type": "ActivityFeed", "props": { "title": "Recent Activity", "count": 5 } }
    ]
  }
}
```

Every route's `page` value MUST have a matching key in `pages`.

## Section Types

### Kit Component Sections (SECTION_MAP)

These map directly to kit component imports:

| Section Type | Kit | Component | Key Props |
|-------------|-----|-----------|-----------|
| `StatsGrid` | dashboard | StatsGrid | `columns`, `items: [{title, value, change, icon}]` |
| `KPICard` | dashboard | KPICard | `title`, `value`, `change`, `icon` |
| `ActivityFeed` | dashboard | ActivityFeed | `title`, `count` |
| `DataTable` | dashboard | DataTable | `columns: [{key, label}]`, `searchable`, data from mockData |
| `ChartPlaceholder` | dashboard | ChartPlaceholder | `title` |
| `DashboardHeader` | dashboard | DashboardHeader | `title`, `search`, `notifications`, `userMenu` |
| `Sidebar` | dashboard | Sidebar | `nav`, `branding`, `collapsible` |
| `LoginForm` | auth | LoginForm | `onSubmit`, `title`, `showRemember`, `showForgot` |
| `RegisterForm` | auth | RegisterForm | `onSubmit`, `fields`, `showTerms` |
| `ForgotPasswordForm` | auth | ForgotPasswordForm | `onSubmit`, `title` |
| `AuthLayout` | auth | AuthLayout | (wraps children) |
| `ArticleLayout` | content | ArticleLayout | `title`, `date`, `content`, `toc` |
| `AuthorCard` | content | AuthorCard | `name`, `bio`, `avatar` |
| `TableOfContents` | content | TableOfContents | `headings: [{id, text, level}]` |
| `PostList` | content | PostList | `posts: [{title, excerpt, date, href}]` |
| `CategoryNav` | content | CategoryNav | `categories`, `active` |

### Generic Sections

These don't require kits — the scaffolder generates inline code using primitives:

| Section Type | Generates | Used By |
|-------------|-----------|---------|
| `hero` | Full-width hero with title, subtitle, CTA buttons | Marketing |
| `features` | Card grid with feature cards | Marketing, Content |
| `testimonials` | Card grid with quote/name/role | Marketing |
| `cta` | Call-to-action section with button | Marketing |
| `pricing` | Tiered pricing cards with feature lists | Marketing |
| `footer` | Simple footer with text | Marketing |
| `team` | Card grid with name/role/bio | Marketing |
| `contactForm` | Form with configurable fields | Marketing |
| `signupForm` | Simple signup form | Marketing |
| `skills` | Badge/pill grid | Content (portfolio) |

## Mock Data

Optional. Used to populate DataTable, PostList, CategoryNav, and other data-driven components with realistic content.

```json
{
  "mockData": {
    "reports": {
      "fields": [
        { "name": "name", "type": "string", "values": ["Q1 Revenue Report", "User Growth Analysis"] },
        { "name": "status", "type": "status", "values": ["Complete", "In Progress"] },
        { "name": "date", "type": "date", "values": ["2026-02-20", "2026-02-18"] }
      ],
      "count": 5
    }
  }
}
```

- `fields[].name` — Column/property name
- `fields[].type` — Data type hint (`string`, `date`, `status`, `number`)
- `fields[].values` — Sample values (cycled if `count` > `values.length`)
- `count` — Number of rows to generate

The scaffolder calls `generateMockData(spec)` which produces an array of `{name: value, ...}` objects.

## Full Example Blueprint

```json
{
  "id": "analytics",
  "name": "Analytics Dashboard",
  "category": "dashboard",
  "description": "KPI cards, charts, activity feed, and data tables.",
  "kits": ["dashboard"],
  "layout": {
    "type": "sidebar",
    "sidebar": { "position": "left", "collapsible": true },
    "header": { "show": true, "search": true, "notifications": true, "userMenu": true }
  },
  "routes": [
    { "path": "/", "page": "overview", "label": "Overview", "icon": "home" },
    { "path": "/analytics", "page": "analytics", "label": "Analytics", "icon": "chart" },
    { "path": "/reports", "page": "reports", "label": "Reports", "icon": "table" },
    { "path": "/settings", "page": "settings", "label": "Settings", "icon": "settings" }
  ],
  "pages": {
    "overview": {
      "title": "Overview",
      "sections": [
        { "type": "StatsGrid", "props": { "columns": 4, "items": [
          { "title": "Total Users", "value": "12,847", "change": "+12%", "icon": "users" },
          { "title": "Revenue", "value": "$48,290", "change": "+8%", "icon": "dollar" }
        ]}},
        { "type": "ChartPlaceholder", "props": { "title": "Revenue Over Time" } },
        { "type": "ActivityFeed", "props": { "title": "Recent Activity", "count": 5 } }
      ]
    }
  },
  "mockData": {
    "reports": {
      "fields": [
        { "name": "name", "type": "string", "values": ["Q1 Revenue", "User Growth"] },
        { "name": "status", "type": "status", "values": ["Complete", "In Progress"] }
      ],
      "count": 5
    }
  }
}
```

## Adding a New Blueprint

1. Create `blueprints/{category}/{id}.json` following the schema
2. Add variant entry to `blueprints/{category}/_index.json`
3. Update category `count` in `blueprints/_index.json`
4. Validate: `node --test test/blueprints.test.js`
5. If using new section types, add to `SECTION_MAP` in `tools/scaffolder.js`

## Adding a New Category

1. Create `blueprints/{category}/` directory
2. Add `blueprints/{category}/_index.json` with `{ "category": "...", "variants": [] }`
3. Add category entry to `blueprints/_index.json`
4. Add category to `_schema.json` enum: `"category": { "enum": [...] }`
5. Create at least one blueprint in the new category

## Validation

Blueprints are validated by `test/blueprints.test.js` which checks:

- All required fields present
- `layout.type` is valid enum
- Every route has a matching page
- Every page has `title` + `sections` array
- `kits` array references valid kit names
- Category indexes match actual blueprint files
