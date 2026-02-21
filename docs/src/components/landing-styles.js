const injected = { done: false };

export function injectLandingStyles() {
  if (injected.done || typeof document === 'undefined') return;
  injected.done = true;
  const style = document.createElement('style');
  style.setAttribute('data-decantr-landing', '');
  style.textContent = `
.landing-glow{position:absolute;border-radius:50%;filter:blur(80px);opacity:0.5;pointer-events:none}
.landing-glow-1{width:500px;height:500px;background:color-mix(in srgb,var(--c1) 15%,transparent);top:-100px;left:-100px}
.landing-glow-2{width:400px;height:400px;background:color-mix(in srgb,var(--c6) 12%,transparent);bottom:-80px;right:-80px}
.landing-grid{position:absolute;inset:0;background-image:linear-gradient(var(--c5) 1px,transparent 1px),linear-gradient(90deg,var(--c5) 1px,transparent 1px);background-size:64px 64px;opacity:0.3;-webkit-mask-image:radial-gradient(ellipse at center,black 20%,transparent 70%);mask-image:radial-gradient(ellipse at center,black 20%,transparent 70%);pointer-events:none}
@keyframes landing-fade-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.landing-animate{animation:landing-fade-up 0.6s ease forwards;opacity:0}
.landing-animate-delay-1{animation-delay:0.12s}
.landing-animate-delay-2{animation-delay:0.24s}
.landing-animate-delay-3{animation-delay:0.36s}
@media(prefers-reduced-motion:reduce){.landing-animate{animation:none;opacity:1}}
.landing-stat:hover{transform:translateY(-2px)}
.landing-stat{transition:transform 0.2s ease}
@media(max-width:768px){.landing-hero-cta{flex-direction:column;align-items:center}.landing-stats-grid{grid-template-columns:repeat(2,1fr)!important}.landing-code-grid{grid-template-columns:1fr!important}.landing-features-grid{grid-template-columns:1fr!important}.landing-theme-buttons{justify-content:center}}
`;
  document.head.appendChild(style);
}
