'use strict';

serviceDataRefreshDone.then(function () {
  // Sort HTML based on array
  if (localStorage.getItem('serviceOrder')) {
    sortServices(document.querySelector('.panel-container'), document.querySelector('.bottom-bar-container'));
  }

  showActiveServices(serviceData);

  // Make images non-draggable
  var images = document.querySelectorAll('img');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var image = _step.value;

      image.setAttribute('draggable', true);
    }

    // Set settings button click action
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

  var settingsButton = document.querySelector('.settings-button');
  settingsButton.addEventListener('click', function (event) {
    chrome.tabs.create({
      'url': chrome.extension.getURL("options.html")
    });
  });

  var errorSettingsButtons = document.querySelectorAll('.error-settings-button');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = errorSettingsButtons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var errorSettingsButton = _step2.value;

      // console.log(serviceName);
      errorSettingsButton.addEventListener('click', function (event) {
        var serviceName = event.target.closest('.panel').getAttribute('id');
        chrome.tabs.create({
          'url': chrome.extension.getURL("options.html") + '#' + serviceName
        });
      });
    }

    // Error retry button call action
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

  var errorRetryButtons = document.querySelectorAll('.error-retry-button');
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = errorRetryButtons[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var errorRetryButton = _step3.value;

      errorRetryButton.addEventListener('click', function (event) {
        var refresh_button = event.target.closest('.panel').querySelector('.refresh-button');
        refresh_button.click();
      });
    }

    // Open all function
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

  var openAllButtons = document.querySelectorAll('.open-all');
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = openAllButtons[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var openAllButton = _step4.value;

      openAllButton.addEventListener('click', function (event) {
        var serviceId = event.target.closest('.bottom-bar-part').getAttribute('data-service-id'),
            servicePanel = document.querySelector('.panel[data-service-id="' + serviceId + '"]'),
            serviceLinks = servicePanel.querySelectorAll('.service-link');
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = serviceLinks[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var serviceLink = _step7.value;

            findHistory(serviceLink);
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }
      });
    }

    // Refresh button eventListener
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  var refreshButtons = document.querySelectorAll('.refresh-button');
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = refreshButtons[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var refreshButton = _step5.value;

      refreshButton.addEventListener('click', function (event) {
        var serviceKey = this.getAttribute('class').split(' ').filter(function (buttonClass) {
          return buttonClass != 'refresh-button' && buttonClass != 'waves-effect';
        })[0].replace('refresh-', '').toUpperCase();
        var serviceObject = serviceData[serviceKey];
        if (serviceObject.status) {
          var bgServiceObjects = getObjects(serviceObject, 'bgFunctionName', '');
          var refreshParams = [];
          bgServiceObjects.forEach(function (bgService) {
            var functionHash = { name: bgService.bgFunctionName };
            if (bgService.length) {
              functionHash.param = bgService.length;
            }
            refreshParams.push(functionHash);
          });

          refreshService(event, refreshParams);
        }
      });
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  echo.init({
    offset: 100,
    throttle: 250,
    unload: false
  });

  var panels = document.querySelectorAll('.panel');
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = panels[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var panel = _step6.value;

      panel.addEventListener('scroll', function () {
        echo.render();
      }, true);

      var panelContent = panel.querySelector('.panel-content');
      observeDOM(panelContent, function () {
        echo.render();
      });
    }

    // On storage change functions
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  window.addEventListener('storage', function (event) {
    var changedStorageKey = event.key;
    var serviceDataObject = getObjects(serviceData, 'htmlStorageKey', changedStorageKey);
    if (serviceDataObject.length > 0) {
      var storageFunctionName = serviceDataObject[0].feFunctionName;
      if (storageFunctionName) {
        chrome.runtime.sendMessage({ changedStorageKey: changedStorageKey, storageFunctionName: storageFunctionName });
      }
    }
  });
});

