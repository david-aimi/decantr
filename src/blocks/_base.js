/**
 * Base structural CSS for content blocks.
 * Injected once on first block render.
 */

let injected = false;

const BLOCK_CSS = [
  // Hero
  '.d-hero{padding:4rem 2rem;text-align:center}',
  '.d-hero-left{text-align:left}',
  '.d-hero-content{max-width:48rem;margin:0 auto}',
  '.d-hero-headline{font-size:2.5rem;font-weight:800;line-height:1.1;margin:0 0 1rem}',
  '.d-hero-desc{font-size:1.125rem;line-height:1.6;margin:0 0 2rem}',
  '.d-hero-actions{display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap}',
  '.d-hero-left .d-hero-actions{justify-content:flex-start}',
  '.d-hero-image{margin-top:2rem;max-width:100%}',

  // Features
  '.d-features{display:grid;gap:1.5rem;padding:3rem 2rem}',
  '.d-features-2{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}',
  '.d-features-3{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}',
  '.d-features-4{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}',
  '.d-feature-item{padding:1.5rem}',
  '.d-feature-icon{font-size:1.5rem;margin-bottom:0.75rem}',
  '.d-feature-title{font-size:1rem;font-weight:600;margin:0 0 0.5rem}',
  '.d-feature-desc{font-size:0.875rem;line-height:1.5;margin:0}',

  // Pricing
  '.d-pricing{display:flex;gap:1.5rem;padding:3rem 2rem;justify-content:center;flex-wrap:wrap;align-items:stretch}',
  '.d-pricing-card{flex:1;min-width:250px;max-width:340px;display:flex;flex-direction:column}',
  '.d-pricing-header{padding:1.5rem;text-align:center}',
  '.d-pricing-name{font-size:1rem;font-weight:600;margin:0 0 0.5rem}',
  '.d-pricing-price{font-size:2.5rem;font-weight:800;line-height:1}',
  '.d-pricing-period{font-size:0.875rem;font-weight:400}',
  '.d-pricing-features{padding:0 1.5rem;flex:1}',
  '.d-pricing-features ul{list-style:none;margin:0;padding:0}',
  '.d-pricing-features li{padding:0.375rem 0;font-size:0.875rem}',
  '.d-pricing-features li::before{content:"\\2713 ";font-weight:700}',
  '.d-pricing-cta{padding:1.5rem;text-align:center}',
  '.d-pricing-highlighted{transform:scale(1.05);z-index:1}',

  // Testimonials
  '.d-testimonials{display:grid;gap:1.5rem;padding:3rem 2rem;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}',
  '.d-testimonial{padding:1.5rem}',
  '.d-testimonial-quote{font-size:0.9375rem;line-height:1.6;margin:0 0 1rem;font-style:italic}',
  '.d-testimonial-quote::before{content:"\\201C"}',
  '.d-testimonial-quote::after{content:"\\201D"}',
  '.d-testimonial-author{display:flex;align-items:center;gap:0.75rem}',
  '.d-testimonial-name{font-size:0.875rem;font-weight:600}',
  '.d-testimonial-role{font-size:0.75rem}',

  // CTA
  '.d-cta{padding:4rem 2rem;text-align:center}',
  '.d-cta-content{max-width:36rem;margin:0 auto}',
  '.d-cta-headline{font-size:1.75rem;font-weight:700;margin:0 0 0.75rem}',
  '.d-cta-desc{font-size:1rem;line-height:1.5;margin:0 0 1.5rem}',
  '.d-cta-action{display:flex;gap:0.75rem;justify-content:center}',

  // Footer
  '.d-footer{padding:3rem 2rem 1.5rem}',
  '.d-footer-columns{display:flex;gap:3rem;flex-wrap:wrap;margin-bottom:2rem}',
  '.d-footer-column{min-width:150px}',
  '.d-footer-column-title{font-size:0.875rem;font-weight:600;margin:0 0 0.75rem}',
  '.d-footer-column ul{list-style:none;margin:0;padding:0}',
  '.d-footer-link{display:block;font-size:0.8125rem;text-decoration:none;padding:0.25rem 0}',
  '.d-footer-copyright{font-size:0.75rem;padding-top:1.5rem}',

  // ProfileHero
  '.d-profile-hero{padding:4rem 2rem;text-align:center}',
  '.d-profile-hero-content{max-width:48rem;margin:0 auto}',
  '.d-profile-hero-status{display:inline-flex;align-items:center;gap:0.5rem;margin-bottom:1.5rem}',
  '.d-profile-hero-name{font-size:2.75rem;font-weight:800;line-height:1.1;margin:0 0 1rem}',
  '.d-profile-hero-subtitle{font-size:1.25rem;line-height:1.5;margin:0 0 2rem}',
  '.d-profile-hero-actions{display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap}',
  '.d-profile-hero-about{display:flex;align-items:flex-start;gap:2rem;text-align:left}',
  '.d-profile-hero-bio{font-size:1rem;line-height:1.7;margin:0 0 1.5rem}',
  '.d-profile-hero-contact{display:flex;gap:1.5rem;flex-wrap:wrap}',
  '.d-profile-hero-contact-item{display:flex;align-items:center;gap:0.5rem;font-size:0.875rem}',

  // ExpertiseGrid
  '.d-expertise-grid{padding:3rem 2rem}',
  '.d-expertise-grid-title{font-size:1.5rem;font-weight:700;margin:0 0 1.5rem;text-align:center}',
  '.d-expertise-grid-items{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}',
  '.d-expertise-item{display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem}',
  '.d-expertise-item-icon{font-size:1.25rem;flex-shrink:0}',
  '.d-expertise-item-name{font-size:0.875rem;font-weight:600}',
  '.d-expertise-item-level{font-size:0.75rem;margin-top:0.125rem}',

  // StatsRow
  '.d-stats-row{display:flex;gap:1.5rem;padding:3rem 2rem;justify-content:center;flex-wrap:wrap}',
  '.d-stats-row-title{width:100%;font-size:1.5rem;font-weight:700;text-align:center;margin:0 0 0.5rem}',
  '.d-stat-card{flex:1;min-width:180px;max-width:300px;padding:1.5rem;text-align:center}',
  '.d-stat-value{font-size:2rem;font-weight:800;line-height:1}',
  '.d-stat-label{font-size:0.875rem;margin-top:0.5rem}',

  // IdentityGrid
  '.d-identity-grid{padding:3rem 2rem}',
  '.d-identity-grid-title{font-size:1.5rem;font-weight:700;margin:0 0 1.5rem;text-align:center}',
  '.d-identity-grid-items{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}',
  '.d-identity-card{padding:1.5rem}',
  '.d-identity-card-icon{font-size:1.5rem;margin-bottom:0.75rem}',
  '.d-identity-card-title{font-size:1rem;font-weight:600;margin:0 0 0.5rem}',
  '.d-identity-card-desc{font-size:0.875rem;line-height:1.5;margin:0 0 0.75rem}',
  '.d-identity-card-quote{font-size:0.8125rem;font-style:italic;line-height:1.5;margin:0}',

  // SkillCategories
  '.d-skill-categories{padding:3rem 2rem}',
  '.d-skill-categories-title{font-size:1.5rem;font-weight:700;margin:0 0 1.5rem;text-align:center}',
  '.d-skill-categories-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem}',
  '.d-skill-category{padding:1.5rem}',
  '.d-skill-category-name{font-size:1rem;font-weight:600;margin:0 0 1rem}',
  '.d-skill-category-list{list-style:none;margin:0;padding:0}',
  '.d-skill-category-item{padding:0.375rem 0;font-size:0.875rem;display:flex;align-items:center;gap:0.5rem}',

  // CertificationRow
  '.d-cert-row{padding:3rem 2rem}',
  '.d-cert-row-title{font-size:1.5rem;font-weight:700;margin:0 0 1.5rem;text-align:center}',
  '.d-cert-row-items{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}',
  '.d-cert-pill{display:inline-flex;align-items:center;gap:0.5rem;padding:0.5rem 1rem;font-size:0.875rem;font-weight:500}',

  // Timeline
  '.d-timeline{padding:3rem 2rem}',
  '.d-timeline-title{font-size:1.5rem;font-weight:700;margin:0 0 2rem;text-align:center}',
  '.d-timeline-list{position:relative;padding-left:2rem}',
  '.d-timeline-list::before{content:"";position:absolute;left:0.5rem;top:0;bottom:0;width:2px;background:var(--c5)}',
  '.d-timeline-item{position:relative;padding:0 0 2rem 1.5rem}',
  '.d-timeline-dot{position:absolute;left:-1.75rem;top:0.25rem;width:0.75rem;height:0.75rem;border-radius:50%;background:var(--c1)}',
  '.d-timeline-period{font-size:0.75rem;font-weight:600;margin:0 0 0.25rem}',
  '.d-timeline-role{font-size:1rem;font-weight:600;margin:0 0 0.25rem}',
  '.d-timeline-company{font-size:0.875rem;margin:0 0 0.5rem}',
  '.d-timeline-desc{font-size:0.8125rem;line-height:1.5;margin:0}',

  // ProjectGrid
  '.d-project-grid{padding:3rem 2rem}',
  '.d-project-grid-title{font-size:1.5rem;font-weight:700;margin:0 0 1.5rem;text-align:center}',
  '.d-project-grid-items{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem}',
  '.d-project-card{padding:1.5rem;display:flex;flex-direction:column}',
  '.d-project-card-header{display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem}',
  '.d-project-card-icon{font-size:1.25rem}',
  '.d-project-card-name{font-size:1rem;font-weight:600;margin:0}',
  '.d-project-card-desc{font-size:0.875rem;line-height:1.5;margin:0 0 1rem;flex:1}',
  '.d-project-card-tags{display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem}',
  '.d-project-card-metrics{display:flex;gap:1rem;margin-bottom:1rem;font-size:0.8125rem}',
  '.d-project-card-metric{display:flex;align-items:center;gap:0.25rem}',
  '.d-project-card-links{display:flex;gap:0.75rem;margin-top:auto}',

  // TechGrid
  '.d-tech-grid{padding:3rem 2rem}',
  '.d-tech-grid-title{font-size:1.5rem;font-weight:700;margin:0 0 1.5rem;text-align:center}',
  '.d-tech-grid-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:1rem}',
  '.d-tech-item{display:flex;flex-direction:column;align-items:center;gap:0.5rem;padding:1rem;text-align:center}',
  '.d-tech-item-icon{font-size:1.5rem}',
  '.d-tech-item-name{font-size:0.8125rem;font-weight:500}',

  // HobbyGrid
  '.d-hobby-grid{padding:3rem 2rem}',
  '.d-hobby-grid-title{font-size:1.5rem;font-weight:700;margin:0 0 1.5rem;text-align:center}',
  '.d-hobby-grid-items{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}',
  '.d-hobby-card{padding:1.5rem}',
  '.d-hobby-card-icon{font-size:2rem;margin-bottom:1rem}',
  '.d-hobby-card-name{font-size:1.125rem;font-weight:600;margin:0 0 0.5rem}',
  '.d-hobby-card-desc{font-size:0.875rem;line-height:1.5;margin:0 0 1rem}',
  '.d-hobby-card-stats{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:0.75rem;font-size:0.8125rem}',
  '.d-hobby-card-tags{display:flex;gap:0.5rem;flex-wrap:wrap}',

  // PhotoGallery
  '.d-photo-gallery{padding:3rem 2rem}',
  '.d-photo-gallery-title{font-size:1.5rem;font-weight:700;margin:0 0 1.5rem;text-align:center}',
  '.d-photo-gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem}',
  '.d-photo-gallery-item{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:0.875rem}',

  // ContactSplit
  '.d-contact-split{padding:3rem 2rem}',
  '.d-contact-split-title{font-size:1.5rem;font-weight:700;margin:0 0 1.5rem;text-align:center}',
  '.d-contact-split-layout{display:grid;grid-template-columns:1fr 1fr;gap:2rem}',
  '@media(max-width:768px){.d-contact-split-layout{grid-template-columns:1fr}}',
  '.d-contact-split-form{display:flex;flex-direction:column;gap:1rem}',
  '.d-contact-split-field label{display:block;font-size:0.875rem;font-weight:500;margin-bottom:0.375rem}',
  '.d-contact-split-info{display:flex;flex-direction:column;gap:1.5rem}',
  '.d-contact-split-methods{display:flex;flex-direction:column;gap:1rem}',
  '.d-contact-split-method{display:flex;align-items:center;gap:0.75rem;font-size:0.875rem}',
  '.d-contact-split-cards{display:flex;flex-direction:column;gap:1rem}',
  '.d-contact-split-card{padding:1rem;font-size:0.875rem}',

  // SocialSidebar
  '.d-social-sidebar{position:fixed;left:1rem;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:0.75rem;z-index:40}',
  '.d-social-sidebar a{display:flex;align-items:center;justify-content:center;width:2.25rem;height:2.25rem;border-radius:50%;text-decoration:none;transition:transform 0.2s ease}',
  '.d-social-sidebar a:hover{transform:scale(1.15)}',
  '@media(max-width:768px){.d-social-sidebar{display:none}}'
].join('');

export function injectBlockBase() {
  if (injected) return;
  if (typeof document === 'undefined') return;
  injected = true;
  let el = document.querySelector('[data-decantr-blocks]');
  if (!el) {
    el = document.createElement('style');
    el.setAttribute('data-decantr-blocks', '');
    document.head.appendChild(el);
  }
  el.textContent = BLOCK_CSS;
}

export function resetBlockBase() {
  injected = false;
}
