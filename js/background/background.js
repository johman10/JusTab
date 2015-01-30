chrome.storage.sync.get({
  GC_status: '',
  GC_refresh: '',
  GM_status: '',
  GM_refresh: '',
  FB_status: '',
  FB_refresh: '',
  CP_status: '',
  CP_refresh: '',
  SB_status: '',
  SB_refresh: '',
  SAB_status: '',
  SABQ_refresh: '',
  SABH_refresh: '',
  DN_status: '',
  DN_refresh: ''
}, function(items) {
  chrome.alarms.clearAll();

  $.each(serviceData, function(index, val) {
    if (val.status) {
      chrome.alarms.create(val.alarmName, {periodInMinutes: val.refresh});
    }
  });

  chrome.windows.onCreated.addListener(function() {
    console.log('Startup functions...');

    $.each(serviceData, function(index, val) {
      if (val.status) {
        window[val.bgFunctionName]();
      }
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