$.when(serviceDataRefreshDone).done(function() {
  chrome.runtime.onStartup.addListener(function() {
    chrome.alarms.clearAll(function() {
      $.each(serviceData, function(index, val) {
        if (val.status && val.containerId == "sabnzbd") {
          chrome.alarms.create(val.queue.alarmName, {periodInMinutes: val.queue.refresh});
          chrome.alarms.create(val.history.alarmName, {periodInMinutes: val.history.refresh});
        }
        else if (val.status && val.containerId == "couchpotato") {
          chrome.alarms.create(val.snatched.alarmName, {periodInMinutes: val.refresh});
          chrome.alarms.create(val.wanted.alarmName, {periodInMinutes: val.refresh});
        }
        else if (val.status) {
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
});

chrome.runtime.onInstalled.addListener(function(event) {
  if (event.reason == "install") {
    openOptions();
  }
  else if (event.reason == "update") {
    createNotificaton(
      { type: "basic",
        title: "JusTab is updated",
        message: "Click here to see the changelog.",
        iconUrl: "../../img/app_icons/JusTab-128x128.png"
      },
      chrome.notifications.onClicked.addListener(function() {
        openOptions();
      })
    );
  }
});

function openOptions() {
  chrome.tabs.create({
    'url': chrome.extension.getURL("options.html") + '#support'
  });
}

function createNotificaton(options, callback) {
  if (!callback) {
    callback = function() {};
  }

  chrome.notifications.create(getNotificationId(), options, callback);
}

function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}
