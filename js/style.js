serviceDataRefreshDone.then(function() {
  // Sort HTML based on array
  if (localStorage.getItem('serviceOrder')) {
    sortServices(document.querySelector('.panel-container'), document.querySelector('.bottom-bar-container'));
  }

  showActiveServices(serviceData);

  // Make images non-draggable
  var images = document.querySelectorAll('img');
  for (var image of images) {
    image.setAttribute('draggable', true);
  }

  // Set settings button click action
  var settingsButton = document.querySelector('.settings-button')
  settingsButton.addEventListener('click', function(event) {
    chrome.tabs.create({
      'url': chrome.extension.getURL("options.html")
    });
  })

  var errorSettingsButtons = document.querySelectorAll('.error-settings-button')
  for (var errorSettingsButton of errorSettingsButtons) {
    // console.log(serviceName);
    errorSettingsButton.addEventListener('click', function(event) {
      var serviceName = event.target.closest('.panel').getAttribute('id');
      chrome.tabs.create({
        'url': chrome.extension.getURL("options.html") + '#' + serviceName
      });
    });
  }

  // Error retry button call action
  var errorRetryButtons = document.querySelectorAll('.error-retry-button')
  for (var errorRetryButton of errorRetryButtons) {
    errorRetryButton.addEventListener('click', function(event) {
      var refresh_button = event.target.closest('.panel').querySelector('.refresh-button');
      refresh_button.click();
    });
  }

  var panels = document.querySelectorAll('.panel')
  for(var panel of panels) {
    panel.addEventListener('scroll', function() {
      echo.render();
    }, true);

    var panelContent = panel.querySelector('.panel-content');
    observeDOM(panelContent, function(){
      echo.render();
    });
  }

  // On storage change functions
  window.addEventListener('storage', function (event) {
    var changedStorageKey = event.key;
    var serviceDataObject = getObjects(serviceData, 'htmlStorageKey', changedStorageKey);
    if (serviceDataObject.length > 0) {
      var storageFunctionName = serviceDataObject[0].feFunctionName;
      if (storageFunctionName) {
        chrome.runtime.sendMessage({changedStorageKey: changedStorageKey, storageFunctionName: storageFunctionName});
      }
    }
  });
});

function observeDOM(obj, callback) {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
  eventListenerSupported = window.addEventListener;
  if( MutationObserver ){
    var obs = new MutationObserver(function(mutations, observer){
      if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
        callback();
    });
    obs.observe(obj, { childList: true, subtree: true });
  }
  else if( eventListenerSupported ){
    obj.addEventListener('DOMNodeInserted', callback, false);
    obj.addEventListener('DOMNodeRemoved', callback, false);
  }
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  refreshServiceData();

  serviceDataRefreshDone.then(function() {
    if (request.changedStorageKey.indexOf('_error') != -1) {
      var panelId = request.changedStorageKey.replace('_error', '').toLowerCase();
      checkError(panelId, request.changedStorageKey);
      return;
    }

    if (request.storageFunctionName) {
      window[request.storageFunctionName]()
    }
  });
});

// Show service that are on
function showActiveServices(serviceData) {
  var totalServiceWidth = 0,
      serviceStatus,
      serviceId,
      serviceInfo;

  for(var key in serviceData) {
    var serviceStatus = serviceData[key].status;
    if (serviceStatus) {
      var panelId = '#' + serviceData[key].containerId;
      var bottomBarClass = '.' + serviceData[key].containerId + '-info';
      var panelWidth = serviceData[key].panelWidth;
      var elements = document.querySelectorAll(panelId + ', ' + bottomBarClass);
      window[serviceData[key].feFunctionName]();
      totalServiceWidth += panelWidth || 400;
      for (var element of elements) {
        element.style.width = panelWidth + 'px';
        element.style.display = 'block';
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

  serviceOrder.forEach(function(serviceId) {
    serviceHTML = panelcontainer.querySelector('[data-service-id="' + serviceId + '"]');
    if (serviceHTML) {
      panelcontainer.appendChild(serviceHTML);
    }
    serviceBottom = bottomcontainer.querySelector('[data-service-id="' + serviceId + '"]');
    if (serviceBottom) {
      bottomcontainer.appendChild(serviceBottom);
    }
  })
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
  replaceContent(refreshButton, serviceData.spinner).then(function() {
    runBackgroundFunction(backgroundFunctions, refreshButtonHTML).then(function() {
      replaceContent(refreshButton, refreshButtonHTML);
    });
  })
}

function runBackgroundFunction(backgroundFunctions) {
  return new Promise(function(resolve, reject) {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundFunctions.forEach(function(backgroundFunction) {
        var functionName = backgroundFunction.name;
        var param = backgroundFunction.param
        if (param) {
          backgroundPage[functionName](param, function() {
            resolve();
          });
        } else {
          backgroundPage[functionName](function() {
            resolve();
          });
        }
      })
    });
  })
}

function checkError(panelId, storageKey) {
  var error = localStorage.getItem(storageKey)
  var errorWrapper = document.querySelector('#' + panelId + ' .error');

  if (error == "true") {
    errorWrapper.style.maxHeight = '120px';
  }
  if (error == "false") {
    errorWrapper.style.maxHeight = '0';
  }
}

function replaceContent(element, newContent) {
  return new Promise(function(resolve, reject) {
    var animationTime = 300
    element.style.opacity = 0;
    setTimeout(function() {
      element.innerHTML = newContent;
      element.style.opacity = 1;
      setTimeout(function() {
        resolve();
      }, animationTime);
    }, animationTime);
  })
}
