import { h } from '../core/index.js';
import { injectBase, cx, reactiveAttr, reactiveClass, reactiveProp } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.placeholder]
 * @param {string|Function} [props.value]
 * @param {boolean|Function} [props.disabled]
 * @param {boolean|Function} [props.error]
 * @param {number} [props.rows] - Number of visible rows (default: 3)
 * @param {string} [props.resize] - none|vertical|horizontal|both (default: vertical)
 * @param {Function} [props.oninput]
 * @param {Function} [props.ref]
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function Textarea(props = {}) {
  injectBase();

  const {
    placeholder, value, disabled, error, rows = 3,
    resize = 'vertical', oninput, ref, class: cls
  } = props;

  const wrapClass = cx('d-textarea-wrap', cls);
  const textareaProps = { class: 'd-textarea', rows };

  if (placeholder) textareaProps.placeholder = placeholder;
  if (oninput) textareaProps.oninput = oninput;

  const textareaEl = h('textarea', textareaProps);
  textareaEl.style.resize = resize;

  if (ref) ref(textareaEl);

  reactiveProp(textareaEl, value, 'value');
  reactiveAttr(textareaEl, disabled, 'disabled');

  const wrap = h('div', { class: wrapClass }, textareaEl);

  reactiveClass(wrap, error, wrapClass, 'd-textarea-error');

  return wrap;
}
