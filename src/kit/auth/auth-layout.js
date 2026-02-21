import { h, css, injectBase, cx } from '../_shared.js';
import { Card } from '../../components/index.js';

/**
 * Centered auth card layout.
 * @param {Object} [props]
 * @param {string} [props.class]
 * @param {...(string|Node)} children
 * @returns {HTMLElement}
 */
export function AuthLayout(props = {}, ...children) {
  injectBase();
  const { class: cls, ...rest } = props;
  return h('div', {
    class: cx(css('_flex _center _minhscreen _bg0 _p4'), cls),
    ...rest
  },
    h('div', { style: 'width:100%;max-width:420px' },
      Card({}, ...children)
    )
  );
}
