import { h } from '../core/index.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

function kebabToPascal(str) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function createLucideSVG(iconDef, size, extraAttrs) {
  const [, defaults, children] = iconDef;
  const svg = document.createElementNS(SVG_NS, 'svg');
  for (const [k, v] of Object.entries(defaults)) {
    svg.setAttribute(k, String(v));
  }
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  for (const [k, v] of Object.entries(extraAttrs)) {
    svg.setAttribute(k, String(v));
  }
  for (const [childTag, childAttrs] of children) {
    const child = document.createElementNS(SVG_NS, childTag);
    for (const [k, v] of Object.entries(childAttrs)) {
      child.setAttribute(k, String(v));
    }
    svg.appendChild(child);
  }
  svg.style.display = 'inline-block';
  svg.style.verticalAlign = 'middle';
  return svg;
}

/**
 * @param {string} name
 * @param {Object} [opts]
 * @param {string|number} [opts.size] - CSS size (default: 1.25em)
 * @param {string} [opts.class]
 * @returns {HTMLElement}
 */
export function icon(name, opts = {}) {
  const { size = '1.25em', class: cls, ...rest } = opts;

  // Detect Material Icons (class on element or data attribute)
  if (typeof document !== 'undefined' &&
      (document.querySelector('.material-icons') ||
       document.querySelector('[data-icons="material"]'))) {
    const el = h('span', {
      class: cls ? `material-icons ${cls}` : 'material-icons',
      style: { fontSize: size, lineHeight: '1', verticalAlign: 'middle' },
      ...rest
    }, name);
    return el;
  }

  // Detect Lucide with icons data loaded — direct SVG creation
  if (typeof window !== 'undefined' && window.lucide && window.lucide.icons) {
    const pascalName = kebabToPascal(name);
    const iconDef = window.lucide.icons[pascalName];
    if (iconDef) {
      const extraAttrs = {};
      if (cls) extraAttrs.class = cls;
      Object.assign(extraAttrs, rest);
      return createLucideSVG(iconDef, size, extraAttrs);
    }
  }

  // Lucide tag present but not yet loaded — pending placeholder
  if (typeof document !== 'undefined' &&
      document.querySelector('[data-icons="lucide"]')) {
    return h('span', {
      title: name,
      'data-lucide-pending': name,
      class: cls || '',
      style: { display: 'inline-block', width: size, height: size },
      ...rest
    });
  }

  // Fallback: empty span with title
  return h('span', {
    class: cls || '',
    title: name,
    style: { display: 'inline-block', width: size, height: size },
    ...rest
  });
}
