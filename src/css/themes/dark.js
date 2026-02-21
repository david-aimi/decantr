export const dark = {
  id: 'dark',
  name: 'Dark',
  colors: {
    '--c0': '#1F1F1F',
    '--c1': '#0078D4',
    '--c2': '#181818',
    '--c3': '#CCCCCC',
    '--c4': '#858585',
    '--c5': '#3C3C3C',
    '--c6': '#026EC1',
    '--c7': '#2EA043',
    '--c8': '#CCA700',
    '--c9': '#F85149'
  },
  meta: {
    isDark: true,
    contrastText: '#ffffff',
    surfaceAlpha: 'rgba(24,24,24,0.95)'
  },
  tokens: {
    '--d-radius': '4px',
    '--d-radius-lg': '6px',
    '--d-shadow': 'none',
    '--d-transition': 'all 0.15s ease',
    '--d-pad': '1.25rem'
  },
  global: 'body{font-family:Inter,"Inter Fallback",system-ui,sans-serif}',
  components: {
    button: [
      '.d-btn{background:#313131;border:1px solid var(--c5);border-radius:var(--d-radius);box-shadow:none;color:var(--c3);transition:var(--d-transition)}',
      '.d-btn:hover{background:#3C3C3C}',
      '.d-btn:active{background:#2A2A2A}',
      '.d-btn:focus-visible{outline:2px solid var(--c1);outline-offset:2px}',
      '.d-btn[disabled]{opacity:0.5;pointer-events:none}',
      '.d-btn-primary{background:var(--c1);color:#fff;border-color:var(--c1)}',
      '.d-btn-primary:hover{background:var(--c6);border-color:var(--c6)}',
      '.d-btn-primary:active{background:#01579B}',
      '.d-btn-secondary{background:transparent;color:var(--c4);border-color:var(--c5)}',
      '.d-btn-secondary:hover{background:#2A2D2E;color:var(--c3)}',
      '.d-btn-destructive{background:var(--c9);color:#fff;border-color:var(--c9)}',
      '.d-btn-destructive:hover{background:#da3633;border-color:#da3633}',
      '.d-btn-destructive:active{background:#b62324}',
      '.d-btn-success{background:var(--c7);color:#fff;border-color:var(--c7)}',
      '.d-btn-success:hover{background:#238636;border-color:#238636}',
      '.d-btn-success:active{background:#196c2e}',
      '.d-btn-warning{background:var(--c8);color:#fff;border-color:var(--c8)}',
      '.d-btn-warning:hover{background:#b89500;border-color:#b89500}',
      '.d-btn-warning:active{background:#9e8000}',
      '.d-btn-outline{background:transparent;border:1px solid var(--c1);color:var(--c1)}',
      '.d-btn-outline:hover{background:rgba(0,120,212,0.1);border-color:var(--c6);color:var(--c6)}',
      '.d-btn-outline:active{background:rgba(0,120,212,0.15)}',
      '.d-btn-ghost{background:transparent;border-color:transparent}',
      '.d-btn-ghost:hover{background:rgba(204,204,204,0.06)}',
      '.d-btn-link{background:transparent;border:none;color:var(--c1);text-decoration:underline}',
      '.d-btn-link:hover{color:var(--c6)}',
      '.d-btn-sm{font-size:0.75rem;padding:0.375rem 0.75rem}',
      '.d-btn-lg{font-size:1rem;padding:0.625rem 1.5rem}'
    ].join(''),
    card: [
      '.d-card{background:#252526;border:1px solid var(--c5);border-radius:var(--d-radius-lg);color:var(--c3);transition:var(--d-transition)}',
      '.d-card-hover:hover{border-color:#505050;box-shadow:0 2px 8px rgba(0,0,0,0.3)}',
      '.d-card-footer{border-top:1px solid var(--c5)}'
    ].join(''),
    input: [
      '.d-input-wrap{background:#313131;border:1px solid var(--c5);border-radius:var(--d-radius);transition:var(--d-transition);display:flex;align-items:center}',
      '.d-input-wrap:focus-within{border-color:var(--c1);box-shadow:none}',
      '.d-input{background:transparent;border:none;outline:none;color:var(--c3);width:100%;font:inherit}',
      '.d-input::placeholder{color:var(--c4)}',
      '.d-input-error{border-color:var(--c9)}',
      '.d-input-error:focus-within{border-color:var(--c9);box-shadow:none}'
    ].join(''),
    badge: [
      '.d-badge{display:inline-flex;align-items:center;gap:0.25rem;background:var(--c1);color:#fff;border-radius:9999px;font-size:0.75rem;padding:0.125rem 0.5rem;font-weight:500}',
      '.d-badge-dot{width:8px;height:8px;border-radius:50%;background:var(--c1)}',
      '@keyframes d-pulse{0%,100%{opacity:1}50%{opacity:0.5}}',
      '.d-badge-processing .d-badge-dot{animation:d-pulse 2s ease-in-out infinite}'
    ].join(''),
    modal: [
      '.d-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:1000;animation:d-fade-in 0.2s ease}',
      '.d-modal-content{background:#252526;border:1px solid var(--c5);border-radius:var(--d-radius-lg);box-shadow:0 8px 32px rgba(0,0,0,0.5);max-width:90vw;max-height:85vh;overflow:auto;color:var(--c3);animation:d-slide-in 0.25s cubic-bezier(0.4,0,0.2,1)}',
      '.d-modal-header{font-weight:600;font-size:1.125rem}',
      '.d-modal-close{background:transparent;border:none;color:var(--c4);cursor:pointer;padding:0.25rem;font-size:1.25rem;line-height:1;border-radius:var(--d-radius);transition:var(--d-transition)}',
      '.d-modal-close:hover{color:var(--c3);background:rgba(204,204,204,0.08)}',
      '@keyframes d-fade-in{from{opacity:0}to{opacity:1}}',
      '@keyframes d-slide-in{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}'
    ].join(''),
    textarea: [
      '.d-textarea-wrap{background:#313131;border:1px solid var(--c5);border-radius:var(--d-radius);transition:var(--d-transition)}',
      '.d-textarea-wrap:focus-within{border-color:var(--c1);box-shadow:none}',
      '.d-textarea{background:transparent;border:none;outline:none;color:var(--c3);width:100%;font:inherit;resize:vertical;min-height:5rem}',
      '.d-textarea::placeholder{color:var(--c4)}',
      '.d-textarea-error{border-color:var(--c9)}',
      '.d-textarea-error:focus-within{border-color:var(--c9);box-shadow:none}'
    ].join(''),
    checkbox: [
      '.d-checkbox{display:inline-flex;align-items:center;gap:0.5rem;cursor:pointer;color:var(--c3)}',
      '.d-checkbox-check{width:18px;height:18px;border-radius:3px;border:1px solid var(--c5);background:#313131;transition:var(--d-transition);display:flex;align-items:center;justify-content:center}',
      '.d-checkbox-checked .d-checkbox-check{background:var(--c1);border-color:var(--c1);color:#fff}',
      '.d-checkbox-native:focus-visible~.d-checkbox-check{outline:2px solid var(--c1);outline-offset:2px}'
    ].join(''),
    switch: [
      '.d-switch-track{width:40px;height:22px;border-radius:11px;background:var(--c5);border:1px solid var(--c5);transition:var(--d-transition);position:relative;cursor:pointer}',
      '.d-switch-thumb{width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.3);position:absolute;top:1px;left:1px;transition:var(--d-transition)}',
      '.d-switch-checked .d-switch-track{background:var(--c1);border-color:var(--c1)}',
      '.d-switch-checked .d-switch-thumb{left:19px}',
      '.d-switch-native:focus-visible~.d-switch-track{outline:2px solid var(--c1);outline-offset:2px}'
    ].join(''),
    select: [
      '.d-select{background:#313131;border:1px solid var(--c5);border-radius:var(--d-radius);color:var(--c3);padding:0.5rem 0.75rem;transition:var(--d-transition);cursor:pointer}',
      '.d-select:focus-visible{border-color:var(--c1);box-shadow:none;outline:none}',
      '.d-select-open .d-select{border-color:var(--c1);box-shadow:none}',
      '.d-select-dropdown{background:#252526;border:1px solid var(--c5);border-radius:var(--d-radius);box-shadow:0 4px 16px rgba(0,0,0,0.4);margin-top:4px;overflow:hidden}',
      '.d-select-option{color:var(--c3);cursor:pointer;transition:var(--d-transition)}',
      '.d-select-option-highlight{background:#2A2D2E}',
      '.d-select-option-active{background:var(--c1);color:#fff}',
      '.d-select-error{border-color:var(--c9)}',
      '.d-select-error:focus-within{border-color:var(--c9);box-shadow:none}'
    ].join(''),
    tabs: [
      '.d-tabs-list{display:flex;border-bottom:1px solid var(--c5);gap:0.25rem}',
      '.d-tab{padding:0.625rem 1rem;color:var(--c4);cursor:pointer;border-bottom:2px solid transparent;transition:var(--d-transition);background:transparent}',
      '.d-tab:hover{color:var(--c3)}',
      '.d-tab-active{color:var(--c1);border-bottom-color:var(--c1)}',
    ].join(''),
    accordion: [
      '.d-accordion-item{border:1px solid var(--c5);border-radius:var(--d-radius);background:#252526;margin-bottom:0.5rem;overflow:hidden}',
      '.d-accordion-trigger{width:100%;padding:1rem 1.25rem;background:transparent;border:none;color:var(--c3);cursor:pointer;font:inherit;font-weight:500;display:flex;justify-content:space-between;align-items:center;transition:var(--d-transition)}',
      '.d-accordion-trigger:hover{background:#2A2D2E}',
      '.d-accordion-content{padding:0 1.25rem 1rem;color:var(--c3)}'
    ].join(''),
    separator: [
      '.d-separator{display:flex;align-items:center;gap:0.75rem}',
      '.d-separator-line{flex:1;height:1px;background:var(--c5)}',
      '.d-separator-label{color:var(--c4);font-size:0.75rem;font-weight:500}',
      '.d-separator-vertical{width:1px;height:100%;background:var(--c5)}'
    ].join(''),
    breadcrumb: [
      '.d-breadcrumb-link{color:var(--c4);text-decoration:none;transition:var(--d-transition)}',
      '.d-breadcrumb-link:hover{color:var(--c1)}',
      '.d-breadcrumb-separator{color:var(--c4);margin:0 0.25rem}',
      '.d-breadcrumb-current{color:var(--c3);font-weight:500}'
    ].join(''),
    table: [
      '.d-table{width:100%;border-collapse:separate;border-spacing:0;background:var(--c2);border:1px solid var(--c5);border-radius:var(--d-radius-lg);overflow:hidden}',
      '.d-th{padding:0.75rem 1rem;text-align:left;font-weight:600;color:var(--c3);border-bottom:1px solid var(--c5);background:#252526}',
      '.d-td{padding:0.75rem 1rem;color:var(--c3);border-bottom:1px solid #2A2A2A}',
      '.d-tr{transition:var(--d-transition)}',
      '.d-table-striped tbody .d-tr:nth-child(even){background:#1E1E1E}',
      '.d-table-hover .d-tr:hover{background:#2A2D2E}'
    ].join(''),
    avatar: [
      '.d-avatar{width:40px;height:40px;border-radius:50%;overflow:hidden;background:var(--c1);border:2px solid var(--c5);display:flex;align-items:center;justify-content:center}',
      '.d-avatar-fallback{color:#fff;font-weight:600;font-size:0.875rem}'
    ].join(''),
    progress: [
      '.d-progress{width:100%;height:8px;border-radius:4px;background:var(--c2);border:1px solid var(--c5);overflow:hidden}',
      '.d-progress-bar{height:100%;border-radius:4px;background:var(--c1);transition:width 0.4s cubic-bezier(0.4,0,0.2,1)}',
      '.d-progress-success .d-progress-bar{background:var(--c7)}',
      '.d-progress-warning .d-progress-bar{background:var(--c8)}',
      '.d-progress-error .d-progress-bar{background:var(--c9)}',
      '.d-progress-striped .d-progress-bar{background-image:linear-gradient(45deg,rgba(255,255,255,0.1) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.1) 75%,transparent 75%,transparent);background-size:1rem 1rem}'
    ].join(''),
    skeleton: [
      '.d-skeleton{background:#252526;background-image:linear-gradient(90deg,#252526,#313131,#252526);background-size:200% 100%;border-radius:var(--d-radius);animation:d-shimmer 1.5s ease-in-out infinite}',
      '@keyframes d-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}'
    ].join(''),
    tooltip: [
      '.d-tooltip{background:var(--c3);color:var(--c0);padding:0.375rem 0.625rem;border-radius:var(--d-radius);font-size:0.75rem;box-shadow:0 2px 8px rgba(0,0,0,0.3)}'
    ].join(''),
    alert: [
      '.d-alert{padding:0.875rem 1rem;border-radius:var(--d-radius);border:1px solid var(--c5);background:#252526;color:var(--c3);display:flex;align-items:flex-start;gap:0.75rem}',
      '.d-alert-info{border-left:3px solid var(--c1)}',
      '.d-alert-success{border-left:3px solid var(--c7)}',
      '.d-alert-warning{border-left:3px solid var(--c8)}',
      '.d-alert-error{border-left:3px solid var(--c9)}',
      '.d-alert-dismiss{background:transparent;border:none;color:var(--c4);cursor:pointer;padding:0.25rem;margin-left:auto;border-radius:var(--d-radius);transition:var(--d-transition)}',
      '.d-alert-dismiss:hover{color:var(--c3);background:rgba(204,204,204,0.08)}'
    ].join(''),
    chip: [
      '.d-chip{background:#313131;border:1px solid var(--c5);color:var(--c3);transition:var(--d-transition)}',
      '.d-chip-outline{background:transparent;border:1px solid var(--c5)}',
      '.d-chip-filled{background:var(--c1);color:#fff;border-color:var(--c1)}',
      '.d-chip-selected{background:rgba(0,120,212,0.15);border-color:var(--c1);color:var(--c1)}',
      '.d-chip-interactive:hover{background:#3C3C3C}',
      '.d-chip-interactive:focus-visible{outline:2px solid var(--c1);outline-offset:2px}',
      '.d-chip-remove{color:var(--c4)}',
      '.d-chip-remove:hover{color:var(--c9)}'
    ].join(''),
    toast: [
      '.d-toast{padding:0.875rem 1rem;border-radius:var(--d-radius);background:#252526;border:1px solid var(--c5);color:var(--c3);box-shadow:0 4px 16px rgba(0,0,0,0.4);display:flex;align-items:center;gap:0.75rem;animation:d-toast-in 0.25s cubic-bezier(0.4,0,0.2,1)}',
      '.d-toast-info{border-left:3px solid var(--c1)}',
      '.d-toast-success{border-left:3px solid var(--c7)}',
      '.d-toast-warning{border-left:3px solid var(--c8)}',
      '.d-toast-error{border-left:3px solid var(--c9)}',
      '.d-toast-close{background:transparent;border:none;color:var(--c4);cursor:pointer;padding:0.25rem;margin-left:auto;border-radius:var(--d-radius);transition:var(--d-transition)}',
      '.d-toast-close:hover{color:var(--c3);background:rgba(204,204,204,0.08)}',
      '@keyframes d-toast-in{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}'
    ].join('')
  }
};
