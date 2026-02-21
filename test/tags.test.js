import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createDOM } from '../src/test/dom.js';
import { tags } from '../src/tags/index.js';
import { createSignal } from '../src/state/index.js';

let cleanup;

before(() => {
  const env = createDOM();
  cleanup = env.cleanup;
});

after(() => {
  if (cleanup) cleanup();
});

const { div, span, p, h1, h2, button, input, section, a, ul, li, nav, form, label } = tags;

describe('tags proxy', () => {
  it('creates correct element tags', () => {
    assert.equal(div().tagName, 'DIV');
    assert.equal(span().tagName, 'SPAN');
    assert.equal(p().tagName, 'P');
    assert.equal(h1().tagName, 'H1');
    assert.equal(h2().tagName, 'H2');
    assert.equal(button().tagName, 'BUTTON');
    assert.equal(input().tagName, 'INPUT');
    assert.equal(section().tagName, 'SECTION');
    assert.equal(a().tagName, 'A');
    assert.equal(ul().tagName, 'UL');
    assert.equal(li().tagName, 'LI');
    assert.equal(nav().tagName, 'NAV');
    assert.equal(form().tagName, 'FORM');
    assert.equal(label().tagName, 'LABEL');
  });

  it('empty call returns empty element', () => {
    const el = div();
    assert.equal(el.tagName, 'DIV');
    assert.equal(el.childNodes.length, 0);
  });

  it('forwards props object', () => {
    const el = div({ id: 'test', class: 'card' });
    assert.equal(el.id, 'test');
    assert.equal(el.className, 'card');
  });

  it('forwards style object', () => {
    const el = div({ style: { color: 'red', fontSize: '14px' } });
    assert.equal(el.style.color, 'red');
    assert.equal(el.style.fontSize, '14px');
  });

  it('attaches event listeners via props', () => {
    let clicked = false;
    const el = button({ onclick: () => { clicked = true; } });
    el.dispatchEvent({ type: 'click', target: el });
    assert.equal(clicked, true);
  });

  it('string child without props', () => {
    const el = p('Hello world');
    assert.equal(el.textContent, 'Hello world');
    assert.equal(el.tagName, 'P');
  });

  it('multiple string children without props', () => {
    const el = p('Hello', ' ', 'world');
    assert.equal(el.textContent, 'Hello world');
  });

  it('string child with props', () => {
    const el = p({ class: 'text' }, 'Content');
    assert.equal(el.className, 'text');
    assert.equal(el.textContent, 'Content');
  });

  it('number child treated as child, not props', () => {
    const el = span(42);
    assert.equal(el.textContent, '42');
  });

  it('node child without props', () => {
    const inner = span('inner');
    const el = div(inner);
    assert.equal(el.childNodes.length, 1);
    assert.equal(el.childNodes[0].tagName, 'SPAN');
    assert.equal(el.childNodes[0].textContent, 'inner');
  });

  it('nested tags', () => {
    const el = div({ class: 'card' },
      h2('Title'),
      p('Content')
    );
    assert.equal(el.className, 'card');
    assert.equal(el.childNodes.length, 2);
    assert.equal(el.childNodes[0].tagName, 'H2');
    assert.equal(el.childNodes[0].textContent, 'Title');
    assert.equal(el.childNodes[1].tagName, 'P');
    assert.equal(el.childNodes[1].textContent, 'Content');
  });

  it('deeply nested tags', () => {
    const el = nav(
      ul(
        li(a({ href: '#' }, 'Link 1')),
        li(a({ href: '#' }, 'Link 2'))
      )
    );
    assert.equal(el.tagName, 'NAV');
    assert.equal(el.childNodes[0].tagName, 'UL');
    assert.equal(el.childNodes[0].childNodes.length, 2);
    assert.equal(el.childNodes[0].childNodes[0].textContent, 'Link 1');
  });

  it('reactive function child', () => {
    const [count, setCount] = createSignal(0);
    const el = p(() => `Count: ${count()}`);
    assert.equal(el.textContent, 'Count: 0');
    setCount(5);
    assert.equal(el.textContent, 'Count: 5');
  });

  it('function child with props', () => {
    const [val, setVal] = createSignal('a');
    const el = span({ class: 'reactive' }, () => val());
    assert.equal(el.className, 'reactive');
    assert.equal(el.textContent, 'a');
    setVal('b');
    assert.equal(el.textContent, 'b');
  });

  it('array first arg treated as child', () => {
    const items = [span('a'), span('b')];
    const el = div(items);
    assert.equal(el.childNodes.length, 2);
    assert.equal(el.childNodes[0].textContent, 'a');
    assert.equal(el.childNodes[1].textContent, 'b');
  });

  it('same proxy returns same function for same tag', () => {
    // Each access creates a new function, but they behave identically
    const el1 = tags.div('test');
    const el2 = tags.div('test');
    assert.equal(el1.tagName, el2.tagName);
    assert.equal(el1.textContent, el2.textContent);
  });

  it('any valid HTML tag works via proxy', () => {
    const el = tags.article({ class: 'post' }, 'Content');
    assert.equal(el.tagName, 'ARTICLE');
    assert.equal(el.className, 'post');
    assert.equal(el.textContent, 'Content');
  });
});
