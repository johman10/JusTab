"use strict";

function refreshBackgroundServiceData() {
  return new Promise(function (resolve, reject) {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      backgroundPage.refreshServiceData();
      backgroundPage.serviceDataRefreshDone.then(function () {
        resolve(backgroundPage);
      });
    });
  });
}