function observeDOM(obj, callback) {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
      eventListenerSupported = window.addEventListener;
  if (MutationObserver) {
    var obs = new MutationObserver(function (mutations, observer) {
      if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) callback();
    });
    obs.observe(obj, { childList: true, subtree: true });
  } else if (eventListenerSupported) {
    obj.addEventListener('DOMNodeInserted', callback, false);
    obj.addEventListener('DOMNodeRemoved', callback, false);
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  refreshServiceData();

  serviceDataRefreshDone.then(function () {
    if (request.changedStorageKey.indexOf('_error') != -1) {
      var panelId = request.changedStorageKey.replace('_error', '').toLowerCase();
      checkError(panelId, request.changedStorageKey);
      return;
    }

    if (request.storageFunctionName) {
      window[request.storageFunctionName]();
    }
  });
});

function findHistory(link) {
  var url = link.getAttribute('href');
  chrome.history.getVisits({ 'url': url }, function (data) {
    if (data.length === 0) {
      window.open(url);
    }
  });
}

// Show service that are on
function showActiveServices(serviceData) {
  var totalServiceWidth = 0,
      serviceStatus,
      serviceId,
      serviceInfo;

  for (var key in serviceData) {
    var serviceStatus = serviceData[key].status;
    if (serviceStatus) {
      var panelId = '#' + serviceData[key].containerId;
      var bottomBarClass = '.' + serviceData[key].containerId + '-info';
      var panelWidth = serviceData[key].panelWidth;
      var elements = document.querySelectorAll(panelId + ', ' + bottomBarClass);
      window[serviceData[key].feFunctionName]();
      totalServiceWidth += panelWidth || 400;
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = elements[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var element = _step8.value;

          element.style.width = panelWidth + 'px';
          element.style.display = 'block';
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }
  }

  document.querySelector('body').style.width = totalServiceWidth + 'px';
  document.querySelector('.bottom-bar-container').style.width = totalServiceWidth + 'px';
}

function sortServices(panelcontainer, bottomcontainer) {
  var serviceOrder = localStorage.getItem('serviceOrder').split(',');
  var serviceHTML;
  var serviceBottom;

  serviceOrder.forEach(function (serviceId) {
    serviceHTML = panelcontainer.querySelector('[data-service-id="' + serviceId + '"]');
    if (serviceHTML) {
      panelcontainer.appendChild(serviceHTML);
    }
    serviceBottom = bottomcontainer.querySelector('[data-service-id="' + serviceId + '"]');
    if (serviceBottom) {
      bottomcontainer.appendChild(serviceBottom);
    }
  });
}

// On refreshButton click
function refreshService(event, backgroundFunctions) {
  var panel = event.target.closest('.panel');
  var refreshButton = panel.querySelector('.refresh-button');
  var refreshRipple = refreshButton.querySelector('.waves-ripple');
  // To make sure the ripple isn't placed back after done
  if (refreshRipple) {
    refreshButton.removeChild(refreshRipple);
  }
  var refreshButtonHTML = refreshButton.innerHTML;
  panel.querySelector('.error').style.maxHeight = '0';
  replaceContent(refreshButton, serviceData.spinner).then(function () {
    runBackgroundFunction(backgroundFunctions, refreshButtonHTML).then(function () {
      replaceContent(refreshButton, refreshButtonHTML);
    });
  });
}

function runBackgroundFunction(backgroundFunctions) {
  return new Promise(function (resolve, reject) {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      backgroundFunctions.forEach(function (backgroundFunction) {
        var functionName = backgroundFunction.name;
        var param = backgroundFunction.param;
        if (param) {
          backgroundPage[functionName](param, function () {
            resolve();
          });
        } else {
          backgroundPage[functionName](function () {
            resolve();
          });
        }
      });
    });
  });
}

function checkError(panelId, storageKey) {
  var error = localStorage.getItem(storageKey);
  var errorWrapper = document.querySelector('#' + panelId + ' .error');

  if (error == "true") {
    errorWrapper.style.maxHeight = '120px';
  }
  if (error == "false") {
    errorWrapper.style.maxHeight = '0';
  }
}

function replaceContent(element, newContent) {
  return new Promise(function (resolve, reject) {
    var animationTime = 300;
    element.style.opacity = 0;
    setTimeout(function () {
      element.innerHTML = newContent;
      element.style.opacity = 1;
      setTimeout(function () {
        resolve();
      }, animationTime);
    }, animationTime);
  });
}
