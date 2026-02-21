import { h } from '../core/index.js';
import { Card } from '../components/card.js';
import { Button } from '../components/button.js';
import { Input } from '../components/input.js';
import { Textarea } from '../components/textarea.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {{ name: string, type?: string, placeholder?: string, required?: boolean }[]} [props.fields]
 * @param {{ icon?: string, label: string, value: string, href?: string }[]} [props.methods]
 * @param {{ icon?: string, label: string, value: string }[]} [props.info]
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function ContactSplit(props = {}) {
  injectBlockBase();

  const {
    title, fields = [], methods = [], info = [], class: cls
  } = props;

  const section = h('section', {
    class: `d-contact-split${cls ? ' ' + cls : ''}`
  });

  if (title) {
    section.appendChild(h('h2', { class: 'd-contact-split-title' }, title));
  }

  const layout = h('div', { class: 'd-contact-split-layout' });

  // Left: form
  const form = h('form', {
    class: 'd-contact-split-form',
    onsubmit: (e) => e.preventDefault()
  });

  for (const field of fields) {
    const wrapper = h('div', { class: 'd-contact-split-field' });
    const label = field.name.charAt(0).toUpperCase() + field.name.slice(1);
    wrapper.appendChild(h('label', { for: `contact-${field.name}` }, label));

    if (field.type === 'textarea') {
      wrapper.appendChild(Textarea({
        id: `contact-${field.name}`,
        placeholder: field.placeholder || label,
        rows: 4
      }));
    } else {
      wrapper.appendChild(Input({
        id: `contact-${field.name}`,
        type: field.type || 'text',
        placeholder: field.placeholder || label
      }));
    }

    form.appendChild(wrapper);
  }

  form.appendChild(Button({ variant: 'primary', block: true, type: 'submit' }, 'Send Message'));
  layout.appendChild(form);

  // Right: contact info
  const infoCol = h('div', { class: 'd-contact-split-info' });

  if (methods.length) {
    const methodsEl = h('div', { class: 'd-contact-split-methods' });
    for (const method of methods) {
      const el = h('div', { class: 'd-contact-split-method' });
      if (method.icon) {
        el.appendChild(h('span', { 'aria-hidden': 'true' }, method.icon));
      }
      if (method.href) {
        el.appendChild(h('a', { href: method.href, target: '_blank', rel: 'noopener' }, method.value));
      } else {
        el.appendChild(h('span', null, method.value));
      }
      methodsEl.appendChild(el);
    }
    infoCol.appendChild(methodsEl);
  }

  if (info.length) {
    const cards = h('div', { class: 'd-contact-split-cards' });
    for (const item of info) {
      const card = Card({ class: 'd-contact-split-card' });
      if (item.icon) {
        card.appendChild(h('span', { 'aria-hidden': 'true', style: 'margin-right:0.5rem' }, item.icon));
      }
      card.appendChild(h('span', { style: 'font-weight:600' }, item.label));
      card.appendChild(h('div', { style: 'margin-top:0.25rem' }, item.value));
      cards.appendChild(card);
    }
    infoCol.appendChild(cards);
  }

  layout.appendChild(infoCol);
  section.appendChild(layout);
  return section;
}
