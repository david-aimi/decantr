export const stormyAi = {
  id: 'stormy-ai',
  name: 'Stormy AI',
  colors: {
    '--c0': '#0a0c10',
    '--c1': '#38bdf8',
    '--c2': '#111318',
    '--c3': '#c5d3e8',
    '--c4': '#6b7a94',
    '--c5': '#252a33',
    '--c6': '#7dd3fc',
    '--c7': '#4ade80',
    '--c8': '#fbbf24',
    '--c9': '#ef4444'
  },
  meta: {
    isDark: true,
    contrastText: '#ffffff',
    surfaceAlpha: 'rgba(17,19,24,0.9)'
  },
  tokens: {
    '--d-radius': '12px',
    '--d-radius-lg': '16px',
    '--d-shadow': '0 8px 32px rgba(0,0,0,0.3)',
    '--d-transition': 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
    '--d-pad': '1.5rem'
  },
  global: 'body{font-family:Inter,"Inter Fallback",system-ui,sans-serif}',
  components: {
    button: [
      '.d-btn{background:color-mix(in srgb,var(--c2) 40%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);border-radius:var(--d-radius);box-shadow:0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06);color:var(--c3);transition:var(--d-transition)}',
      '.d-btn:hover{background:color-mix(in srgb,var(--c2) 60%,transparent);box-shadow:0 12px 40px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.08);transform:translateY(-2px)}',
      '.d-btn:active{transform:translateY(0) scale(0.97);box-shadow:0 4px 16px rgba(0,0,0,0.2)}',
      '.d-btn:focus-visible{outline:2px solid var(--c1);outline-offset:2px}',
      '.d-btn[disabled]{opacity:0.5;pointer-events:none}',
      '.d-btn-primary{background:color-mix(in srgb,var(--c1) 85%,transparent);color:#fff;border-color:color-mix(in srgb,var(--c1) 30%,transparent);box-shadow:0 0 20px color-mix(in srgb,var(--c1) 25%,transparent),0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.15)}',
      '.d-btn-primary:hover{background:color-mix(in srgb,var(--c6) 90%,transparent);box-shadow:0 0 32px color-mix(in srgb,var(--c1) 40%,transparent),0 14px 44px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.2);transform:translateY(-2px)}',
      '.d-btn-primary:active{transform:translateY(0) scale(0.97);box-shadow:0 0 12px color-mix(in srgb,var(--c1) 15%,transparent),0 4px 16px rgba(0,0,0,0.2)}',
      '.d-btn-secondary{background:color-mix(in srgb,var(--c4) 15%,transparent);border-color:color-mix(in srgb,var(--c3) 8%,transparent)}',
      '.d-btn-secondary:hover{background:color-mix(in srgb,var(--c4) 25%,transparent);transform:translateY(-2px)}',
      '.d-btn-destructive{background:color-mix(in srgb,var(--c9) 85%,transparent);color:#fff;border-color:color-mix(in srgb,var(--c9) 30%,transparent);box-shadow:0 0 20px color-mix(in srgb,var(--c9) 20%,transparent),0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.12)}',
      '.d-btn-destructive:hover{background:color-mix(in srgb,var(--c9) 95%,transparent);box-shadow:0 0 32px color-mix(in srgb,var(--c9) 35%,transparent),0 14px 44px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.15);transform:translateY(-2px)}',
      '.d-btn-destructive:active{transform:translateY(0) scale(0.97);box-shadow:0 0 12px color-mix(in srgb,var(--c9) 10%,transparent),0 4px 16px rgba(0,0,0,0.2)}',
      '.d-btn-success{background:color-mix(in srgb,var(--c7) 85%,transparent);color:#fff;border-color:color-mix(in srgb,var(--c7) 30%,transparent);box-shadow:0 0 20px color-mix(in srgb,var(--c7) 20%,transparent),0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.12)}',
      '.d-btn-success:hover{background:color-mix(in srgb,var(--c7) 95%,transparent);box-shadow:0 0 32px color-mix(in srgb,var(--c7) 35%,transparent),0 14px 44px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.15);transform:translateY(-2px)}',
      '.d-btn-success:active{transform:translateY(0) scale(0.97);box-shadow:0 0 12px color-mix(in srgb,var(--c7) 10%,transparent),0 4px 16px rgba(0,0,0,0.2)}',
      '.d-btn-warning{background:color-mix(in srgb,var(--c8) 85%,transparent);color:#fff;border-color:color-mix(in srgb,var(--c8) 30%,transparent);box-shadow:0 0 20px color-mix(in srgb,var(--c8) 20%,transparent),0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.12)}',
      '.d-btn-warning:hover{background:color-mix(in srgb,var(--c8) 95%,transparent);box-shadow:0 0 32px color-mix(in srgb,var(--c8) 35%,transparent),0 14px 44px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.15);transform:translateY(-2px)}',
      '.d-btn-warning:active{transform:translateY(0) scale(0.97);box-shadow:0 0 12px color-mix(in srgb,var(--c8) 10%,transparent),0 4px 16px rgba(0,0,0,0.2)}',
      '.d-btn-outline{background:transparent;border:2px solid var(--c1);color:var(--c1);box-shadow:none;backdrop-filter:none}',
      '.d-btn-outline:hover{background:color-mix(in srgb,var(--c1) 10%,transparent);box-shadow:0 0 20px color-mix(in srgb,var(--c1) 25%,transparent);transform:translateY(-2px)}',
      '.d-btn-outline:active{transform:translateY(0) scale(0.97);box-shadow:none}',
      '.d-btn-ghost{background:transparent;border-color:transparent;box-shadow:none;backdrop-filter:none}',
      '.d-btn-ghost:hover{background:color-mix(in srgb,var(--c3) 8%,transparent);transform:translateY(-1px)}',
      '.d-btn-link{background:transparent;border:none;box-shadow:none;backdrop-filter:none;color:var(--c1);text-decoration:underline}',
      '.d-btn-link:hover{color:var(--c6);text-shadow:0 0 8px color-mix(in srgb,var(--c1) 30%,transparent)}',
      '.d-btn-sm{font-size:0.75rem;padding:0.375rem 0.75rem}',
      '.d-btn-lg{font-size:1rem;padding:0.625rem 1.5rem}'
    ].join(''),
    card: [
      '.d-card{background:color-mix(in srgb,var(--c2) 60%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);border-radius:var(--d-radius-lg);box-shadow:0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06);color:var(--c3);transition:var(--d-transition)}',
      '.d-card-hover:hover{box-shadow:0 20px 56px rgba(0,0,0,0.35),0 0 20px color-mix(in srgb,var(--c1) 10%,transparent),inset 0 1px 0 rgba(255,255,255,0.08);transform:translateY(-4px)}',
      '.d-card-footer{border-top:1px solid color-mix(in srgb,var(--c5) 40%,transparent)}'
    ].join(''),
    input: [
      '.d-input-wrap{background:color-mix(in srgb,var(--c2) 40%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);border-radius:var(--d-radius);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1),inset 0 1px 0 rgba(255,255,255,0.06);transition:var(--d-transition);display:flex;align-items:center}',
      '.d-input-wrap:focus-within{border-color:var(--c1);box-shadow:0 0 0 3px color-mix(in srgb,var(--c1) 15%,transparent),0 0 20px color-mix(in srgb,var(--c1) 10%,transparent),inset 0 1px 2px rgba(0,0,0,0.1);transform:translateY(-1px)}',
      '.d-input{background:transparent;border:none;outline:none;color:var(--c3);width:100%;font:inherit}',
      '.d-input::placeholder{color:var(--c4)}',
      '.d-input-error{border-color:var(--c9)}',
      '.d-input-error:focus-within{box-shadow:0 0 0 3px color-mix(in srgb,var(--c9) 15%,transparent),0 0 20px color-mix(in srgb,var(--c9) 10%,transparent),inset 0 1px 2px rgba(0,0,0,0.1)}'
    ].join(''),
    badge: [
      '.d-badge{display:inline-flex;align-items:center;gap:0.25rem;background:color-mix(in srgb,var(--c1) 80%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;border-radius:9999px;border:1px solid color-mix(in srgb,var(--c1) 30%,transparent);font-size:0.75rem;padding:0.125rem 0.5rem;font-weight:500;box-shadow:0 0 12px color-mix(in srgb,var(--c1) 20%,transparent)}',
      '.d-badge-dot{width:8px;height:8px;border-radius:50%;background:var(--c1);box-shadow:0 0 8px color-mix(in srgb,var(--c1) 50%,transparent)}',
      '@keyframes d-pulse{0%,100%{opacity:1;box-shadow:0 0 8px color-mix(in srgb,var(--c1) 50%,transparent)}50%{opacity:0.5;box-shadow:0 0 16px color-mix(in srgb,var(--c1) 70%,transparent)}}',
      '.d-badge-processing .d-badge-dot{animation:d-pulse 2s ease-in-out infinite}'
    ].join(''),
    modal: [
      '.d-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:1000;animation:d-fade-in 0.25s ease}',
      '.d-modal-content{background:color-mix(in srgb,var(--c2) 70%,transparent);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);border-radius:var(--d-radius-lg);box-shadow:0 24px 64px rgba(0,0,0,0.4),0 0 20px color-mix(in srgb,var(--c1) 8%,transparent),inset 0 1px 0 rgba(255,255,255,0.06);max-width:90vw;max-height:85vh;overflow:auto;color:var(--c3);animation:d-scale-in 0.3s cubic-bezier(0.4,0,0.2,1)}',
      '.d-modal-header{font-weight:600;font-size:1.125rem}',
      '.d-modal-close{background:color-mix(in srgb,var(--c3) 8%,transparent);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);color:var(--c4);cursor:pointer;padding:0.25rem 0.5rem;font-size:1.25rem;line-height:1;border-radius:var(--d-radius);transition:var(--d-transition)}',
      '.d-modal-close:hover{color:var(--c3);background:color-mix(in srgb,var(--c3) 15%,transparent)}',
      '@keyframes d-fade-in{from{opacity:0}to{opacity:1}}',
      '@keyframes d-scale-in{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}'
    ].join(''),
    textarea: [
      '.d-textarea-wrap{background:color-mix(in srgb,var(--c2) 40%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);border-radius:var(--d-radius);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1),inset 0 1px 0 rgba(255,255,255,0.06);transition:var(--d-transition)}',
      '.d-textarea-wrap:focus-within{border-color:var(--c1);box-shadow:0 0 0 3px color-mix(in srgb,var(--c1) 15%,transparent),0 0 20px color-mix(in srgb,var(--c1) 10%,transparent),inset 0 1px 2px rgba(0,0,0,0.1);transform:translateY(-1px)}',
      '.d-textarea{background:transparent;border:none;outline:none;color:var(--c3);width:100%;font:inherit;resize:vertical;min-height:5rem}',
      '.d-textarea::placeholder{color:var(--c4)}',
      '.d-textarea-error{border-color:var(--c9)}',
      '.d-textarea-error:focus-within{box-shadow:0 0 0 3px color-mix(in srgb,var(--c9) 15%,transparent),0 0 20px color-mix(in srgb,var(--c9) 10%,transparent),inset 0 1px 2px rgba(0,0,0,0.1)}'
    ].join(''),
    checkbox: [
      '.d-checkbox{display:inline-flex;align-items:center;gap:0.5rem;cursor:pointer;color:var(--c3)}',
      '.d-checkbox-check{width:18px;height:18px;border-radius:4px;border:1px solid color-mix(in srgb,var(--c3) 12%,transparent);background:color-mix(in srgb,var(--c2) 40%,transparent);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1),inset 0 1px 0 rgba(255,255,255,0.06);transition:var(--d-transition);display:flex;align-items:center;justify-content:center}',
      '.d-checkbox-checked .d-checkbox-check{background:color-mix(in srgb,var(--c1) 85%,transparent);border-color:color-mix(in srgb,var(--c1) 30%,transparent);box-shadow:0 0 12px color-mix(in srgb,var(--c1) 25%,transparent),inset 0 1px 0 rgba(255,255,255,0.15);color:#fff}',
      '.d-checkbox-native:focus-visible~.d-checkbox-check{outline:2px solid var(--c1);outline-offset:2px;box-shadow:0 0 0 3px color-mix(in srgb,var(--c1) 15%,transparent)}'
    ].join(''),
    switch: [
      '.d-switch-track{width:40px;height:22px;border-radius:11px;background:color-mix(in srgb,var(--c4) 25%,transparent);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);box-shadow:inset 0 1px 3px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.04);transition:var(--d-transition);position:relative;cursor:pointer}',
      '.d-switch-thumb{width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,0.2);position:absolute;top:1px;left:1px;transition:var(--d-transition)}',
      '.d-switch-checked .d-switch-track{background:color-mix(in srgb,var(--c1) 85%,transparent);border-color:color-mix(in srgb,var(--c1) 30%,transparent);box-shadow:0 0 12px color-mix(in srgb,var(--c1) 25%,transparent),inset 0 1px 0 rgba(255,255,255,0.08)}',
      '.d-switch-checked .d-switch-thumb{left:19px;box-shadow:0 2px 8px rgba(0,0,0,0.25),0 0 8px color-mix(in srgb,var(--c1) 20%,transparent)}',
      '.d-switch-native:focus-visible~.d-switch-track{outline:2px solid var(--c1);outline-offset:2px;box-shadow:0 0 0 3px color-mix(in srgb,var(--c1) 15%,transparent)}'
    ].join(''),
    select: [
      '.d-select{background:color-mix(in srgb,var(--c2) 40%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);border-radius:var(--d-radius);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1),inset 0 1px 0 rgba(255,255,255,0.06);color:var(--c3);padding:0.5rem 0.75rem;transition:var(--d-transition);cursor:pointer}',
      '.d-select:focus-visible{border-color:var(--c1);box-shadow:0 0 0 3px color-mix(in srgb,var(--c1) 15%,transparent),0 0 20px color-mix(in srgb,var(--c1) 10%,transparent);outline:none}',
      '.d-select-open .d-select{border-color:var(--c1);box-shadow:0 0 0 3px color-mix(in srgb,var(--c1) 15%,transparent),0 0 20px color-mix(in srgb,var(--c1) 10%,transparent)}',
      '.d-select-dropdown{background:color-mix(in srgb,var(--c2) 70%,transparent);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);border-radius:var(--d-radius);box-shadow:0 12px 40px rgba(0,0,0,0.35),0 0 20px color-mix(in srgb,var(--c1) 6%,transparent),inset 0 1px 0 rgba(255,255,255,0.06);margin-top:4px;overflow:hidden}',
      '.d-select-option{color:var(--c3);cursor:pointer;transition:var(--d-transition)}',
      '.d-select-option-highlight{background:color-mix(in srgb,var(--c1) 12%,transparent)}',
      '.d-select-option-active{background:color-mix(in srgb,var(--c1) 80%,transparent);color:#fff}',
      '.d-select-error{border-color:var(--c9)}',
      '.d-select-error:focus-within{box-shadow:0 0 0 3px color-mix(in srgb,var(--c9) 15%,transparent),0 0 20px color-mix(in srgb,var(--c9) 10%,transparent)}'
    ].join(''),
    tabs: [
      '.d-tabs-list{display:flex;border-bottom:1px solid color-mix(in srgb,var(--c5) 40%,transparent);gap:0.25rem}',
      '.d-tab{padding:0.625rem 1rem;color:var(--c4);cursor:pointer;border-bottom:2px solid transparent;transition:var(--d-transition);background:transparent;border-radius:var(--d-radius) var(--d-radius) 0 0;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}',
      '.d-tab:hover{color:var(--c3);background:color-mix(in srgb,var(--c2) 40%,transparent)}',
      '.d-tab-active{color:var(--c1);border-bottom-color:var(--c1);background:color-mix(in srgb,var(--c1) 8%,transparent);box-shadow:0 0 12px color-mix(in srgb,var(--c1) 8%,transparent),inset 0 1px 0 rgba(255,255,255,0.06)}',
    ].join(''),
    accordion: [
      '.d-accordion-item{border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);border-radius:var(--d-radius);background:color-mix(in srgb,var(--c2) 60%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06);margin-bottom:0.5rem;overflow:hidden}',
      '.d-accordion-trigger{width:100%;padding:1rem 1.25rem;background:transparent;border:none;color:var(--c3);cursor:pointer;font:inherit;font-weight:500;display:flex;justify-content:space-between;align-items:center;transition:var(--d-transition)}',
      '.d-accordion-trigger:hover{background:color-mix(in srgb,var(--c2) 80%,transparent)}',
      '.d-accordion-content{padding:0 1.25rem 1rem;color:var(--c3)}'
    ].join(''),
    separator: [
      '.d-separator{display:flex;align-items:center;gap:0.75rem}',
      '.d-separator-line{flex:1;height:1px;background:color-mix(in srgb,var(--c5) 50%,transparent);box-shadow:0 1px 0 rgba(255,255,255,0.03)}',
      '.d-separator-label{color:var(--c4);font-size:0.75rem;font-weight:500}',
      '.d-separator-vertical{width:1px;height:100%;background:color-mix(in srgb,var(--c5) 50%,transparent);box-shadow:1px 0 0 rgba(255,255,255,0.03)}'
    ].join(''),
    breadcrumb: [
      '.d-breadcrumb-link{color:var(--c4);text-decoration:none;transition:var(--d-transition);padding:0.25rem 0.375rem;border-radius:var(--d-radius)}',
      '.d-breadcrumb-link:hover{color:var(--c1);background:color-mix(in srgb,var(--c1) 10%,transparent);text-shadow:0 0 8px color-mix(in srgb,var(--c1) 15%,transparent)}',
      '.d-breadcrumb-separator{color:var(--c4);margin:0 0.25rem}',
      '.d-breadcrumb-current{color:var(--c3);font-weight:500}'
    ].join(''),
    table: [
      '.d-table{width:100%;border-collapse:separate;border-spacing:0;background:color-mix(in srgb,var(--c2) 60%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);border-radius:var(--d-radius-lg);box-shadow:0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06);overflow:hidden}',
      '.d-th{padding:0.75rem 1rem;text-align:left;font-weight:600;color:var(--c3);border-bottom:1px solid color-mix(in srgb,var(--c5) 40%,transparent);background:color-mix(in srgb,var(--c2) 80%,transparent)}',
      '.d-td{padding:0.75rem 1rem;color:var(--c3);border-bottom:1px solid color-mix(in srgb,var(--c5) 25%,transparent)}',
      '.d-tr{transition:var(--d-transition)}',
      '.d-table-striped tbody .d-tr:nth-child(even){background:color-mix(in srgb,var(--c2) 40%,transparent)}',
      '.d-table-hover .d-tr:hover{background:color-mix(in srgb,var(--c1) 6%,transparent)}'
    ].join(''),
    avatar: [
      '.d-avatar{width:40px;height:40px;border-radius:50%;overflow:hidden;background:color-mix(in srgb,var(--c1) 80%,transparent);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:2px solid color-mix(in srgb,var(--c3) 8%,transparent);box-shadow:0 0 12px color-mix(in srgb,var(--c1) 15%,transparent),inset 0 1px 0 rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center}',
      '.d-avatar-fallback{color:#fff;font-weight:600;font-size:0.875rem}'
    ].join(''),
    progress: [
      '.d-progress{width:100%;height:8px;border-radius:4px;background:color-mix(in srgb,var(--c2) 50%,transparent);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);border:1px solid color-mix(in srgb,var(--c3) 6%,transparent);overflow:hidden;box-shadow:inset 0 1px 2px rgba(0,0,0,0.1)}',
      '.d-progress-bar{height:100%;border-radius:4px;background:color-mix(in srgb,var(--c1) 85%,transparent);box-shadow:0 0 12px color-mix(in srgb,var(--c1) 30%,transparent),inset 0 1px 0 rgba(255,255,255,0.15);transition:width 0.4s cubic-bezier(0.4,0,0.2,1)}',
      '.d-progress-success .d-progress-bar{background:color-mix(in srgb,var(--c7) 85%,transparent);box-shadow:0 0 12px color-mix(in srgb,var(--c7) 30%,transparent),inset 0 1px 0 rgba(255,255,255,0.15)}',
      '.d-progress-warning .d-progress-bar{background:color-mix(in srgb,var(--c8) 85%,transparent);box-shadow:0 0 12px color-mix(in srgb,var(--c8) 30%,transparent),inset 0 1px 0 rgba(255,255,255,0.15)}',
      '.d-progress-error .d-progress-bar{background:color-mix(in srgb,var(--c9) 85%,transparent);box-shadow:0 0 12px color-mix(in srgb,var(--c9) 30%,transparent),inset 0 1px 0 rgba(255,255,255,0.15)}',
      '.d-progress-striped .d-progress-bar{background-image:linear-gradient(45deg,rgba(255,255,255,0.1) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.1) 75%,transparent 75%,transparent);background-size:1rem 1rem}'
    ].join(''),
    skeleton: [
      '.d-skeleton{background:color-mix(in srgb,var(--c2) 60%,transparent);background-image:linear-gradient(90deg,transparent,color-mix(in srgb,var(--c1) 4%,transparent),transparent);background-size:200% 100%;border-radius:var(--d-radius);animation:d-shimmer 1.5s ease-in-out infinite}',
      '@keyframes d-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}'
    ].join(''),
    tooltip: [
      '.d-tooltip{background:color-mix(in srgb,var(--c3) 85%,transparent);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:var(--c0);padding:0.375rem 0.625rem;border-radius:var(--d-radius);font-size:0.75rem;box-shadow:0 8px 24px rgba(0,0,0,0.3),0 0 12px color-mix(in srgb,var(--c1) 8%,transparent);border:1px solid color-mix(in srgb,var(--c3) 12%,transparent)}'
    ].join(''),
    alert: [
      '.d-alert{padding:0.875rem 1rem;border-radius:var(--d-radius);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);background:color-mix(in srgb,var(--c2) 60%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:var(--c3);box-shadow:0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06);display:flex;align-items:flex-start;gap:0.75rem}',
      '.d-alert-info{background:color-mix(in srgb,var(--c1) 10%,transparent);border-color:color-mix(in srgb,var(--c1) 20%,transparent);box-shadow:0 8px 32px rgba(0,0,0,0.3),0 0 16px color-mix(in srgb,var(--c1) 6%,transparent)}',
      '.d-alert-success{background:color-mix(in srgb,var(--c7) 10%,transparent);border-color:color-mix(in srgb,var(--c7) 20%,transparent);box-shadow:0 8px 32px rgba(0,0,0,0.3),0 0 16px color-mix(in srgb,var(--c7) 6%,transparent)}',
      '.d-alert-warning{background:color-mix(in srgb,var(--c8) 10%,transparent);border-color:color-mix(in srgb,var(--c8) 20%,transparent);box-shadow:0 8px 32px rgba(0,0,0,0.3),0 0 16px color-mix(in srgb,var(--c8) 6%,transparent)}',
      '.d-alert-error{background:color-mix(in srgb,var(--c9) 10%,transparent);border-color:color-mix(in srgb,var(--c9) 20%,transparent);box-shadow:0 8px 32px rgba(0,0,0,0.3),0 0 16px color-mix(in srgb,var(--c9) 6%,transparent)}',
      '.d-alert-dismiss{background:transparent;border:none;color:var(--c4);cursor:pointer;padding:0.25rem;margin-left:auto;border-radius:var(--d-radius);transition:var(--d-transition)}',
      '.d-alert-dismiss:hover{color:var(--c3);background:color-mix(in srgb,var(--c3) 10%,transparent)}'
    ].join(''),
    chip: [
      '.d-chip{background:color-mix(in srgb,var(--c2) 40%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);color:var(--c3);box-shadow:0 2px 8px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.06);transition:var(--d-transition)}',
      '.d-chip-outline{background:transparent;border:1px solid color-mix(in srgb,var(--c3) 12%,transparent);box-shadow:none}',
      '.d-chip-filled{background:color-mix(in srgb,var(--c1) 80%,transparent);color:#fff;border-color:color-mix(in srgb,var(--c1) 30%,transparent);box-shadow:0 0 12px color-mix(in srgb,var(--c1) 20%,transparent),inset 0 1px 0 rgba(255,255,255,0.12)}',
      '.d-chip-selected{background:color-mix(in srgb,var(--c1) 12%,transparent);border-color:color-mix(in srgb,var(--c1) 25%,transparent);box-shadow:0 0 12px color-mix(in srgb,var(--c1) 10%,transparent)}',
      '.d-chip-interactive:hover{background:color-mix(in srgb,var(--c2) 60%,transparent);box-shadow:0 4px 16px rgba(0,0,0,0.25),0 0 12px color-mix(in srgb,var(--c1) 8%,transparent),inset 0 1px 0 rgba(255,255,255,0.08);transform:translateY(-1px)}',
      '.d-chip-interactive:focus-visible{outline:2px solid var(--c1);outline-offset:2px}',
      '.d-chip-remove{color:var(--c4)}',
      '.d-chip-remove:hover{color:var(--c9)}'
    ].join(''),
    toast: [
      '.d-toast{padding:0.875rem 1rem;border-radius:var(--d-radius);background:color-mix(in srgb,var(--c2) 70%,transparent);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid color-mix(in srgb,var(--c3) 8%,transparent);color:var(--c3);box-shadow:0 12px 40px rgba(0,0,0,0.35),0 0 16px color-mix(in srgb,var(--c1) 6%,transparent),inset 0 1px 0 rgba(255,255,255,0.06);display:flex;align-items:center;gap:0.75rem;animation:d-toast-in 0.3s cubic-bezier(0.4,0,0.2,1)}',
      '.d-toast-info{border-left:3px solid var(--c1)}',
      '.d-toast-success{border-left:3px solid var(--c7)}',
      '.d-toast-warning{border-left:3px solid var(--c8)}',
      '.d-toast-error{border-left:3px solid var(--c9)}',
      '.d-toast-close{background:transparent;border:none;color:var(--c4);cursor:pointer;padding:0.25rem;margin-left:auto;border-radius:var(--d-radius);transition:var(--d-transition)}',
      '.d-toast-close:hover{color:var(--c3);background:color-mix(in srgb,var(--c3) 10%,transparent)}',
      '@keyframes d-toast-in{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}'
    ].join('')
  }
};
