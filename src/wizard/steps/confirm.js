import { h } from '../../core/index.js';
import { createEffect } from '../../state/index.js';

const ICON_LABELS = {
  material: 'Material Icons',
  lucide: 'Lucide'
};

const DELIVERY_LABELS = {
  cdn: 'CDN',
  npm: 'npm'
};

/**
 * Step 5: Review selections and scaffold.
 * @param {Object} props
 * @param {Function} props.category - Signal getter
 * @param {Function} props.variant
 * @param {Function} props.theme
 * @param {Function} props.name
 * @param {Function} props.router
 * @param {Function} props.icons - Signal getter
 * @param {Function} props.iconDelivery - Signal getter
 * @param {Function} props.scaffolding - Signal getter for loading state
 * @param {Function} props.error - Signal getter for error message
 * @returns {HTMLElement}
 */
export function ConfirmStep(props = {}) {
  const { category, variant, theme, name, router, icons, iconDelivery, scaffolding, error } = props;

  const iconDisplay = () => {
    const lib = typeof icons === 'function' ? icons() : '';
    if (!lib) return 'None';
    const delivery = typeof iconDelivery === 'function' ? iconDelivery() : 'cdn';
    return `${ICON_LABELS[lib] || lib} (${DELIVERY_LABELS[delivery] || delivery})`;
  };

  const summary = h('dl', { class: 'wiz-summary' });

  const fields = [
    ['Category', category],
    ['Variant', variant],
    ['Theme', theme],
    ['Project Name', name],
    ['Router', router],
    ['Icons', iconDisplay]
  ];

  for (const [label, getter] of fields) {
    const dt = h('dt', null, label);
    const dd = h('dd', null, typeof getter === 'function' ? getter() : '');

    if (typeof getter === 'function') {
      createEffect(() => { dd.textContent = getter(); });
    }

    summary.appendChild(dt);
    summary.appendChild(dd);
  }

  const errorEl = h('p', {
    style: 'color:var(--c9);font-size:0.875rem;margin:1rem 0 0',
    'aria-live': 'polite'
  });

  if (typeof error === 'function') {
    createEffect(() => { errorEl.textContent = error() || ''; });
  }

  return h('div', { class: 'wiz-step' },
    h('h2', { style: 'margin:0 0 0.5rem;font-size:1.5rem;color:var(--c3)' }, 'Review & Scaffold'),
    h('p', { style: 'margin:0 0 1.5rem;color:var(--c4)' }, 'Review your selections. Click "Scaffold" to generate your project.'),
    summary,
    errorEl
  );
}
