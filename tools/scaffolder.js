/**
 * Blueprint → code scaffolder.
 * Reads a blueprint JSON + user options and generates all project files.
 */
import { readFile } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  packageJson, configJson, indexHtml, manifest, claudeMd,
  iconExpr, iconImport, iconName, vendorIconsJs
} from './scaffold-templates.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blueprintsDir = resolve(__dirname, '..', 'blueprints');

/**
 * Section type → kit module mapping.
 */
const SECTION_MAP = {
  // Kit components
  StatsGrid:        { kit: 'dashboard', component: 'StatsGrid' },
  KPICard:          { kit: 'dashboard', component: 'KPICard' },
  ActivityFeed:     { kit: 'dashboard', component: 'ActivityFeed' },
  DataTable:        { kit: 'dashboard', component: 'DataTable' },
  ChartPlaceholder: { kit: 'dashboard', component: 'ChartPlaceholder' },
  DashboardHeader:  { kit: 'dashboard', component: 'DashboardHeader' },
  Sidebar:          { kit: 'dashboard', component: 'Sidebar' },
  LoginForm:        { kit: 'auth', component: 'LoginForm' },
  RegisterForm:     { kit: 'auth', component: 'RegisterForm' },
  ForgotPasswordForm: { kit: 'auth', component: 'ForgotPasswordForm' },
  AuthLayout:       { kit: 'auth', component: 'AuthLayout' },
  ArticleLayout:    { kit: 'content', component: 'ArticleLayout' },
  AuthorCard:       { kit: 'content', component: 'AuthorCard' },
  TableOfContents:  { kit: 'content', component: 'TableOfContents' },
  PostList:         { kit: 'content', component: 'PostList' },
  CategoryNav:      { kit: 'content', component: 'CategoryNav' },
  // Block components
  ProfileHero:      { source: 'blocks', component: 'ProfileHero' },
  ExpertiseGrid:    { source: 'blocks', component: 'ExpertiseGrid' },
  StatsRow:         { source: 'blocks', component: 'StatsRow' },
  IdentityGrid:     { source: 'blocks', component: 'IdentityGrid' },
  SkillCategories:  { source: 'blocks', component: 'SkillCategories' },
  CertificationRow: { source: 'blocks', component: 'CertificationRow' },
  Timeline:         { source: 'blocks', component: 'Timeline' },
  ProjectGrid:      { source: 'blocks', component: 'ProjectGrid' },
  TechGrid:         { source: 'blocks', component: 'TechGrid' },
  HobbyGrid:        { source: 'blocks', component: 'HobbyGrid' },
  PhotoGallery:     { source: 'blocks', component: 'PhotoGallery' },
  ContactSplit:     { source: 'blocks', component: 'ContactSplit' },
  SocialSidebar:    { source: 'blocks', component: 'SocialSidebar' }
};

/**
 * Load a blueprint by category/id.
 * @param {string} blueprintId - e.g. "dashboard/analytics"
 * @returns {Promise<Object>}
 */
