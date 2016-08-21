'use strict';

var selects = document.querySelectorAll('.select');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = selects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var select = _step.value;

    var selectList = select.querySelector('.list');
    var selectInput = select.querySelector('input');

    selectInput.addEventListener('focus', function (event) {
      var currentValue = document.querySelector('.select .list-item[data-value="' + this.value + '"]');
      currentValue.classList.add('selected');

      selectList.style.display = 'block';
      setListPostion(selectList, currentValue);
      if (selectList.scrollHeight > selectList.offsetHeight) {
        // If there is scroll-space
        selectList.scrollTop = currentValue.offsetTop;
      }
    });

    selectInput.addEventListener('keyup', function (event) {
      event.preventDefault();
    });

    selectInput.addEventListener('blur', function (event) {
      // Delay to prevent hide before click trigger
      setTimeout(function () {
        resetBackground(select);
        selectList.style.display = 'none';
      }, 100);
    });

    var listItems = selectList.querySelectorAll('.list-item');
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = listItems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var listItem = _step3.value;

        listItem.addEventListener('click', function (event) {
          resetBackground(select);
          selectInput.value = this.innerText;
          saveOptions();
          selectList.style.display = 'none';
        });
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
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

function resetBackground(select) {
  var listItems = select.querySelectorAll('.list-item');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = listItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var listItem = _step2.value;

      listItem.classList.remove('selected');
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
}

function setListPostion(selectList, option) {
  var newTop = parentIndex(option) * -option.offsetHeight - 21;
  selectList.style.top = newTop + 'px';
  if (selectList.getBoundingClientRect().top < selectList.closest('.options-window').getBoundingClientRect().top) {
    setListPostion(selectList, option.previousElementSibling);
  }
}

function parentIndex(element) {
  return [].indexOf.call(element.parentNode.children, element);
}
