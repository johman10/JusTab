'use strict';

document.querySelector('body').addEventListener('click', function (event) {
  var coreItem = event.target.closest('.core-item');
  if (coreItem) {
    var collapseItem = coreItem.nextSibling;
    var expanded = coreItem.classList.contains('expanded');
    var coreItemIcon = coreItem.querySelector('.core-item-icon');

    if (collapseItem.classList.contains('core-collapse')) {
      var allCoreItems = document.querySelectorAll('.core-item.expanded');
      var allCoreCollapse = document.querySelectorAll('.core-collapse.expanded');

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = allCoreItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var loopCoreItem = _step.value;

          loopCoreItem.classList.remove('expanded');
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

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = allCoreCollapse[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var loopCoreCollapse = _step2.value;

          loopCoreCollapse.classList.remove('expanded');
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (!expanded) {
        coreItem.classList.add('expanded');
        collapseItem.classList.add('expanded');
      }
    }
  }
});
