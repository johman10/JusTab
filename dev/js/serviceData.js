refreshServiceData();

function refreshServiceData() {
  serviceDataRefreshDone = $.Deferred();

  chrome.storage.sync.get(function(items) {
    serviceData = {
      "spinner": "<div id='spinnerContainer'><div class='spinner-layer blue'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div><div class='spinner-layer red'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div><div class='spinner-layer yellow'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div><div class='spinner-layer green'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>",
      "GC": {
        "error": localStorage.getItem('Calendar_error'),
        "status": items.GC_status,
        "alarmName": 'googleCalendar',
        "refresh": parseFloat(items.GC_refresh),
        "bgFunctionName": 'getCalendarData',
        "feFunctionName": 'calenderShowEvents',
        "JSON": JSON.parse(localStorage.getItem('Calendar')),
        "HTML": localStorage.getItem('CalendarHTML'),
        "calendars": items.calendars,
        "days": parseFloat(items.GC_days)
      },
      "GM": {
        "error": localStorage.getItem('Gmail_error'),
        "status": items.GM_status,
        "alarmName": 'gmail',
        "refresh": parseFloat(items.GM_refresh),
        "bgFunctionName": 'getGmailData',
        "feFunctionName": 'GmailShowData',
        "JSON": JSON.parse(localStorage.getItem('Gmail')),
        "emails": new Array(items.GM_emails),
        "ReadHTML": localStorage.getItem('GmailReadHTML'),
        "UnreadHTML": localStorage.getItem('GmailUnreadHTML'),
        "nextPage": localStorage.getItem('Gmail_page')
      },
      "FB": {
        "error": localStorage.getItem('Facebook_error'),
        "status": items.FB_status,
        "alarmName": 'facebook',
        "refresh": parseFloat(items.FB_refresh),
        "bgFunctionName": 'getFacebookData',
        "feFunctionName": 'fbShowData',
        "JSON": $.parseXML(localStorage.getItem('Facebook')),
        "url": items.FB_url,
        "HTML": localStorage.getItem('FacebookHTML')
      },
      "CPS": {
        "error": localStorage.getItem('CouchpotatoSnatched_error'),
        "status": items.CP_status,
        "alarmName": 'couchPotatoSnatched',
        "refresh": parseFloat(items.CP_refresh),
        "bgFunctionName": 'getSnatchedCouchPotato',
        "feFunctionName": 'cpShowData',
        "JSON": JSON.parse(localStorage.getItem('CouchpotatoSnatched')),
        "HTML": localStorage.getItem('CouchpotatoSnatchedHTML'),
        "apiUrl": items.CP_address + ":" + items.CP_port + "/api/" + items.CP_key + "/",
        "url": items.CP_address + ":" + items.CP_port,
        "address": items.CP_address,
        "port": items.CP_port,
        "key": items.CP_key
      },
      "CPW": {
        "error": localStorage.getItem('CouchpotatoWanted_error'),
        "status": items.CP_status,
        "alarmName": 'couchPotatoWanted',
        "refresh": parseFloat(items.CP_refresh),
        "bgFunctionName": 'getWantedCouchPotato',
        "feFunctionName": 'cpShowData',
        "JSON": JSON.parse(localStorage.getItem('CouchpotatoWanted')),
        "HTML": localStorage.getItem('CouchpotatoWantedHTML'),
        "apiUrl": items.CP_address + ":" + items.CP_port + "/api/" + items.CP_key + "/",
        "url": items.CP_address + ":" + items.CP_port,
        "address": items.CP_address,
        "port": items.CP_port,
        "key": items.CP_key
      },
      "SB": {
        "error": localStorage.getItem('Sickbeard_error'),
        "status": items.SB_status,
        "alarmName": 'sickBeard',
        "refresh": parseFloat(items.SB_refresh),
        "bgFunctionName": 'getSickBeardData',
        "feFunctionName": 'sbShowData',
        "JSON": JSON.parse(localStorage.getItem('Sickbeard')),
        "MissedHTML": localStorage.getItem('SickbeardMissedHTML'),
        "TodayHTML": localStorage.getItem('SickbeardTodayHTML'),
        "SoonHTML": localStorage.getItem('SickbeardSoonHTML'),
        "LaterHTML": localStorage.getItem('SickbeardLaterHTML'),
        "apiUrl": items.SB_address + ":" + items.SB_port + "/api/" + items.SB_key + "/",
        "url": items.SB_address + ":" + items.SB_port,
        "address": items.SB_address,
        "port": items.SB_port,
        "key": items.SB_key
      },
      "SABQ": {
        "error": localStorage.getItem('SabnzbdQueue_error'),
        "status": items.SAB_status,
        "alarmName": 'sabnzbdQueue',
        "refresh": parseFloat(items.SABQ_refresh),
        "bgFunctionName": 'getSabnzbdQueue',
        "feFunctionName": 'sabShowData',
        "JSON": JSON.parse(localStorage.getItem('SabnzbdQueue')),
        "HTML": localStorage.getItem('SabnzbdQueueHTML'),
        "url": items.SAB_address + ":" + items.SAB_port,
        "apiUrl": items.SAB_address + ":" + items.SAB_port + "/sabnzbd/api?apikey=" + items.SAB_key,
        "downloadStatus": localStorage.getItem('SabnzbdStatusHTML'),
        "address": items.SAB_address,
        "port": items.SAB_port,
        "key": items.SAB_key
      },
      "SABH": {
        "error": localStorage.getItem('SabnzbdHistory_error'),
        "status": items.SAB_status,
        "alarmName": 'sabnzbdHistory',
        "refresh": parseFloat(items.SABH_refresh),
        "bgFunctionName": 'getSabnzbdHistory',
        "feFunctionName": 'sabShowData',
        "JSON": JSON.parse(localStorage.getItem('SabnzbdHistory')),
        "HTML": localStorage.getItem('SabnzbdHistoryHTML'),
        "url": items.SAB_address + ":" + items.SAB_port,
        "apiUrl": items.SAB_address + ":" + items.SAB_port + "/sabnzbd/api?apikey=" + items.SAB_key,
        "length": items.SAB_history,
        "address": items.SAB_address,
        "port": items.SAB_port,
        "key": items.SAB_key
      },
      "DN": {
        "error": localStorage.getItem('Designernews_error'),
        "status": items.DN_status,
        "alarmName": 'designerNews',
        "refresh": parseFloat(items.DN_refresh),
        "bgFunctionName": 'getDesignerNewsData',
        "feFunctionName": 'dnShowData',
        "JSON": JSON.parse(localStorage.getItem('Designernews')),
        "HTML": localStorage.getItem('DesignernewsHTML')
      },
      "HN": {
        "error": localStorage.getItem('Hackernews_error'),
        "status": items.HN_status,
        "alarmName": 'hackernews',
        "refresh": parseFloat(items.HN_refresh),
        "bgFunctionName": 'getHackerNewsData',
        "feFunctionName": 'hnShowData',
        "IDs": localStorage.getItem('HackernewsIDs'),
        "JSON": JSON.parse(localStorage.getItem('Hackernews')),
        "HTML": localStorage.getItem('HackernewsHTML')
      },
      "GH": {
        "error": localStorage.getItem('Github_error'),
        "status": items.GH_status,
        "alarmName": 'github',
        "refresh": parseFloat(items.GH_refresh),
        "bgFunctionName": 'getGithubData',
        "feFunctionName": 'ghShowData',
        "JSON": $.parseXML(localStorage.getItem('Github')),
        "HTML": localStorage.getItem('GithubHTML')
      }
    };
    serviceDataRefreshDone.resolve();
  });
}