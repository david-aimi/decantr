import { h } from '../../core/index.js';
import { createEffect } from '../../state/index.js';

const STEPS = ['Category', 'Variant', 'Theme', 'Customize', 'Confirm'];

/**
 * Step progress indicator.
 * @param {Object} props
 * @param {Function} props.current - Signal getter returning current step index (0-4)
 * @returns {HTMLElement}
 */
export function StepIndicator(props = {}) {
  const { current } = props;

  const container = h('div', { class: 'wiz-indicator', role: 'progressbar',
    'aria-label': 'Wizard progress' });

  const dots = [];
  for (let i = 0; i < STEPS.length; i++) {
    const dot = h('div', {
      class: 'wiz-indicator-dot',
      title: STEPS[i],
      'aria-hidden': 'true'
    });
    dots.push(dot);
    container.appendChild(dot);
  }

  if (typeof current === 'function') {
    createEffect(() => {
      const idx = current();
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = 'wiz-indicator-dot' +
          (i === idx ? ' active' : i < idx ? ' done' : '');
      }
      container.setAttribute('aria-valuenow', String(idx + 1));
      container.setAttribute('aria-valuemax', String(STEPS.length));
      container.setAttribute('aria-valuetext', `Step ${idx + 1} of ${STEPS.length}: ${STEPS[idx]}`);
    });
  }

  return container;
}