export async function loadBlueprint(blueprintId) {
  const [category, id] = blueprintId.split('/');
  const filePath = join(blueprintsDir, category, `${id}.json`);
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Load the full blueprint catalog.
 * @returns {Promise<Object>}
 */
export async function loadCatalog() {
  const indexRaw = await readFile(join(blueprintsDir, '_index.json'), 'utf-8');
  const index = JSON.parse(indexRaw);

  const catalog = { ...index, categories: [] };

  for (const cat of index.categories) {
    const catIndexRaw = await readFile(join(blueprintsDir, cat.id, '_index.json'), 'utf-8');
    const catIndex = JSON.parse(catIndexRaw);
    catalog.categories.push({
      ...cat,
      variants: catIndex.variants
    });
  }

  return catalog;
}

/**
 * Generate mock data rows from blueprint mockData spec.
 * @param {Object} spec - { fields: [...], count: N }
 * @returns {Array<Object>}
 */
function generateMockData(spec) {
  if (!spec || !spec.fields) return [];
  const rows = [];
  const count = spec.count || 5;
  for (let i = 0; i < count; i++) {
    const row = {};
    for (const field of spec.fields) {
      const values = field.values || [];
      row[field.name] = values[i % values.length] ?? '';
    }
    rows.push(row);
  }
  return rows;
}

/**
 * Generate a page component file from a blueprint page spec.
 * @param {string} pageKey
 * @param {Object} pageSpec
 * @param {Object} blueprint
 * @param {Object} opts
 * @returns {string}
 */
function generatePage(pageKey, pageSpec, blueprint, opts) {
  // Collect all kit and block imports needed for this page
  const kitImports = new Map(); // kit name → Set of component names
  const blockImports = new Set(); // block component names
  const genericSections = [];

  for (const section of pageSpec.sections) {
    const mapping = SECTION_MAP[section.type];
    if (mapping) {
      if (mapping.source === 'blocks') {
        blockImports.add(mapping.component);
      } else {
        const kit = mapping.kit;
        if (!kitImports.has(kit)) kitImports.set(kit, new Set());
        kitImports.get(kit).add(mapping.component);
      }
    } else {
      genericSections.push(section);
    }
  }

  // Build import lines
  const imports = ["import { tags } from 'decantr/tags';"];
  imports.push("import { css } from 'decantr/css';");

  for (const [kit, components] of kitImports) {
    imports.push(`import { ${[...components].join(', ')} } from 'decantr/kit/${kit}';`);
  }

  if (blockImports.size > 0) {
    imports.push(`import { ${[...blockImports].join(', ')} } from 'decantr/blocks';`);
  }

  if (genericSections.some(s => ['hero', 'features', 'testimonials', 'cta', 'pricing', 'footer', 'team', 'contactForm', 'signupForm', 'skills'].includes(s.type))) {
    const hasFeatureIcons = opts.icons && genericSections.some(s =>
      s.type === 'features' && blueprint.mockData && blueprint.mockData.features &&
      generateMockData(blueprint.mockData.features).some(f => f.icon)
    );
    const componentImports = hasFeatureIcons ? 'Card, Button, icon' : 'Card, Button';
    imports.push(`import { ${componentImports} } from 'decantr/components';`);
  }

  // Destructure tags
  const tagsNeeded = new Set(['div', 'h1', 'h2', 'p', 'section']);
  if (genericSections.some(s => s.type === 'hero')) tagsNeeded.add('span');
  if (genericSections.some(s => ['features', 'testimonials', 'pricing', 'team'].includes(s.type))) {
    tagsNeeded.add('h3');
    tagsNeeded.add('ul');
    tagsNeeded.add('li');
  }
  if (genericSections.some(s => ['contactForm', 'signupForm'].includes(s.type))) {
    tagsNeeded.add('form');
    tagsNeeded.add('label');
  }
  if (genericSections.some(s => s.type === 'footer')) {
    tagsNeeded.add('footer');
    tagsNeeded.add('a');
  }

  const funcName = pageKey.charAt(0).toUpperCase() + pageKey.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + 'Page';

  // Generate section code
  const sectionCodes = [];
  for (const section of pageSpec.sections) {
    sectionCodes.push(generateSectionCode(section, blueprint, opts));
  }

  return `${imports.join('\n')}

const { ${[...tagsNeeded].join(', ')} } = tags;

export function ${funcName}() {
  return div({ class: css('_flex _col _gap8 _p6') },
    h1({ class: css('_t24 _bold _fg3 _mb2') }, '${pageSpec.title}'),
${sectionCodes.map(c => '    ' + c).join(',\n')}
  );
}
`;
}

/**
 * Generate code for a single section.
 */
function generateSectionCode(section, blueprint, opts) {
  const mapping = SECTION_MAP[section.type];
  const props = section.props || {};

  if (mapping) {
    // Kit or block component section
    return generateKitSectionCode(mapping.component, props, blueprint, opts);
  }

  // Generic sections (hero, features, etc.)
  switch (section.type) {
    case 'hero':
      return generateHeroCode(props);
    case 'features':
      return generateFeaturesCode(props, blueprint, opts);
    case 'testimonials':
      return generateTestimonialsCode(props, blueprint);
    case 'cta':
      return generateCtaCode(props);
    case 'pricing':
      return generatePricingCode(props);
    case 'footer':
      return `footer({ class: css('_p6 _tc _fg4 _t14 _b1 _bc5'), style: 'border-top:1px solid var(--c5);margin-top:3rem' },\n      p('Built with decantr')\n    )`;
    case 'team':
      return generateTeamCode(props, blueprint);
    case 'contactForm':
    case 'signupForm':
      return generateFormCode(props, section.type);
    case 'skills':
      return generateSkillsCode(props, blueprint);
    default:
      return `div({ class: css('_p6 _bg2 _r4') }, p('${section.type} section'))`;
  }
}

function generateKitSectionCode(component, props, blueprint, opts) {
  // For components that need mock data (DataTable, ActivityFeed, PostList, etc.)
  if (component === 'DataTable' && props.columns) {
    const colsStr = JSON.stringify(props.columns);
    // Find mock data for this context
    const mockKey = findMockDataKey(blueprint, props);
    if (mockKey) {
      const data = generateMockData(blueprint.mockData[mockKey]);
      return `DataTable({ searchable: ${!!props.searchable}, columns: ${colsStr}, data: ${JSON.stringify(data)} })`;
    }
    return `DataTable({ searchable: ${!!props.searchable}, columns: ${colsStr}, data: [] })`;
  }

  if (component === 'StatsGrid' && props.items) {
    const items = props.items.map(item => {
      if (item.icon && opts.icons) {
        return { ...item, icon: iconName(item.icon, opts) || item.icon };
      }
      if (item.icon && !opts.icons) {
        const { icon: _, ...rest } = item;
        return rest;
      }
      return item;
    });
    return `StatsGrid({ columns: ${props.columns || 4}, items: ${JSON.stringify(items)} })`;
  }

  if (component === 'ChartPlaceholder') {
    return `ChartPlaceholder({ title: '${props.title || 'Chart'}' })`;
  }

  if (component === 'ActivityFeed') {
    return `ActivityFeed({ title: '${props.title || 'Recent Activity'}', count: ${props.count || 5} })`;
  }

  if (component === 'PostList') {
    const mockKey = findMockDataKey(blueprint, { dataKey: 'posts' });
    if (mockKey) {
      const data = generateMockData(blueprint.mockData[mockKey]);
      return `PostList({ posts: ${JSON.stringify(data)} })`;
    }
    return `PostList({ posts: [] })`;
  }

  if (component === 'CategoryNav') {
    const mockKey = findMockDataKey(blueprint, { dataKey: 'categories' });
    if (mockKey) {
      const data = generateMockData(blueprint.mockData[mockKey]);
      return `CategoryNav({ categories: ${JSON.stringify(data)} })`;
    }
    return `CategoryNav({ categories: [] })`;
  }

  if (component === 'ArticleLayout') {
    return `ArticleLayout({ title: 'Article Title', date: '2026-02-21', content: div(p('Article content goes here...')) })`;
  }

  if (component === 'AuthorCard') {
    const mockKey = findMockDataKey(blueprint, { dataKey: 'author' });
    if (mockKey && blueprint.mockData[mockKey]) {
      const data = generateMockData(blueprint.mockData[mockKey]);
      if (data.length > 0) {
        return `AuthorCard({ name: '${data[0].name || 'Author'}', bio: '${data[0].bio || ''}' })`;
      }
    }
    return `AuthorCard({ name: 'Author Name', bio: 'Author biography here.' })`;
  }

  // Block components — serialize props directly
  if (component === 'ProfileHero') {
    return `ProfileHero(${JSON.stringify(props)})`;
  }

  if (component === 'ExpertiseGrid') {
    const mockKey = findMockDataKey(blueprint, { dataKey: props.dataKey || 'expertise' });
    if (mockKey) {
      const data = generateMockData(blueprint.mockData[mockKey]);
      return `ExpertiseGrid({ title: '${esc(props.title)}', items: ${JSON.stringify(data)} })`;
    }
    return `ExpertiseGrid(${JSON.stringify(props)})`;
  }

  if (component === 'StatsRow') {
    return `StatsRow(${JSON.stringify(props)})`;
  }

  if (component === 'IdentityGrid') {
    return `IdentityGrid(${JSON.stringify(props)})`;
  }

  if (component === 'SkillCategories') {
    return `SkillCategories(${JSON.stringify(props)})`;
  }

  if (component === 'CertificationRow') {
    return `CertificationRow(${JSON.stringify(props)})`;
  }

  if (component === 'Timeline') {
    return `Timeline(${JSON.stringify(props)})`;
  }

  if (component === 'ProjectGrid') {
    return `ProjectGrid(${JSON.stringify(props)})`;
  }

  if (component === 'TechGrid') {
    return `TechGrid(${JSON.stringify(props)})`;
  }

  if (component === 'HobbyGrid') {
    return `HobbyGrid(${JSON.stringify(props)})`;
  }

  if (component === 'PhotoGallery') {
    return `PhotoGallery(${JSON.stringify(props)})`;
  }

  if (component === 'ContactSplit') {
    return `ContactSplit(${JSON.stringify(props)})`;
  }

  if (component === 'SocialSidebar') {
    return `SocialSidebar(${JSON.stringify(props)})`;
  }

  // Fallback
  const propsStr = Object.keys(props).length > 0 ? JSON.stringify(props) : '{}';
  return `${component}(${propsStr})`;
}

function esc(s) {
  return (s || '').replace(/'/g, "\\'");
}

function findMockDataKey(blueprint, props) {
  if (!blueprint.mockData) return null;
  if (props.dataKey && blueprint.mockData[props.dataKey]) return props.dataKey;
  // Try common keys
  for (const key of Object.keys(blueprint.mockData)) {
    return key; // Return first available
  }
  return null;
}

function generateHeroCode(props) {
  const title = props.title || 'Welcome';
  const subtitle = props.subtitle || '';
  const cta = props.cta || '';
  const ctaSecondary = props.ctaSecondary || '';

  let buttons = '';
  if (cta) {
    buttons = `,\n      div({ class: css('_flex _gap4 _center _mt6') },\n        Button({ variant: 'primary', size: 'lg' }, '${cta}')`;
    if (ctaSecondary) {
      buttons += `,\n        Button({ size: 'lg' }, '${ctaSecondary}')`;
    }
    buttons += '\n      )';
  }

  return `section({ class: css('_py20 _px6 _tc _bg2'), style: 'border-bottom:1px solid var(--c5)' },
      div({ style: 'max-width:680px;margin:0 auto' },
        h1({ class: css('_t48 _bold _fg3 _lh1a _mb4') }, '${title}'),
        p({ class: css('_t16 _fg4 _lh1b') }, '${subtitle}')${buttons}
      )
    )`;
}

function generateFeaturesCode(props, blueprint, opts) {
  const title = props.title || 'Features';
  const columns = props.columns || 3;
  const mockData = blueprint.mockData && blueprint.mockData.features
    ? generateMockData(blueprint.mockData.features) : [];

  if (mockData.length === 0) {
    return `section({ class: css('_py12 _px6') },
      h2({ class: css('_t24 _bold _tc _mb8 _fg3') }, '${title}'),
      div({ class: css('_grid _gc${columns} _gap6 _ctr') },
        Card({}, p('Feature 1')),
        Card({}, p('Feature 2')),
        Card({}, p('Feature 3'))
      )
    )`;
  }

  const cards = mockData.map(f => {
    const iconLine = (f.icon && opts && opts.icons)
      ? `${iconExpr(f.icon, opts)},\n          ` : '';
    return `Card({ hoverable: true },\n          ${iconLine}h3({ class: css('_t16 _bold _mb2 _fg3') }, '${(f.title || '').replace(/'/g, "\\'")}'),\n          p({ class: css('_t14 _fg4 _lh1b') }, '${(f.description || '').replace(/'/g, "\\'")}')\n        )`;
  }).join(',\n        ');

  return `section({ class: css('_py12 _px6') },
      h2({ class: css('_t24 _bold _tc _mb8 _fg3') }, '${title}'),
      div({ class: css('_grid _gc${columns} _gap6 _ctr') },
        ${cards}
      )
    )`;
}

function generateTestimonialsCode(props, blueprint) {
  const title = props.title || 'Testimonials';
  const mockData = blueprint.mockData && blueprint.mockData.testimonials
    ? generateMockData(blueprint.mockData.testimonials) : [];

  const cards = mockData.length > 0
    ? mockData.map(t =>
        `Card({},\n          p({ class: css('_t14 _fg3 _italic _lh1b _mb4') }, '"${(t.quote || '').replace(/'/g, "\\'")}\"'),\n          p({ class: css('_t14 _bold _fg3') }, '${(t.name || '').replace(/'/g, "\\'")}'),\n          p({ class: css('_t12 _fg4') }, '${(t.role || '').replace(/'/g, "\\'")}')\n        )`
      ).join(',\n        ')
    : `Card({}, p('Testimonial'))`;

  return `section({ class: css('_py12 _px6 _bg2') },
      h2({ class: css('_t24 _bold _tc _mb8 _fg3') }, '${title}'),
      div({ class: css('_grid _gc3 _gap6 _ctr') },
        ${cards}
      )
    )`;
}

function generateCtaCode(props) {
  const title = props.title || 'Get Started';
  const subtitle = props.subtitle || '';
  const button = props.button || 'Get Started';

  return `section({ class: css('_py16 _px6 _tc _bg2'), style: 'border-top:1px solid var(--c5)' },
      h2({ class: css('_t24 _bold _fg3 _mb4') }, '${title}'),
      ${subtitle ? `p({ class: css('_t16 _fg4 _mb6') }, '${subtitle}'),` : ''}
      Button({ variant: 'primary', size: 'lg' }, '${button}')
    )`;
}

function generatePricingCode(props) {
  const title = props.title || 'Pricing';
  const tiers = props.tiers || [];

  const tierCards = tiers.map(tier => {
    const features = (tier.features || []).map(f =>
      `li({ class: css('_t14 _fg3 _py1') }, '${f.replace(/'/g, "\\'")}')`
    ).join(',\n            ');

    return `Card({ class: ${tier.popular ? "css('_b2 _bc1')" : "''"} },\n          h3({ class: css('_t16 _bold _fg3 _mb2') }, '${tier.name}'),\n          p({ class: css('_t32 _bold _fg1 _mb1') }, '${tier.price}'),\n          p({ class: css('_t14 _fg4 _mb4') }, '${tier.period}'),\n          ul({ style: 'list-style:none;padding:0;margin:0 0 1.5rem' },\n            ${features}\n          ),\n          Button({ variant: ${tier.popular ? "'primary'" : "'outline'"}, block: true }, '${tier.cta || 'Get Started'}')\n        )`;
  }).join(',\n        ');

  return `section({ class: css('_py12 _px6') },
      h2({ class: css('_t24 _bold _tc _mb8 _fg3') }, '${title}'),
      div({ class: css('_grid _gc3 _gap6 _ctr _aic') },
        ${tierCards}
      )
    )`;
}

function generateTeamCode(props, blueprint) {
  const title = props.title || 'Our Team';
  const mockData = blueprint.mockData && blueprint.mockData.team
    ? generateMockData(blueprint.mockData.team) : [];

  const cards = mockData.length > 0
    ? mockData.map(m =>
        `Card({ hoverable: true },\n          h3({ class: css('_t16 _bold _fg3 _mb1') }, '${(m.name || '').replace(/'/g, "\\'")}'),\n          p({ class: css('_t14 _fg1 _mb2') }, '${(m.role || '').replace(/'/g, "\\'")}'),\n          p({ class: css('_t14 _fg4 _lh1b') }, '${(m.bio || '').replace(/'/g, "\\'")}')\n        )`
      ).join(',\n        ')
    : `Card({}, p('Team member'))`;

  return `section({ class: css('_py12 _px6') },
      h2({ class: css('_t24 _bold _tc _mb8 _fg3') }, '${title}'),
      div({ class: css('_grid _gc3 _gap6 _ctr') },
        ${cards}
      )
    )`;
}

function generateFormCode(props, type) {
  const title = props.title || 'Contact';
  const fields = props.fields || ['email'];

  const fieldEls = fields.map(f => {
    const label = f.charAt(0).toUpperCase() + f.slice(1);
    if (f === 'message') {
      return `div({ class: css('_mb4') },\n          label({ class: css('_block _mb1 _t14 _fg3') }, '${label}'),\n          div({ class: css('_b1 _bc5 _r4 _p3') }, div({ contenteditable: 'true', class: css('_minhfit'), style: 'min-height:100px;outline:none' }))\n        )`;
    }
    const inputType = f === 'email' ? 'email' : 'text';
    return `div({ class: css('_mb4') },\n          label({ class: css('_block _mb1 _t14 _fg3') }, '${label}'),\n          div({ class: css('_b1 _bc5 _r4') }, div({ style: 'padding:0.5rem 0.75rem' }, '${label}...'))\n        )`;
  }).join(',\n        ');

  return `section({ class: css('_py12 _px6') },
      div({ style: 'max-width:480px;margin:0 auto' },
        h2({ class: css('_t24 _bold _tc _mb8 _fg3') }, '${title}'),
        form({ onsubmit: (e) => e.preventDefault() },
        ${fieldEls},
        Button({ variant: 'primary', block: true }, 'Submit')
        )
      )
    )`;
}

function generateSkillsCode(props, blueprint) {
  const title = props.title || 'Skills';
  const mockData = blueprint.mockData && blueprint.mockData.skills
    ? generateMockData(blueprint.mockData.skills) : [];

  const badges = mockData.length > 0
    ? mockData.map(s =>
        `div({ class: css('_px4 _py2 _bg2 _r4 _b1 _bc5 _t14 _fg3') }, '${(s.name || '').replace(/'/g, "\\'")}${s.level ? ` \u00B7 ${s.level}` : ''}')`
      ).join(',\n        ')
    : `div({ class: css('_px4 _py2 _bg2 _r4 _b1 _bc5') }, 'Skill')`;

  return `section({ class: css('_py12 _px6') },
      h2({ class: css('_t24 _bold _tc _mb8 _fg3') }, '${title}'),
      div({ class: css('_flex _wrap _gap3 _center') },
        ${badges}
      )
    )`;
}

/**
 * Generate the sidebar component.
 */
function generateSidebarComponent(blueprint, opts) {
  const nav = blueprint.routes
    .filter(r => r.label)
    .map(r => {
      const item = { href: r.path, label: r.label };
      if (r.icon && opts.icons) {
        item.icon = iconName(r.icon, opts) || r.icon;
      }
      return item;
    });

  const collapsible = blueprint.layout.sidebar?.collapsible || false;

  return `import { Sidebar } from 'decantr/kit/dashboard';

export function AppSidebar() {
  return Sidebar({
    branding: '${opts.name}',
    collapsible: ${collapsible},
    nav: ${JSON.stringify(nav, null, 4)}
  });
}
`;
}

/**
 * Generate a top navigation bar component.
 */
function generateTopnavComponent(blueprint, opts) {
  const links = blueprint.routes
    .filter(r => r.label && !r.path.includes(':'))
    .map(r => `link({ href: '${r.path}', class: css('_fg3 _t14 _nounder'), style: 'text-decoration:none' }, '${r.label}')`)
    .join(',\n      ');

  return `import { tags } from 'decantr/tags';
import { css } from 'decantr/css';
import { link } from 'decantr/router';

const { header, nav, div, h1 } = tags;

export function AppHeader() {
  return header({ class: css('_flex _aic _jcsb _px6 _py3'), style: 'border-bottom:1px solid var(--c5);background:var(--c0)' },
    h1({ class: css('_t16 _bold _fg3') }, '${opts.name}'),
    nav({ class: css('_flex _gap6'), 'aria-label': 'Main navigation' },
      ${links}
    )
  );
}
`;
}

/**
 * Generate the header component for dashboard layouts.
 */
function generateHeaderComponent(blueprint, opts) {
  const headerCfg = blueprint.layout.header || {};

  return `import { DashboardHeader } from 'decantr/kit/dashboard';

export function AppHeader() {
  return DashboardHeader({
    title: '${opts.name}',
    search: ${!!headerCfg.search},
    notifications: ${!!headerCfg.notifications},
    userMenu: ${!!headerCfg.userMenu}
  });
}
`;
}

/**
 * Generate the main app.js entry point.
 */
function generateAppJs(blueprint, opts) {
  const layoutType = blueprint.layout.type;
  const routerMode = opts.router || 'hash';
  const hasSidebar = layoutType === 'sidebar';
  const hasHeader = blueprint.layout.header?.show !== false;
  const hasSocialSidebar = !!blueprint.layout.socialSidebar;

  // Route imports
  const pageImports = [];
  const routeConfigs = [];

  for (const route of blueprint.routes) {
    const funcName = route.page.charAt(0).toUpperCase() + route.page.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + 'Page';
    pageImports.push(`import { ${funcName} } from './pages/${route.page}.js';`);
    routeConfigs.push(`  { path: '${route.path}', component: ${funcName} }`);
  }

  const imports = [
    "import { mount } from 'decantr/core';",
    "import { setTheme } from 'decantr/css';",
    "import { createRouter } from 'decantr/router';",
    "import { tags } from 'decantr/tags';",
    "import { css } from 'decantr/css';",
    ...pageImports
  ];

  if (hasSidebar) {
    imports.push("import { AppSidebar } from './components/sidebar.js';");
  }
  if (hasHeader) {
    imports.push("import { AppHeader } from './components/header.js';");
  }
  if (hasSocialSidebar) {
    imports.push("import { SocialSidebar } from 'decantr/blocks';");
  }

  const tagsNeeded = ['div', 'main'];
  const routerBlock = `const router = createRouter({
  mode: '${routerMode}',
  routes: [
${routeConfigs.join(',\n')}
  ]
});`;

  let socialSidebarCode = '';
  if (hasSocialSidebar) {
    socialSidebarCode = `\n    SocialSidebar(${JSON.stringify(blueprint.layout.socialSidebar)}),`;
  }

  let layoutCode;
  if (hasSidebar) {
    layoutCode = `  const app = div({ class: css('_flex _minhscreen') },${socialSidebarCode}
    AppSidebar(),
    div({ class: css('_flex _col _grow') },
      ${hasHeader ? 'AppHeader(),\n      ' : ''}main({ class: css('_grow _oauto') }, router.outlet())
    )
  );`;
  } else if (layoutType === 'landing' || layoutType === 'minimal') {
    layoutCode = `  const app = div({ class: css('_flex _col _minhscreen') },${socialSidebarCode}
    ${hasHeader ? 'AppHeader(),\n    ' : ''}main({ class: css('_grow') }, router.outlet())
  );`;
  } else {
    // topnav
    layoutCode = `  const app = div({ class: css('_flex _col _minhscreen') },${socialSidebarCode}
    ${hasHeader ? 'AppHeader(),\n    ' : ''}main({ class: css('_grow') }, router.outlet())
  );`;
  }

  return `${imports.join('\n')}

const { ${tagsNeeded.join(', ')} } = tags;

setTheme('${opts.theme || 'light'}');

${routerBlock}

${layoutCode}

mount(document.getElementById('app'), () => app);
`;
}

/**
 * Generate a basic test file.
 */
function generateTestFile(opts) {
  return `import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createDOM } from 'decantr/test';

let cleanup;

describe('${opts.name}', () => {
  it('mounts without errors', () => {
    const env = createDOM();
    cleanup = env.cleanup;
    assert.ok(env.document);
    if (cleanup) cleanup();
  });
});
`;
}

/**
 * Main scaffolder function.
 * @param {string} projectRoot - Absolute path to project directory
 * @param {string} blueprintId - e.g. "dashboard/analytics"
 * @param {Object} options - { name, theme, router, icons, iconDelivery, port }
 * @returns {Promise<Array<[string, string]>>} - Array of [relativePath, content] tuples
 */
export async function scaffoldProject(projectRoot, blueprintId, options) {
  const blueprint = await loadBlueprint(blueprintId);
  const opts = { ...options, blueprintId };

  const files = [];

  // 1. Shared files
  files.push(['package.json', packageJson(opts.name, opts)]);
  files.push(['decantr.config.json', configJson(opts)]);
  files.push(['public/index.html', indexHtml(opts)]);
  files.push(['.decantr/manifest.json', manifest(opts)]);
  files.push(['CLAUDE.md', claudeMd(opts, blueprint)]);

  // 2. Layout components
  if (blueprint.layout.type === 'sidebar') {
    files.push(['src/components/sidebar.js', generateSidebarComponent(blueprint, opts)]);
    if (blueprint.layout.header?.show !== false) {
      files.push(['src/components/header.js', generateHeaderComponent(blueprint, opts)]);
    }
  } else {
    // topnav, landing, minimal
    if (blueprint.layout.header?.show !== false) {
      files.push(['src/components/header.js', generateTopnavComponent(blueprint, opts)]);
    }
  }

  // 3. Page files
  for (const [pageKey, pageSpec] of Object.entries(blueprint.pages)) {
    files.push([`src/pages/${pageKey}.js`, generatePage(pageKey, pageSpec, blueprint, opts)]);
  }

  // 4. App entry point
  files.push(['src/app.js', generateAppJs(blueprint, opts)]);

  // 5. Test file
  files.push(['test/app.test.js', generateTestFile(opts)]);

  // 6. Vendor icon copy script (npm delivery only)
  if (opts.iconDelivery === 'npm' && opts.icons) {
    const vendorScript = vendorIconsJs(opts);
    if (vendorScript) {
      files.push(['scripts/vendor-icons.js', vendorScript]);
    }
  }

  return files;
}

/**
 * Get list of directories that need to be created.
 * @param {Array<[string, string]>} files
 * @returns {Array<string>}
 */
export function getRequiredDirs(files) {
  const dirs = new Set();
  for (const [path] of files) {
    const dir = path.split('/').slice(0, -1).join('/');
    if (dir) dirs.add(dir);
  }
  return [...dirs].sort();
}
