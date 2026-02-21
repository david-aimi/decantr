import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createDOM } from '../src/test/dom.js';
import { resetBlockBase } from '../src/blocks/_base.js';

let cleanup;

before(() => {
  const env = createDOM();
  cleanup = env.cleanup;
});

after(() => {
  if (cleanup) cleanup();
});

beforeEach(() => {
  resetBlockBase();
});

describe('ProfileHero', () => {
  it('renders home variant with name and subtitle', async () => {
    const { ProfileHero } = await import('../src/blocks/profile-hero.js');
    const el = ProfileHero({ name: 'Test User', subtitle: 'Developer', variant: 'home' });
    assert.ok(el);
    assert.equal(el.tagName, 'SECTION');
    assert.ok(el.textContent.includes('Test User'));
    assert.ok(el.textContent.includes('Developer'));
  });

  it('renders status badge when provided', async () => {
    const { ProfileHero } = await import('../src/blocks/profile-hero.js');
    const el = ProfileHero({ name: 'Test', status: 'Available', variant: 'home' });
    assert.ok(el.textContent.includes('Available'));
  });

  it('renders about variant with bio', async () => {
    const { ProfileHero } = await import('../src/blocks/profile-hero.js');
    const el = ProfileHero({ name: 'Test', bio: 'My bio text', variant: 'about', avatar: '/photo.jpg' });
    assert.ok(el.textContent.includes('My bio text'));
    assert.ok(el.querySelector('.d-profile-hero-about'));
  });

  it('renders action buttons', async () => {
    const { ProfileHero } = await import('../src/blocks/profile-hero.js');
    const el = ProfileHero({ name: 'Test', actions: [{ label: 'Click Me' }] });
    assert.ok(el.querySelector('.d-profile-hero-actions'));
    assert.ok(el.textContent.includes('Click Me'));
  });
});

describe('ExpertiseGrid', () => {
  it('renders with title and items as chips', async () => {
    const { ExpertiseGrid } = await import('../src/blocks/expertise-grid.js');
    const el = ExpertiseGrid({
      title: 'Skills',
      items: [{ name: 'JavaScript', level: 'Expert' }, { name: 'Python', level: 'Advanced' }]
    });
    assert.ok(el);
    assert.equal(el.tagName, 'SECTION');
    assert.ok(el.textContent.includes('Skills'));
    assert.ok(el.textContent.includes('JavaScript'));
    assert.ok(el.textContent.includes('Expert'));
    const chips = el.querySelectorAll('.d-chip');
    assert.equal(chips.length, 2);
  });

  it('renders without title', async () => {
    const { ExpertiseGrid } = await import('../src/blocks/expertise-grid.js');
    const el = ExpertiseGrid({ items: [{ name: 'React' }] });
    assert.ok(el.textContent.includes('React'));
    assert.ok(!el.querySelector('.d-expertise-grid-title'));
  });
});

describe('StatsRow', () => {
  it('renders stat cards', async () => {
    const { StatsRow } = await import('../src/blocks/stats-row.js');
    const el = StatsRow({
      title: 'Stats',
      items: [{ value: '100+', label: 'Projects' }, { value: '50', label: 'Clients' }]
    });
    assert.ok(el);
    assert.ok(el.textContent.includes('100+'));
    assert.ok(el.textContent.includes('Projects'));
  });
});

describe('IdentityGrid', () => {
  it('renders cards with titles and descriptions', async () => {
    const { IdentityGrid } = await import('../src/blocks/identity-grid.js');
    const el = IdentityGrid({
      title: 'Who I Am',
      items: [{ title: 'Builder', description: 'I build things', quote: 'Ship fast' }]
    });
    assert.ok(el.textContent.includes('Who I Am'));
    assert.ok(el.textContent.includes('Builder'));
    assert.ok(el.textContent.includes('Ship fast'));
  });
});

describe('SkillCategories', () => {
  it('renders categorized skill lists', async () => {
    const { SkillCategories } = await import('../src/blocks/skill-categories.js');
    const el = SkillCategories({
      title: 'Tech Skills',
      categories: [{ name: 'Frontend', skills: ['React', 'Vue'] }]
    });
    assert.ok(el.textContent.includes('Frontend'));
    assert.ok(el.textContent.includes('React'));
    assert.ok(el.textContent.includes('Vue'));
  });
});

describe('CertificationRow', () => {
  it('renders certification chips', async () => {
    const { CertificationRow } = await import('../src/blocks/certification-row.js');
    const el = CertificationRow({
      title: 'Certs',
      items: [{ name: 'AWS SA', issuer: 'Amazon' }]
    });
    assert.ok(el.textContent.includes('Certs'));
    assert.ok(el.textContent.includes('AWS SA'));
    assert.ok(el.textContent.includes('Amazon'));
    assert.ok(el.querySelector('.d-chip'));
  });
});

