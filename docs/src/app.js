import { h, mount, cond } from 'decantr/core';
import { createMemo } from 'decantr/state';
import { createRouter } from 'decantr/router';
import { setTheme, setStyle } from 'decantr/css';
import { Sidebar } from './layout/sidebar.js';
import { Header } from './layout/header.js';
import { Footer } from './layout/footer.js';
import { Navbar } from './layout/navbar.js';
import { Home } from './pages/home.js';
import { GettingStarted } from './pages/getting-started.js';
import { CorePage } from './pages/core.js';
import { StatePage } from './pages/state.js';
import { RouterPage } from './pages/router.js';
import { CSSPage } from './pages/css.js';
import { ComponentsPage } from './pages/components.js';
import { CLIPage } from './pages/cli.js';

setTheme('light');
setStyle('flat');

const router = createRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Home },
    { path: '/getting-started', component: GettingStarted },
    { path: '/core', component: CorePage },
    { path: '/state', component: StatePage },
    { path: '/router', component: RouterPage },
    { path: '/css', component: CSSPage },
    { path: '/components', component: ComponentsPage },
    { path: '/cli', component: CLIPage }
  ]
});

const isHome = createMemo(() => router.path() === '/');

function LandingLayout() {
  return h('div', { style: { minHeight: '100vh', display: 'flex', flexDirection: 'column' } },
    Navbar(),
    h('main', { style: { flex: '1' } },
      router.outlet()
    ),
    Footer()
  );
}

function DocsLayout() {
  return h('div', { style: { display: 'flex', minHeight: '100vh' } },
    Sidebar({ router }),
    h('div', { style: { flex: '1', display: 'flex', flexDirection: 'column', minWidth: '0' } },
      Header(),
      h('main', { style: { flex: '1', padding: '2rem', maxWidth: '960px', width: '100%', margin: '0 auto' } },
        router.outlet()
      ),
      Footer()
    )
  );
}

function App() {
  return cond(isHome, LandingLayout, DocsLayout);
}

mount(document.getElementById('app'), App);
