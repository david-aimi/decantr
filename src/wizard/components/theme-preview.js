import { h } from '../../core/index.js';
import { createEffect } from '../../state/index.js';

const THEME_COLORS = {
  light: { bg: '#ffffff', primary: '#1366D9', surface: '#f8fafc', fg: '#020817', label: 'Light' },
  dark: { bg: '#1F1F1F', primary: '#0078D4', surface: '#181818', fg: '#CCCCCC', label: 'Dark' },
  retro: { bg: '#fffef5', primary: '#e63946', surface: '#fff8e7', fg: '#1a1a1a', label: 'Retro' },
  'hot-lava': { bg: '#050810', primary: '#ff4d4d', surface: '#0a0f1a', fg: '#f0f4ff', label: 'Hot Lava' },
  'stormy-ai': { bg: '#0a0c10', primary: '#38bdf8', surface: '#111318', fg: '#c5d3e8', label: 'Stormy AI' }
};

/**
 * Theme swatch preview card.
 * @param {Object} props
 * @param {string} props.themeId
 * @param {Function} props.selected - Signal getter for selected theme ID
 * @param {Function} props.onSelect
 * @returns {HTMLElement}
 */
export function ThemePreview(props = {}) {
  const { themeId, selected, onSelect } = props;
  const colors = THEME_COLORS[themeId] || THEME_COLORS.light;

  const swatch = h('div', {
    class: 'wiz-theme-swatch',
    style: `background:${colors.bg};border:1px solid ${colors.primary}`
  },
    h('div', { style: `display:flex;gap:6px;align-items:center` },
      h('div', { style: `width:24px;height:24px;border-radius:50%;background:${colors.primary}` }),
      h('div', { style: `width:40px;height:8px;border-radius:4px;background:${colors.fg};opacity:0.3` }),
      h('div', { style: `width:30px;height:8px;border-radius:4px;background:${colors.fg};opacity:0.15` })
    )
  );

  const card = h('div', {
    class: 'wiz-card',
    role: 'radio',
    tabindex: '0',
    'aria-checked': 'false',
    'aria-label': `${colors.label} theme`,
    onclick: () => onSelect && onSelect(themeId),
    onkeydown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect && onSelect(themeId);
      }
    }
  },
    swatch,
    h('h3', null, colors.label)
  );

  if (typeof selected === 'function') {
    createEffect(() => {
      const isSelected = selected() === themeId;
      card.className = 'wiz-card' + (isSelected ? ' selected' : '');
      card.setAttribute('aria-checked', String(isSelected));
    });
  }

  return card;
}