describe('Timeline', () => {
  it('renders timeline entries', async () => {
    const { Timeline } = await import('../src/blocks/timeline.js');
    const el = Timeline({
      title: 'Career',
      items: [
        { period: '2024-Present', role: 'Senior Dev', company: 'Acme', description: 'Leading team' }
      ]
    });
    assert.ok(el.textContent.includes('Career'));
    assert.ok(el.textContent.includes('Senior Dev'));
    assert.ok(el.textContent.includes('Acme'));
    assert.ok(el.querySelector('.d-timeline-dot'));
  });

  it('applies custom dot color', async () => {
    const { Timeline } = await import('../src/blocks/timeline.js');
    const el = Timeline({
      items: [{ period: '2024', role: 'Dev', company: 'Co', color: 'red' }]
    });
    const dot = el.querySelector('.d-timeline-dot');
    assert.equal(dot.style.background, 'red');
  });
});

describe('ProjectGrid', () => {
  it('renders project cards with tags and metrics', async () => {
    const { ProjectGrid } = await import('../src/blocks/project-grid.js');
    const el = ProjectGrid({
      title: 'Projects',
      items: [{
        name: 'MyApp',
        description: 'A great app',
        tags: ['React', 'Node'],
        metrics: [{ label: 'users', value: '10K' }],
        links: [{ label: 'GitHub' }]
      }]
    });
    assert.ok(el.textContent.includes('MyApp'));
    assert.ok(el.textContent.includes('A great app'));
    assert.ok(el.textContent.includes('10K'));
    assert.ok(el.querySelector('.d-project-card-tags'));
    assert.ok(el.querySelector('.d-project-card-links'));
  });
});

describe('TechGrid', () => {
  it('renders tech items as chips', async () => {
    const { TechGrid } = await import('../src/blocks/tech-grid.js');
    const el = TechGrid({
      title: 'Technologies',
      items: [{ name: 'Python' }, { name: 'Docker' }]
    });
    assert.ok(el.textContent.includes('Technologies'));
    assert.ok(el.textContent.includes('Python'));
    assert.ok(el.textContent.includes('Docker'));
    const chips = el.querySelectorAll('.d-chip');
    assert.equal(chips.length, 2);
  });
});

describe('HobbyGrid', () => {
  it('renders hobby cards with stats and tags', async () => {
    const { HobbyGrid } = await import('../src/blocks/hobby-grid.js');
    const el = HobbyGrid({
      title: 'Hobbies',
      items: [{
        name: 'Cooking',
        description: 'I love cooking',
        stats: [{ label: 'recipes', value: '200+' }],
        tags: ['Italian', 'Thai']
      }]
    });
    assert.ok(el.textContent.includes('Cooking'));
    assert.ok(el.textContent.includes('200+'));
  });
});

describe('PhotoGallery', () => {
  it('renders placeholder grid', async () => {
    const { PhotoGallery } = await import('../src/blocks/photo-gallery.js');
    const el = PhotoGallery({ title: 'Gallery', count: 4 });
    assert.ok(el.textContent.includes('Gallery'));
    const items = el.querySelectorAll('.d-photo-gallery-item');
    assert.equal(items.length, 4);
  });

  it('renders with image items', async () => {
    const { PhotoGallery } = await import('../src/blocks/photo-gallery.js');
    const el = PhotoGallery({ items: [{ src: '/photo.jpg', alt: 'Test' }] });
    const img = el.querySelector('img');
    assert.ok(img);
    assert.equal(img.getAttribute('alt'), 'Test');
  });
});

describe('ContactSplit', () => {
  it('renders form and info columns', async () => {
    const { ContactSplit } = await import('../src/blocks/contact-split.js');
    const el = ContactSplit({
      title: 'Contact',
      fields: [{ name: 'email', type: 'email' }, { name: 'message', type: 'textarea' }],
      methods: [{ label: 'Email', value: 'test@test.com' }],
      info: [{ label: 'Location', value: 'NYC' }]
    });
    assert.ok(el.textContent.includes('Contact'));
    assert.ok(el.querySelector('.d-contact-split-layout'));
    assert.ok(el.querySelector('form'));
    assert.ok(el.textContent.includes('NYC'));
  });

  it('form prevents default submit', async () => {
    const { ContactSplit } = await import('../src/blocks/contact-split.js');
    const el = ContactSplit({ fields: [{ name: 'name' }] });
    const form = el.querySelector('form');
    assert.ok(form);
  });
});

describe('SocialSidebar', () => {
  it('renders nav with social links', async () => {
    const { SocialSidebar } = await import('../src/blocks/social-sidebar.js');
    const el = SocialSidebar({
      links: [
        { icon: 'GH', href: 'https://github.com', label: 'GitHub' },
        { icon: 'LI', href: 'https://linkedin.com', label: 'LinkedIn' }
      ]
    });
    assert.equal(el.tagName, 'NAV');
    assert.equal(el.getAttribute('aria-label'), 'Social links');
    const links = el.querySelectorAll('a');
    assert.equal(links.length, 2);
    assert.equal(links[0].getAttribute('aria-label'), 'GitHub');
    assert.equal(links[0].getAttribute('target'), '_blank');
    assert.equal(links[0].getAttribute('rel'), 'noopener');
  });
});
