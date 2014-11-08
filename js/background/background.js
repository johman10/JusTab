chrome.alarms.create('other', {periodInMinutes: 15});
chrome.alarms.create('sabnzbdQueue', {periodInMinutes: 1});

chrome.runtime.onStartup.addListener(
  getCouchPotatoData(),
  getCalendarData(),
  getSabnzbdHistory(),
  getSabnzbdQueue(),
  getDesignerNewsData()
);

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'sabnzbdQueue') {
    getSabnzbdQueue();
  }
  else {
    getCouchPotatoData();
    getCalendarData();
    getSabnzbdHistory();
    getDesignerNewsData();
  }
});
