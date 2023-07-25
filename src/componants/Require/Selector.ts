export default class SelectorCls {
  constructor(selector) {
    this.selector = selector;
    this.notSelectors = [];
  }

  not(...ids) {
    this.notSelectors = [...this.notSelectors, ...ids];
    return this;
  }

  use() {
    const notSelectorsStr = this.notSelectors.map(id => `:not(${id})`).join('')
    return `${this.selector}${notSelectorsStr}`
  }

  static q(selector) {
    return document.querySelector(selector);
  }
}

export const Selector = (selector) => new SelectorCls(selector);
