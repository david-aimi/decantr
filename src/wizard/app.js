import { h } from '../core/index.js';
import { createSignal, createEffect, createMemo } from '../state/index.js';
import { setTheme } from '../css/index.js';
import { Button } from '../components/index.js';
import { injectWizardStyles } from './styles.js';
import { fetchCatalog, scaffold } from './api.js';
import { StepIndicator } from './components/step-indicator.js';
import { CategoryStep } from './steps/category.js';
import { VariantStep } from './steps/variant.js';
import { ThemeStep } from './steps/theme.js';
import { CustomizeStep } from './steps/customize.js';
import { ConfirmStep } from './steps/confirm.js';

export function WizardApp() {
  injectWizardStyles();
  setTheme('light');

  // State
  const [step, setStep] = createSignal(0);
  const [catalog, setCatalog] = createSignal(null);
  const [category, setCategory] = createSignal('');
  const [variant, setVariant] = createSignal('');
  const [theme, setThemeChoice] = createSignal('light');
  const [name, setName] = createSignal('my-app');
  const [router, setRouter] = createSignal('hash');
  const [icons, setIcons] = createSignal('');
  const [iconDelivery, setIconDelivery] = createSignal('cdn');
  const [scaffolding, setScaffolding] = createSignal(false);
  const [error, setError] = createSignal('');

  // Load catalog
  fetchCatalog().then(data => setCatalog(data)).catch(e => setError(e.message));

  // Derived state
  const categories = createMemo(() => {
    const cat = catalog();
    return cat ? cat.categories : [];
  });

  const selectedCategory = createMemo(() => {
    return categories().find(c => c.id === category()) || null;
  });

  const variants = createMemo(() => {
    const cat = selectedCategory();
    return cat && cat.variants ? cat.variants : [];
  });

  // Can advance?
  const canNext = createMemo(() => {
    const s = step();
    if (s === 0) return !!category();
    if (s === 1) return !!variant();
    if (s === 2) return !!theme();
    if (s === 3) return !!name();
    return true;
  });

  function nextStep() {
    if (step() < 4 && canNext()) setStep(step() + 1);
  }

  function prevStep() {
    if (step() > 0) setStep(step() - 1);
  }

  async function doScaffold() {
    setScaffolding(true);
    setError('');
    try {
      const opts = {
        name: name(),
        theme: theme(),
        router: router()
      };
      if (icons()) {
        opts.icons = icons();
        opts.iconDelivery = iconDelivery();
      }
      await scaffold({
        blueprint: `${category()}/${variant()}`,
        options: opts
      });
      // Scaffold done — page will reload via HMR
    } catch (e) {
      setError(e.message);
      setScaffolding(false);
    }
  }

  // Root element
  const root = h('div', { class: 'wiz-root' });

  // Header
  root.appendChild(h('div', { style: 'text-align:center;padding:2rem 0 0' },
    h('h1', { style: 'font-size:2rem;font-weight:700;color:var(--c3);margin:0 0 0.25rem' }, 'decantr'),
    h('p', { style: 'color:var(--c4);font-size:0.875rem;margin:0' }, 'Visual project wizard')
  ));

  // Step indicator
  root.appendChild(StepIndicator({ current: step }));

  // Step content container
  const stepContainer = h('div', { 'aria-live': 'polite' });
  root.appendChild(stepContainer);

  // Render step content reactively
  createEffect(() => {
    const s = step();
    stepContainer.innerHTML = '';

    let stepEl;
    switch (s) {
      case 0:
        stepEl = CategoryStep({ categories: categories(), selected: category, onSelect: setCategory });
        break;
      case 1:
        stepEl = VariantStep({
          variants: variants(),
          categoryName: selectedCategory()?.name || '',
          selected: variant,
          onSelect: setVariant
        });
        break;
      case 2:
        stepEl = ThemeStep({ selected: theme, onSelect: setThemeChoice });
        break;
      case 3:
        stepEl = CustomizeStep({ name, setName, router, setRouter, icons, setIcons, iconDelivery, setIconDelivery });
        break;
      case 4:
        stepEl = ConfirmStep({ category, variant, theme, name, router, icons, iconDelivery, scaffolding, error });
        break;
    }

    if (stepEl) stepContainer.appendChild(stepEl);
  });

  // Navigation
  const nav = h('div', { class: 'wiz-nav' });

  const backBtn = Button({ onclick: prevStep }, 'Back');
  const nextBtn = Button({ variant: 'primary', onclick: () => {
    if (step() === 4) doScaffold();
    else nextStep();
  }});

  // Update nav button visibility/text reactively
  createEffect(() => {
    const s = step();
    backBtn.style.visibility = s > 0 ? 'visible' : 'hidden';
    nextBtn.textContent = s === 4 ? (scaffolding() ? 'Scaffolding...' : 'Scaffold') : 'Next';
    nextBtn.disabled = !canNext() || scaffolding();
  });

  nav.appendChild(backBtn);
  nav.appendChild(nextBtn);
  root.appendChild(nav);

  return root;
}
