chrome.storage.sync.get({
  GC_refresh: '',
  FB_refresh: '',
  CP_refresh: '',
  SB_refresh: '',
  SABQ_refresh: '',
  SABH_refresh: '',
  DN_refresh: ''
}, function(items) {
  chrome.alarms.create('googleCalendar', {periodInMinutes: items.GC_refresh});
  chrome.alarms.create('facebook', {periodInMinutes: items.FB_refresh});
  chrome.alarms.create('couchPotato', {periodInMinutes: items.CP_refresh});
  chrome.alarms.create('sickBeard', {periodInMinutes: items.SB_refresh});
  chrome.alarms.create('sabnzbdQueue', {periodInMinutes: items.SABQ_refresh});
  chrome.alarms.create('sabnzbdHistory', {periodInMinutes: items.SABH_refresh});
  chrome.alarms.create('designerNews', {periodInMinutes: items.DN_refresh});
});

chrome.runtime.onStartup.addListener(
  getCouchPotatoData(),
  getFacebookData(),
  getSickBeardData(),
  getSabnzbdHistory(),
  getSabnzbdQueue(),
  getDesignerNewsData(),
  getCalendarData()
);

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'googleCalendar') {
    getCalendarData();
  }
  else if (alarm.name == 'facebook') {
    getFacebookData();
  }
  else if (alarm.name == 'couchPotato') {
    getCouchPotatoData();
  }
  else if (alarm.name == 'sickBeard') {
    getSickBeardData();
  }
  else if (alarm.name == 'sabnzbdQueue') {
    getSabnzbdQueue();
  }
  else if (alarm.name == 'sabnzbdHistory') {
    getSabnzbdHistory();
  }
  else if (alarm.name == 'designerNews') {
    getDesignerNewsData();
  }
});
