import { h, css, injectBase, cx, resolve } from '../_shared.js';
import { AuthorCard } from './author-card.js';
import { TableOfContents } from './table-of-contents.js';

/**
 * Article page layout with optional sidebar.
 * @param {Object} [props]
 * @param {string|Function} [props.title] - Article heading
 * @param {Object} [props.author] - { name, avatar, bio } for AuthorCard
 * @param {string|Function} [props.date] - Publication date string
 * @param {Node|string} [props.content] - Article body (Node or string)
 * @param {Array<{id: string, text: string, level: number}>} [props.toc] - Headings for TableOfContents
 * @param {string} [props.class]
 * @param {...Node} children
 * @returns {HTMLElement}
 */
export function ArticleLayout(props = {}, ...children) {
  injectBase();

  const { title, author, date, content, toc, class: cls } = props;

  const resolvedTitle = resolve(title);
  const resolvedDate = resolve(date);
  const hasToc = toc && toc.length > 0;

  // Article header: title + date
  const headerParts = [];

  if (resolvedTitle) {
    headerParts.push(
      h('h1', {
        class: css('_t32 _bold _fg3 _mb2'),
        style: 'line-height:1.2'
      }, resolvedTitle)
    );
  }

  if (resolvedDate) {
    headerParts.push(
      h('time', {
        class: css('_t14 _fg4 _block _mb4'),
        datetime: resolvedDate
      }, resolvedDate)
    );
  }

  const header = h('header', { class: css('_mb6') }, ...headerParts);

  // Author section
  const authorEl = author
    ? h('div', { class: css('_mb6') }, AuthorCard(author))
    : null;

  // Content body
  const bodyParts = [];
  if (typeof content === 'string') {
    bodyParts.push(h('div', {
      class: css('_fg3 _lh175'),
      style: 'font-size:1.0625rem'
    }, content));
  } else if (content && content.nodeType) {
    bodyParts.push(content);
  }

  // Append extra children
  for (const child of children) {
    if (child && typeof child === 'object' && child.nodeType) {
      bodyParts.push(child);
    } else if (typeof child === 'string') {
      bodyParts.push(h('p', { class: css('_fg3 _lh175') }, child));
    }
  }

  const mainContent = h('div', { class: css('_flex1 _minw0') },
    header,
    authorEl,
    ...bodyParts
  );

  // Build layout: two-column with sidebar when toc, single column otherwise
  if (hasToc) {
    const sidebar = h('aside', {
      class: css('_shrink0'),
      style: 'width:240px',
      'aria-label': 'Article sidebar'
    },
      TableOfContents({ headings: toc })
    );

    return h('article', {
      class: cx(css('_flex _gap8 _ctrlg _mxa _py8 _px4'), cls)
    },
      mainContent,
      sidebar
    );
  }

  return h('article', {
    class: cx(css('_ctr _mxa _py8 _px4'), cls)
  },
    mainContent
  );
}
