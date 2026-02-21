/**
 * Wizard-specific CSS injected once.
 */
let injected = false;

const WIZARD_CSS = `
.wiz-root{max-width:960px;margin:0 auto;padding:2rem;min-height:100vh;display:flex;flex-direction:column}
.wiz-step{flex:1;display:flex;flex-direction:column;animation:wiz-fadein 0.3s ease}
@keyframes wiz-fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.wiz-nav{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 0;border-top:1px solid var(--c5);margin-top:auto}
.wiz-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem}
.wiz-card{cursor:pointer;border:2px solid var(--c5);border-radius:var(--d-radius,8px);padding:1.25rem;transition:all 0.2s ease;background:var(--c2)}
.wiz-card:hover{border-color:var(--c1);transform:translateY(-2px)}
.wiz-card.selected{border-color:var(--c1);background:var(--c0);box-shadow:0 0 0 3px rgba(19,102,217,0.15)}
.wiz-card h3{font-size:1rem;font-weight:600;margin:0 0 0.375rem;color:var(--c3)}
.wiz-card p{font-size:0.875rem;color:var(--c4);margin:0;line-height:1.5}
.wiz-theme-swatch{width:100%;height:80px;border-radius:var(--d-radius,8px);display:flex;align-items:center;justify-content:center;margin-bottom:0.75rem}
.wiz-indicator{display:flex;gap:0.5rem;align-items:center;justify-content:center;padding:1.5rem 0}
.wiz-indicator-dot{width:10px;height:10px;border-radius:50%;background:var(--c5);transition:all 0.2s}
.wiz-indicator-dot.active{background:var(--c1);transform:scale(1.2)}
.wiz-indicator-dot.done{background:var(--c7)}
.wiz-field{display:flex;flex-direction:column;gap:0.375rem;margin-bottom:1rem}
.wiz-field label{font-size:0.875rem;font-weight:500;color:var(--c3)}
.wiz-field input,.wiz-field select{padding:0.5rem 0.75rem;border:1px solid var(--c5);border-radius:var(--d-radius,8px);background:var(--c0);color:var(--c3);font:inherit;font-size:0.875rem;outline:none}
.wiz-field input:focus,.wiz-field select:focus{border-color:var(--c1)}
.wiz-summary{display:grid;grid-template-columns:auto 1fr;gap:0.5rem 1.5rem;font-size:0.875rem}
.wiz-summary dt{color:var(--c4);font-weight:500}
.wiz-summary dd{color:var(--c3);margin:0}
`;

export function injectWizardStyles() {
  if (injected) return;
  if (typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-decantr-wizard', '');
  el.textContent = WIZARD_CSS;
  document.head.appendChild(el);
}
