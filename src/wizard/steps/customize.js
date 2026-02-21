import { h } from '../../core/index.js';
import { createEffect, untrack } from '../../state/index.js';

/**
 * Step 4: Customize project settings.
 * @param {Object} props
 * @param {Function} props.name - Signal getter/setter pair
 * @param {Function} props.setName
 * @param {Function} props.router - Signal getter
 * @param {Function} props.setRouter
 * @param {Function} props.icons - Signal getter
 * @param {Function} props.setIcons
 * @param {Function} props.iconDelivery - Signal getter
 * @param {Function} props.setIconDelivery
 * @returns {HTMLElement}
 */
export function CustomizeStep(props = {}) {
  const { name, setName, router, setRouter, icons, setIcons, iconDelivery, setIconDelivery } = props;

  const nameInput = h('input', {
    type: 'text',
    value: untrack(() => typeof name === 'function' ? name() : ''),
    placeholder: 'my-app',
    oninput: (e) => setName && setName(e.target.value)
  });

  const routerSelect = h('select', {
    onchange: (e) => setRouter && setRouter(e.target.value)
  },
    h('option', { value: 'hash', selected: true }, 'Hash (works everywhere)'),
    h('option', { value: 'history' }, 'History (clean URLs)')
  );

  const iconsSelect = h('select', {
    onchange: (e) => setIcons && setIcons(e.target.value)
  },
    h('option', { value: '' }, 'None'),
    h('option', { value: 'material' }, 'Google Material Icons'),
    h('option', { value: 'lucide' }, 'Lucide')
  );

  const deliverySelect = h('select', {
    onchange: (e) => setIconDelivery && setIconDelivery(e.target.value)
  },
    h('option', { value: 'cdn', selected: true }, 'CDN (fastest setup)'),
    h('option', { value: 'npm' }, 'npm (self-hosted)')
  );

  const deliveryField = h('div', { class: 'wiz-field', style: 'display:none' },
    h('label', { for: 'wiz-icon-delivery' }, 'Icon Delivery'),
    deliverySelect
  );

  // Show/hide delivery field based on icon library selection
  createEffect(() => {
    const lib = typeof icons === 'function' ? icons() : '';
    deliveryField.style.display = lib ? 'flex' : 'none';
  });

  return h('div', { class: 'wiz-step' },
    h('h2', { style: 'margin:0 0 0.5rem;font-size:1.5rem;color:var(--c3)' }, 'Customize'),
    h('p', { style: 'margin:0 0 1.5rem;color:var(--c4)' }, 'Fine-tune your project settings.'),
    h('div', { class: 'wiz-field' },
      h('label', { for: 'wiz-name' }, 'Project Name'),
      nameInput
    ),
    h('div', { class: 'wiz-field' },
      h('label', { for: 'wiz-router' }, 'Router Mode'),
      routerSelect
    ),
    h('div', { class: 'wiz-field' },
      h('label', { for: 'wiz-icons' }, 'Icon Library'),
      iconsSelect
    ),
    deliveryField
  );
}
