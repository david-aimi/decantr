import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createDOM } from '../src/test/dom.js';

let cleanup;

before(() => {
  const env = createDOM();
  cleanup = env.cleanup;
});

after(() => {
  if (cleanup) cleanup();
});

describe('kit/content', () => {
  it('exports all content components', async () => {
    const mod = await import('../src/kit/content/index.js');
    assert.ok(typeof mod.ArticleLayout === 'function', 'ArticleLayout exported');
    assert.ok(typeof mod.AuthorCard === 'function', 'AuthorCard exported');
    assert.ok(typeof mod.TableOfContents === 'function', 'TableOfContents exported');
    assert.ok(typeof mod.PostList === 'function', 'PostList exported');
    assert.ok(typeof mod.CategoryNav === 'function', 'CategoryNav exported');
  });

  it('PostList renders post cards', async () => {
    const { PostList } = await import('../src/kit/content/post-list.js');
    const el = PostList({
      posts: [
        { title: 'Post 1', excerpt: 'Excerpt 1', date: '2026-01-01' },
        { title: 'Post 2', excerpt: 'Excerpt 2', date: '2026-01-02' }
      ]
    });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('Post 1'));
    assert.ok(el.textContent.includes('Post 2'));
  });

  it('AuthorCard renders name and bio', async () => {
    const { AuthorCard } = await import('../src/kit/content/author-card.js');
    const el = AuthorCard({ name: 'Jane Doe', bio: 'A writer.' });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('Jane Doe'));
    assert.ok(el.textContent.includes('A writer'));
  });

  it('CategoryNav renders categories', async () => {
    const { CategoryNav } = await import('../src/kit/content/category-nav.js');
    const el = CategoryNav({
      categories: [
        { id: 'all', label: 'All' },
        { id: 'tech', label: 'Tech' }
      ]
    });
    assert.ok(el && el.nodeType === 1);
    assert.equal(el.tagName, 'NAV');
    assert.ok(el.textContent.includes('All'));
    assert.ok(el.textContent.includes('Tech'));
  });

  it('TableOfContents renders heading links', async () => {
    const { TableOfContents } = await import('../src/kit/content/table-of-contents.js');
    const el = TableOfContents({
      headings: [
        { id: 'intro', text: 'Introduction', level: 2 },
        { id: 'setup', text: 'Setup', level: 2 }
      ]
    });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('Introduction'));
  });

  it('ArticleLayout renders with title', async () => {
    const { ArticleLayout } = await import('../src/kit/content/article-layout.js');
    const el = ArticleLayout({ title: 'Test Article', date: '2026-01-01' });
    assert.ok(el && el.nodeType === 1);
    assert.ok(el.textContent.includes('Test Article'));
  });
});
