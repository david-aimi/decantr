import { h } from '../../core/index.js';
import { ThemePreview } from '../components/theme-preview.js';

const THEMES = ['light', 'dark', 'retro', 'hot-lava', 'stormy-ai'];

/**
 * Step 3: Theme selection with visual previews.
 * @param {Object} props
 * @param {Function} props.selected - Signal getter
 * @param {Function} props.onSelect
 * @returns {HTMLElement}
 */
export function ThemeStep(props = {}) {
  const { selected, onSelect } = props;

  const grid = h('div', { class: 'wiz-cards', role: 'radiogroup', 'aria-label': 'Theme selection' });

  for (const id of THEMES) {
    grid.appendChild(ThemePreview({ themeId: id, selected, onSelect }));
  }

  return h('div', { class: 'wiz-step' },
    h('h2', { style: 'margin:0 0 0.5rem;font-size:1.5rem;color:var(--c3)' }, 'Pick a theme'),
    h('p', { style: 'margin:0 0 1.5rem;color:var(--c4)' }, 'Choose a visual style for your project. You can change this later.'),
    grid
  );
}
