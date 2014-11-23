chrome.storage.sync.get({
  GC_refresh: '',
  GM_refresh: '',
  FB_refresh: '',
  CP_refresh: '',
  SB_refresh: '',
  SABQ_refresh: '',
  SABH_refresh: '',
  DN_refresh: ''
}, function(items) {
  chrome.alarms.create('googleCalendar', {periodInMinutes: parseFloat(items.GC_refresh)});
  // chrome.alarms.create('gmail', {periodInMinutes: parseFloat(items.GM_refresh)});
  chrome.alarms.create('facebook', {periodInMinutes: parseFloat(items.FB_refresh)});
  chrome.alarms.create('couchPotato', {periodInMinutes: parseFloat(items.CP_refresh)});
  chrome.alarms.create('sickBeard', {periodInMinutes: parseFloat(items.SB_refresh)});
  chrome.alarms.create('sabnzbdQueue', {periodInMinutes: parseFloat(items.SABQ_refresh)});
  chrome.alarms.create('sabnzbdHistory', {periodInMinutes: parseFloat(items.SABH_refresh)});
  chrome.alarms.create('designerNews', {periodInMinutes: parseFloat(items.DN_refresh)});
});

chrome.runtime.onStartup.addListener(
  getCalendarData(),
  // getGmailData(),
  getFacebookData(),
  getCouchPotatoData(),
  getSickBeardData(),
  getSabnzbdHistory(),
  getSabnzbdQueue(),
  getDesignerNewsData()
);

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'googleCalendar') {
    getCalendarData();
  }
  // else if (alarm.name == 'gmail') {
  //   getGmailData();
  // }
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
