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
  var serviceData = [
    {status: items.GC_status, alarmName: 'googleCalendar', refresh: items.GC_refresh, functionName: getCalendarData},
    {status: items.GM_status, alarmName: 'gmail', refresh: items.GM_refresh, functionName: getGmailData},
    {status: items.FB_status, alarmName: 'facebook', refresh: items.FB_refresh, functionName: getFacebookData},
    {status: items.CP_status, alarmName: 'couchPotatoWanted', refresh: items.CP_refresh, functionName: getWantedCouchPotato},
    {status: items.CP_status, alarmName: 'couchPotatoSnatched', refresh: items.CP_refresh, functionName: getSnatchedCouchPotato},
    {status: items.SB_status, alarmName: 'sickBeard', refresh: items.SB_refresh, functionName: getSickBeardData},
    {status: items.SAB_status, alarmName: 'sabnzbdQueue', refresh: items.SABQ_refresh, functionName: getSabnzbdQueue},
    {status: items.SAB_status, alarmName: 'sabnzbdHistory', refresh: items.SABH_refresh, functionName: getSabnzbdHistory},
    {status: items.DN_status, alarmName: 'designerNews', refresh: items.DN_refresh, functionName: getDesignerNewsData},
  ];

  $.each(serviceData, function(index, val) {
    if (val.status) {
      chrome.alarms.create(val.alarmName, {periodInMinutes: parseFloat(val.refresh)});
    }
  });

  chrome.windows.onCreated.addListener(function() {
    console.log('Startup functions...');

    dnAuthToken();

    $.each(serviceData, function(index, val) {
      if (val.status) {
        val.functionName();
      }
    });
  });

  chrome.alarms.onAlarm.addListener(function(alarm) {
    var alarmFunctions = {
      'googleCalendar': getCalendarData,
      'gmail': getGmailData,
      'facebook': getFacebookData,
      'couchPotatoWanted': getWantedCouchPotato,
      'couchPotatoSnatched': getSnatchedCouchPotato,
      'sickBeard': getSickBeardData,
      'sabnzbdQueue': getSabnzbdQueue,
      'sabnzbdHistory': getSabnzbdHistory,
      'designerNews': getDesignerNewsData
    };

    if (alarmFunctions[alarm.name]) {
      alarmFunctions[alarm.name]();
    }
  });
});