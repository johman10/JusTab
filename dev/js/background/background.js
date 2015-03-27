chrome.runtime.onStartup.addListener(function() {
  serviceDataRefreshDone.done(function() {
    chrome.alarms.clearAll();

    $.each(serviceData, function(index, val) {
      if (val.status) {
        chrome.alarms.create(val.alarmName, {periodInMinutes: val.refresh});
      }
    });
  });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  $.each(serviceData, function(index, val) {
    if (val.alarmName == alarm.name) {
      window[val.bgFunctionName]();
    }
  });
});