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
  if (items.GC_status === true) {
    chrome.alarms.create('googleCalendar', {periodInMinutes: parseFloat(items.GC_refresh)});
  }
  if (items.GM_status === true) {
    chrome.alarms.create('gmail', {periodInMinutes: parseFloat(items.GM_refresh)});
  }
  if (items.FB_status === true) {
    chrome.alarms.create('facebook', {periodInMinutes: parseFloat(items.FB_refresh)});
  }
  if (items.CP_status === true) {
    chrome.alarms.create('couchPotato', {periodInMinutes: parseFloat(items.CP_refresh)});
  }
  if (items.SB_status === true) {
    chrome.alarms.create('sickBeard', {periodInMinutes: parseFloat(items.SB_refresh)});
  }
  if (items.SAB_status === true) {
    chrome.alarms.create('sabnzbdQueue', {periodInMinutes: parseFloat(items.SABQ_refresh)});
    chrome.alarms.create('sabnzbdHistory', {periodInMinutes: parseFloat(items.SABH_refresh)});
  }
  if (items.DN_status === true) {
    chrome.alarms.create('designerNews', {periodInMinutes: parseFloat(items.DN_refresh)});
  }
});

chrome.runtime.onStartup.addListener(function() {
  chrome.storage.sync.get({
    GC_status: '',
    GM_status: '',
    FB_status: '',
    CP_status: '',
    SB_status: '',
    SAB_status: '',
    DN_status: ''
  }, function(items) {
    if (items.GC_status === true) {
      getCalendarData();
    }
    if (items.GM_status === true) {
      getGmailData();
    }
    if (items.FB_status === true) {
      getFacebookData();
    }
    if (items.CP_status === true) {
      getCouchpotatoData();
    }
    if (items.SB_status === true) {
      getSickbeardData();
    }
    if (items.SAB_status === true) {
      getSabnzbdHistory();
      getSabnzbdQueue();
    }
    if (items.DN_status === true) {
      getDesignerNewsData();
    }
  });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'googleCalendar') {
    getCalendarData();
  }
  else if (alarm.name == 'gmail') {
    getGmailData();
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
