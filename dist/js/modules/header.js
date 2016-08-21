'use strict';

var headers = document.querySelectorAll('.panel-content');

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = headers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var header = _step.value;

    header.addEventListener('scroll', function (event) {
      var panelContent = event.target,
          scrollTop = panelContent.scrollTop,
          panelHeader = panelContent.previousElementSibling,
          topBar = panelHeader.querySelector('.top'),
          panelBackground = panelHeader.querySelector('.panel-header-background2'),
          opacity = 1 - scrollTop * (1 / 64);

      if (scrollTop < 64) {
        panelHeader.style.height = 128 - scrollTop + 'px';
        topBar.style.height = 64 - scrollTop + 'px';
        topBar.style.opacity = opacity;
        panelBackground.style.opacity = opacity;
        topBar.style.display = 'block';
        panelBackground.style.display = 'block';
      } else {
        panelHeader.style.height = 64 + 'px';
        topBar.style.height = 0 + 'px';
        topBar.style.display = 'none';
        panelBackground.style.display = 'none';
      }
    });
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}
