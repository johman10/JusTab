serviceDataDone.done(function() {
  chrome.alarms.clearAll();

  $.each(serviceData, function(index, val) {
    if (val.status) {
      chrome.alarms.create(val.alarmName, {periodInMinutes: val.refresh});
    }
  });

  // chrome.windows.onCreated.addListener(function() {
  //   console.log('Startup functions...');

  //   $.each(serviceData, function(index, val) {
  //     if (val.status) {
  //       window[val.bgFunctionName]();
  //     }
  //   });
  // });

  chrome.alarms.onAlarm.addListener(function(alarm) {
    $.each(serviceData, function(index, val) {
      if (val.alarmName == alarm.name) {
        window[val.bgFunctionName]();
      }
    });
  });
});