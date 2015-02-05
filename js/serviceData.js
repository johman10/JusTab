refreshServiceData();

function refreshServiceData() {
  console.log('refresh');
  serviceDataRefreshDone = $.Deferred();
  serviceData = chrome.extension.getBackgroundPage().serviceData;
  serviceDataRefreshDone.resolve();
}