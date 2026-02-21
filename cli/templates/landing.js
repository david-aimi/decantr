/**
 * Landing page scaffold: welcome + pricing + footer.
 */

import { welcomeJs, iconName, iconExpr, iconImport, optIcon } from './shared.js';

export function landingFiles(opts) {
  return [
    ['src/app.js', appJs(opts)],
    ['src/sections/welcome.js', welcomeJs(opts)],
    ['src/sections/pricing.js', pricingJs(opts)],
    ['src/sections/footer.js', footerJs(opts)],
    ['test/welcome.test.js', welcomeTestJs(opts)]
  ];
}

function appJs(opts) {
  return `import { mount } from 'decantr/core';
import { tags } from 'decantr/tags';
import { setTheme } from 'decantr/css';
import { Welcome } from './sections/welcome.js';
import { Pricing } from './sections/pricing.js';
import { Footer } from './sections/footer.js';

const { div } = tags;

setTheme('${opts.theme}');

function App() {
  return div(
    Welcome(),
    Pricing(),
    Footer()
  );
}

mount(document.getElementById('app'), App);
`;
}

function pricingJs(opts) {
  const hasIcons = !!opts.icons;

  const planIcons = { Starter: 'star', Pro: 'bolt', Enterprise: 'shield' };

  const planNameExpr = hasIcons
    ? `              h3({ style: { fontSize: '1.25rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' } },
                  plan.planIcon, plan.name
                )`
    : `              h3({ style: { fontSize: '1.25rem', fontWeight: '600' } }, plan.name)`;

  const featureItem = hasIcons
    ? `                  li({ style: { padding: '0.375rem 0', color: 'var(--c4)', display: 'flex', alignItems: 'center', gap: '0.5rem' } },
                    ${iconExpr('check', opts, { size: '1em', 'aria-hidden': 'true' })}, f
                  )`
    : `                  li({ style: { padding: '0.375rem 0', color: 'var(--c4)' } }, '\\u2713 ' + f)`;

  const plansDef = hasIcons
    ? `const plans = [
  { name: 'Starter', price: 'Free', features: ['5 projects', 'Community support', 'Basic themes'], cta: 'Get Started', planIcon: ${iconExpr('star', opts)} },
  { name: 'Pro', price: '$29/mo', features: ['Unlimited projects', 'Priority support', 'All themes & styles', 'Custom components'], cta: 'Go Pro', popular: true, planIcon: ${iconExpr('bolt', opts)} },
  { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'Dedicated support', 'SLA guarantee', 'Custom integrations'], cta: 'Contact Sales', planIcon: ${iconExpr('shield', opts)} }
];`
    : `const plans = [
  { name: 'Starter', price: 'Free', features: ['5 projects', 'Community support', 'Basic themes'], cta: 'Get Started' },
  { name: 'Pro', price: '$29/mo', features: ['Unlimited projects', 'Priority support', 'All themes & styles', 'Custom components'], cta: 'Go Pro', popular: true },
  { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'Dedicated support', 'SLA guarantee', 'Custom integrations'], cta: 'Contact Sales' }
];`;

  return `import { tags } from 'decantr/tags';
import { Card, Button, Badge } from 'decantr/components';
${iconImport(opts)}const { section, div, h2, h3, p, ul, li } = tags;

${plansDef}

export function Pricing() {
  return section({
    style: { padding: '5rem 2rem', background: 'var(--c2)', borderTop: '1px solid var(--c5)', borderBottom: '1px solid var(--c5)' }
  },
    div({ style: { maxWidth: '1080px', margin: '0 auto' } },
      h2({ style: { fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem' } },
        'Simple pricing'
      ),
      div({
        style: {
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem', alignItems: 'start'
        }
      },
        ...plans.map(plan => {
          const card = Card({},
            Card.Header({},
              div({ style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
${planNameExpr},
                plan.popular ? Badge({ status: 'success', count: 'Popular' }) : null
              )
            ),
            Card.Body({},
              p({ style: { fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' } }, plan.price),
              ul({ style: { listStyle: 'none', padding: '0', marginBottom: '1.5rem' } },
                ...plan.features.map(f =>
${featureItem}
                )
              ),
              Button({ variant: plan.popular ? 'primary' : 'secondary', block: true }, plan.cta)
            )
          );
          return card;
        })
      )
    )
  );
}
`;
}

function footerJs(opts) {
  const hasIcons = !!opts.icons;

  const footerBottom = hasIcons
    ? `    div({
      style: { maxWidth: '1080px', margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--c5)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }
    },
      a({ href: 'https://github.com/decantr-ai/decantr', target: '_blank', 'aria-label': 'Source code', style: { color: 'var(--c4)' } },
        ${iconExpr('code', opts, { size: '1.25em', 'aria-hidden': 'true' })}
      ),
      span({ style: { color: 'var(--c4)', fontSize: '0.875rem' } }, '\\u00a9 2025 decantr. All rights reserved.')
    )`
    : `    div({
      style: { maxWidth: '1080px', margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--c5)', textAlign: 'center', color: 'var(--c4)', fontSize: '0.875rem' }
    }, '\\u00a9 2025 decantr. All rights reserved.')`;

  return `import { tags } from 'decantr/tags';
${iconImport(opts)}const { footer, div, p, a, span } = tags;

const links = {
  Product: ['Features', 'Pricing', 'Docs', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy', 'Terms', 'License']
};

export function Footer() {
  return footer({
    style: { padding: '3rem 2rem', borderTop: '1px solid var(--c5)' }
  },
    div({
      style: {
        maxWidth: '1080px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '2rem'
      }
    },
      div(
        p({ style: { fontWeight: '700', color: 'var(--c1)', marginBottom: '0.5rem' } }, '${opts.name}'),
        p({ style: { color: 'var(--c4)', fontSize: '0.875rem' } }, 'Built with decantr.')
      ),
      ...Object.entries(links).map(([category, items]) =>
        div(
          p({ style: { fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.875rem' } }, category),
          ...items.map(item =>
            a({ href: '#', style: { display: 'block', color: 'var(--c4)', fontSize: '0.875rem', padding: '0.25rem 0' } }, item)
          )
        )
      )
    ),
${footerBottom}
  );
}
`;
}

function welcomeTestJs(opts) {
  return `import { describe, it, assert, render } from 'decantr/test';
import { Welcome } from '../src/sections/welcome.js';

describe('Welcome', () => {
  it('renders project name', () => {
    const { container } = render(() => Welcome());
    assert.ok(container.textContent.includes('${opts.name}'));
  });

  it('renders Get Started button', () => {
    const { container } = render(() => Welcome());
    assert.ok(container.textContent.includes('Get Started'));
  });

  it('renders feature cards', () => {
    const { container } = render(() => Welcome());
    assert.ok(container.textContent.includes('Lightning Fast'));
    assert.ok(container.textContent.includes('Zero Dependencies'));
  });
});
`;
}
