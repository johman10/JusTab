Element.prototype.closest = function (selectors) {
  // https://dom.spec.whatwg.org/#dom-element-closest
  let el = this;
  while (el.nodeType === 1) {
    if (Element.prototype.matches.call(el, selectors)) {
      return el;
    }
    el = el.parentNode;
  }
  return null;
};
