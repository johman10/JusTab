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

  // Get accesstoken from DesignerNews
  url = "https://api-news.layervault.com/oauth/token";
  apiCall = "?grant_type=password&username=" + serviceData.DN.username + "&password=" + serviceData.DN.password;
  $.ajax({
    url: url + apiCall,
    type: 'POST',
  })
  .done(function(data) {
    localStorage.setItem('DesignernewsToken', "Bearer " + data.access_token);
    serviceData.DN.token = "Bearer " + data.access_token;
  })
  .fail(function(xhr, ajaxOptions, thrownError) {
    console.log(xhr, ajaxOptions, thrownError);
  });
});

chrome.runtime.onInstalled.addListener(function(event) {
  if (event.reason == "install") {
    openOptions();
  }
  else if (event.reason == "update") {
    var newVersion = chrome.runtime.getManifest().version;
    createNotificaton(
      { type: "basic",
        title: "JusTab is updated",
        message: "Go to support within the options page for more info about this update.",
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
    'url': chrome.extension.getURL("options.html")
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