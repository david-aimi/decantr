/**
 * Shared utilities for kit components.
 * Kit components use h() internally (consistent with primitives).
 */
import { h } from '../core/index.js';
import { createEffect } from '../state/index.js';
import { css } from '../css/index.js';
import { injectBase, cx } from '../components/_base.js';

export { h, createEffect, css, injectBase, cx };

/**
 * Resolve a prop that may be a signal getter or static value.
 * @param {*|Function} prop
 * @returns {*}
 */
export function resolve(prop) {
  return typeof prop === 'function' ? prop() : prop;
}

/**
 * Create a reactive text node that updates when signal changes.
 * @param {*|Function} prop
 * @returns {Text}
 */
export function reactiveText(prop) {
  if (typeof prop === 'function') {
    const node = document.createTextNode(prop());
    createEffect(() => { node.textContent = prop(); });
    return node;
  }
  return document.createTextNode(String(prop ?? ''));
}
