import { h } from '../core/index.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {{ icon: string, href: string, label: string }[]} props.links
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function SocialSidebar(props = {}) {
  injectBlockBase();

  const { links = [], class: cls } = props;

  const nav = h('nav', {
    class: `d-social-sidebar${cls ? ' ' + cls : ''}`,
    'aria-label': 'Social links'
  });

  for (const link of links) {
    nav.appendChild(
      h('a', {
        href: link.href,
        target: '_blank',
        rel: 'noopener',
        'aria-label': link.label,
        title: link.label
      }, link.icon)
    );
  }

  return nav;
}
