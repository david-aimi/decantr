import { h } from '../core/index.js';
import { Button } from '../components/button.js';
import { Avatar } from '../components/avatar.js';
import { Badge } from '../components/badge.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.variant] - home|about (default: home)
 * @param {string} [props.status] - Status badge text
 * @param {string} props.name
 * @param {string} [props.subtitle]
 * @param {string} [props.bio]
 * @param {string} [props.avatar] - Image URL for about variant
 * @param {{ label: string, onclick?: Function, variant?: string }[]} [props.actions]
 * @param {{ icon?: string, label: string }[]} [props.contactItems]
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function ProfileHero(props = {}) {
  injectBlockBase();

  const {
    variant = 'home', status, name, subtitle, bio,
    avatar, actions = [], contactItems = [], class: cls
  } = props;

  const section = h('section', {
    class: `d-profile-hero${cls ? ' ' + cls : ''}`
  });

  if (variant === 'about' && avatar) {
    const aboutLayout = h('div', { class: 'd-profile-hero-about' });
    aboutLayout.appendChild(Avatar({ src: avatar, alt: name, size: 'lg' }));

    const info = h('div', null);
    info.appendChild(h('h1', { class: 'd-profile-hero-name', style: 'font-size:2rem' }, name));
    if (bio) info.appendChild(h('p', { class: 'd-profile-hero-bio' }, bio));

    if (contactItems.length) {
      const row = h('div', { class: 'd-profile-hero-contact' });
      for (const item of contactItems) {
        const el = h('span', { class: 'd-profile-hero-contact-item' });
        if (item.icon) el.appendChild(h('span', { 'aria-hidden': 'true' }, item.icon));
        el.appendChild(h('span', null, item.label));
        row.appendChild(el);
      }
      info.appendChild(row);
    }

    aboutLayout.appendChild(info);
    section.appendChild(aboutLayout);
    return section;
  }

  const content = h('div', { class: 'd-profile-hero-content' });

  if (status) {
    const statusEl = h('div', { class: 'd-profile-hero-status' },
      Badge({ dot: true, status: 'success' }),
      h('span', { style: 'font-size:0.875rem' }, status)
    );
    content.appendChild(statusEl);
  }

  content.appendChild(h('h1', { class: 'd-profile-hero-name' }, name));

  if (subtitle) {
    content.appendChild(h('p', { class: 'd-profile-hero-subtitle' }, subtitle));
  }

  if (actions.length) {
    const actionsEl = h('div', { class: 'd-profile-hero-actions' });
    for (const action of actions) {
      actionsEl.appendChild(
        Button({
          variant: action.variant || 'primary',
          size: 'lg',
          onclick: action.onclick
        }, action.label)
      );
    }
    content.appendChild(actionsEl);
  }

  section.appendChild(content);
  return section;
}
