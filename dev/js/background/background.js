$.when(serviceDataRefreshDone).done(function() {
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

  // chrome.runtime.onInstalled.addListener(function(event) {
  //   alert(event);
  // });
});

function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  console.log(id.toString());
  return id.toString();
}

function createNotificaton(options) {
  chrome.notifications.create(getNotificationId(), options);
}