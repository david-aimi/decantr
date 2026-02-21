import { h } from '../core/index.js';
import { injectBase, cx, reactiveAttr, reactiveClass, reactiveProp } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.type] - text|password|number|email|search
 * @param {string} [props.placeholder]
 * @param {string|Function} [props.value]
 * @param {boolean|Function} [props.disabled]
 * @param {boolean} [props.readonly]
 * @param {string|Node} [props.prefix]
 * @param {string|Node} [props.suffix]
 * @param {boolean|Function} [props.error]
 * @param {Function} [props.oninput]
 * @param {Function} [props.ref]
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function Input(props = {}) {
  injectBase();

  const {
    type = 'text', placeholder, value, disabled, readonly,
    prefix, suffix, error, oninput, ref, class: cls
  } = props;

  const wrapClass = cx('d-input-wrap', cls);
  const inputProps = { class: 'd-input', type };

  if (placeholder) inputProps.placeholder = placeholder;
  if (readonly) inputProps.readonly = '';
  if (oninput) inputProps.oninput = oninput;

  const inputEl = h('input', inputProps);

  if (ref) ref(inputEl);

  reactiveProp(inputEl, value, 'value');
  reactiveAttr(inputEl, disabled, 'disabled');

  const children = [];
  if (prefix) {
    const prefixEl = typeof prefix === 'string'
      ? h('span', { class: 'd-input-prefix' }, prefix)
      : h('span', { class: 'd-input-prefix' }, prefix);
    children.push(prefixEl);
  }
  children.push(inputEl);
  if (suffix) {
    const suffixEl = typeof suffix === 'string'
      ? h('span', { class: 'd-input-suffix' }, suffix)
      : h('span', { class: 'd-input-suffix' }, suffix);
    children.push(suffixEl);
  }

  const wrap = h('div', { class: wrapClass }, ...children);

  reactiveClass(wrap, error, wrapClass, 'd-input-error');

  return wrap;
}
