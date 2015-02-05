refreshServiceData();

function refreshServiceData() {
  serviceDataRefreshDone = $.Deferred();
  serviceData = chrome.extension.getBackgroundPage().serviceData;
  serviceDataRefreshDone.resolve();
}