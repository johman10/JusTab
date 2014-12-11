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
  if (items.GC_status == true) {
    chrome.alarms.create('googleCalendar', {periodInMinutes: parseFloat(items.GC_refresh)});
  }
  if (items.GM_status == true) {
    chrome.alarms.create('gmail', {periodInMinutes: parseFloat(items.GM_refresh)});
  }
  if (items.FB_status == true) {
    chrome.alarms.create('facebook', {periodInMinutes: parseFloat(items.FB_refresh)});
  }
  if (items.CP_status == true) {
    chrome.alarms.create('couchPotato', {periodInMinutes: parseFloat(items.CP_refresh)});
  }
  if (items.SB_status == true) {
    chrome.alarms.create('sickBeard', {periodInMinutes: parseFloat(items.SB_refresh)});
  }
  if (items.SAB_status == true) {
    chrome.alarms.create('sabnzbdQueue', {periodInMinutes: parseFloat(items.SABQ_refresh)});
    chrome.alarms.create('sabnzbdHistory', {periodInMinutes: parseFloat(items.SABH_refresh)});
  }
  if (items.DN_status == true) {
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
    if (items.GC_status == true) {
      console.log('Startup GC_status');
      getCalendarData();
    }
    if (items.GM_status == true) {
      console.log('Startup GM_status');
      getGmailData();
    }
    if (items.FB_status == true) {
      console.log('Startup FB_status');
      getFacebookData();
    }
    if (items.CP_status == true) {
      console.log('Startup CP_status');
      getCouchpotatoData();
    }
    if (items.SB_status == true) {
      console.log('Startup SB_status');
      getSickbeardData();
    }
    if (items.SAB_status == true) {
      console.log('Startup SAB_status');
      getSabnzbdHistory();
      getSabnzbdQueue();
    }
    if (items.DN_status == true) {
      console.log('Startup DN_status');
      getDesignerNewsData();
    }
  });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'googleCalendar') {
    console.log(alarm.name);
    getCalendarData();
  }
  else if (alarm.name == 'gmail') {
    console.log(alarm.name);
    getGmailData();
  }
  else if (alarm.name == 'facebook') {
    console.log(alarm.name);
    getFacebookData();
  }
  else if (alarm.name == 'couchPotato') {
    console.log(alarm.name);
    getCouchPotatoData();
  }
  else if (alarm.name == 'sickBeard') {
    console.log(alarm.name);
    getSickBeardData();
  }
  else if (alarm.name == 'sabnzbdQueue') {
    console.log(alarm.name);
    getSabnzbdQueue();
  }
  else if (alarm.name == 'sabnzbdHistory') {
    console.log(alarm.name);
    getSabnzbdHistory();
  }
  else if (alarm.name == 'designerNews') {
    console.log(alarm.name);
    getDesignerNewsData();
  }
});
