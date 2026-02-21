import { h } from '../core/index.js';
import { Card } from '../components/card.js';
import { Chip } from '../components/chip.js';
import { Button } from '../components/button.js';
import { injectBlockBase } from './_base.js';

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {{ icon?: string, name: string, description: string, tags?: string[], metrics?: { label: string, value: string }[], links?: { label: string, href?: string, onclick?: Function }[] }[]} props.items
 * @param {string} [props.class]
 * @returns {HTMLElement}
 */
export function ProjectGrid(props = {}) {
  injectBlockBase();

  const { title, items = [], class: cls } = props;

  const section = h('section', {
    class: `d-project-grid${cls ? ' ' + cls : ''}`
  });

  if (title) {
    section.appendChild(h('h2', { class: 'd-project-grid-title' }, title));
  }

  const grid = h('div', { class: 'd-project-grid-items' });

  for (const item of items) {
    const card = Card({ hoverable: true, class: 'd-project-card' });

    const header = h('div', { class: 'd-project-card-header' });
    if (item.icon) {
      header.appendChild(h('span', { class: 'd-project-card-icon', 'aria-hidden': 'true' }, item.icon));
    }
    header.appendChild(h('h3', { class: 'd-project-card-name' }, item.name));
    card.appendChild(header);

    card.appendChild(h('p', { class: 'd-project-card-desc' }, item.description));

    if (item.tags && item.tags.length) {
      const tagsEl = h('div', { class: 'd-project-card-tags' });
      for (const tag of item.tags) {
        tagsEl.appendChild(Chip({ label: tag, size: 'sm' }));
      }
      card.appendChild(tagsEl);
    }

    if (item.metrics && item.metrics.length) {
      const metricsEl = h('div', { class: 'd-project-card-metrics' });
      for (const m of item.metrics) {
        metricsEl.appendChild(h('span', { class: 'd-project-card-metric' },
          h('span', { style: 'font-weight:600' }, m.value),
          h('span', null, ` ${m.label}`)
        ));
      }
      card.appendChild(metricsEl);
    }

    if (item.links && item.links.length) {
      const linksEl = h('div', { class: 'd-project-card-links' });
      for (const link of item.links) {
        linksEl.appendChild(
          Button({
            variant: 'outline',
            size: 'sm',
            onclick: link.onclick
          }, link.label)
        );
      }
      card.appendChild(linksEl);
    }

    grid.appendChild(card);
  }

  section.appendChild(grid);
  return section;
}
