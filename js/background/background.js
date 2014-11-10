chrome.alarms.create('other', {periodInMinutes: 15});
chrome.alarms.create('sabnzbdQueue', {periodInMinutes: 1});

chrome.runtime.onStartup.addListener(
  getCouchPotatoData(),
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
    getSabnzbdHistory();
    getDesignerNewsData();
    getCalendarData();
  }
});
