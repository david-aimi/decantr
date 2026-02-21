import { h, createEffect, css, injectBase, cx, resolve, reactiveText } from '../_shared.js';
import { Card, icon as iconFn } from '../../components/index.js';

/**
 * Single KPI metric card.
 * @param {Object} [props]
 * @param {string} [props.title] - Metric label
 * @param {string|number|Function} [props.value] - Main number/value (can be signal getter)
 * @param {string} [props.change] - e.g. "+12%", colored by direction
 * @param {string} [props.icon] - Icon name (optional)
 * @param {string} [props.status] - 'up'|'down'|'neutral' (derived from change if not provided)
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function KPICard(props = {}) {
  injectBase();

  const { title, value, change, icon: iconName, status, class: cls } = props;

  // Derive status from change string if not explicitly provided
  const derivedStatus = status || (change
    ? (change.startsWith('+') ? 'up' : change.startsWith('-') ? 'down' : 'neutral')
    : 'neutral');

  const statusColor = derivedStatus === 'up' ? 'var(--c7)'
    : derivedStatus === 'down' ? 'var(--c9)'
    : 'var(--c4)';

  const statusArrow = derivedStatus === 'up' ? '\u2191'
    : derivedStatus === 'down' ? '\u2193'
    : '';

  // Card body content
  const body = h('div', { class: css('_flex _col _gap2') });

  // Top row: title + icon
  const topRow = h('div', { class: css('_flex _aic _jcsb') });

  if (title) {
    topRow.appendChild(
      h('span', {
        style: { fontSize: '0.875rem', color: 'var(--c4)', fontWeight: '500' }
      }, title)
    );
  }

  if (iconName) {
    const iconEl = iconFn(iconName, { size: '1.5em' });
    iconEl.style.color = 'var(--c1)';
    topRow.appendChild(iconEl);
  }

  body.appendChild(topRow);

  // Value row
  const valueEl = h('div', {
    style: { fontSize: '2rem', fontWeight: '700', color: 'var(--c3)', lineHeight: '1.2' }
  });

  if (typeof value === 'function') {
    valueEl.appendChild(reactiveText(value));
  } else if (value !== undefined) {
    valueEl.textContent = String(value);
  }

  body.appendChild(valueEl);

  // Change row
  if (change) {
    const changeRow = h('div', { class: css('_flex _aic _gap1') });

    if (statusArrow) {
      changeRow.appendChild(
        h('span', {
          style: { color: statusColor, fontSize: '0.875rem', fontWeight: '600' }
        }, statusArrow)
      );
    }

    changeRow.appendChild(
      h('span', {
        style: { color: statusColor, fontSize: '0.875rem', fontWeight: '500' }
      }, change)
    );

    body.appendChild(changeRow);
  }

  return Card({ class: cls }, body);
}
