chrome.alarms.create('other', {periodInMinutes: 15});
chrome.alarms.create('sabnzbdQueue', {periodInMinutes: 1});

chrome.runtime.onStartup.addListener(
  getCouchPotatoData(),
  getSickBeardData(),
  getSabnzbdHistory(),
  getSabnzbdQueue(),
  getDesignerNewsData(),
  getCalendarData()
);

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'sabnzbdQueue') {
    getSabnzbdQueue();
  }
  else {
    getCouchPotatoData();
    getSickBeardData();
    getSabnzbdHistory();
    getDesignerNewsData();
    getCalendarData();
  }
});
