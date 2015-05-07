$(document).ready(refreshServiceData());

function refreshServiceData() {

  // I'm probably gonna need this little fallback for if there is no array of votes
  if (!localStorage.getItem('DesigernewsUpvotes')) {
    localStorage.setItem('DesigernewsUpvotes', []);
  }

  serviceDataRefreshDone = $.Deferred();

  chrome.storage.sync.get(function(items) {
    serviceData = {
      "spinner": "<div id='spinnerContainer'><div class='spinner-layer blue'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div><div class='spinner-layer red'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div><div class='spinner-layer yellow'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div><div class='spinner-layer green'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>",
      "GC": {
        "error": localStorage.getItem('Calendar_error'),
        "status": items.GC_status,
        "alarmName": 'googleCalendar',
        "refresh": isNaN(parseFloat(items.GC_refresh)) ? 15 : parseFloat(items.GC_refresh),
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
        "refresh": isNaN(parseFloat(items.GM_refresh)) ? 15 : parseFloat(items.GM_refresh),
        "bgFunctionName": 'getGmailData',
        "feFunctionName": 'GmailShowData',
        "JSON": JSON.parse(localStorage.getItem('Gmail')),
        // "emails": items.GM_emails.replace(/\s+/g, '').split(","),
        "ReadHTML": localStorage.getItem('GmailReadHTML'),
        "UnreadHTML": localStorage.getItem('GmailUnreadHTML'),
        "nextPage": localStorage.getItem('Gmail_page')
      },
      "FB": {
        "error": localStorage.getItem('Facebook_error'),
        "status": items.FB_status,
        "alarmName": 'facebook',
        "refresh": isNaN(parseFloat(items.FB_refresh)) ? 15 : parseFloat(items.FB_refresh),
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
        "refresh": isNaN(parseFloat(items.CP_refresh)) ? 15 : parseFloat(items.CP_refresh),
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
        "refresh": isNaN(parseFloat(items.CP_refresh)) ? 15 : parseFloat(items.CP_refresh),
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
        "refresh": isNaN(parseFloat(items.SB_refresh)) ? 15 : parseFloat(items.SB_refresh),
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
        "refresh": isNaN(parseFloat(items.SABQ_refresh)) ? 15 : parseFloat(items.SABQ_refresh),
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
        "refresh": isNaN(parseFloat(items.SABH_refresh)) ? 15 : parseFloat(items.SABH_refresh),
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
        "refresh": isNaN(parseFloat(items.DN_refresh)) ? 15 : parseFloat(items.DN_refresh),
        "bgFunctionName": 'getDesignerNewsData',
        "feFunctionName": 'dnShowData',
        "JSON": JSON.parse(localStorage.getItem('Designernews')),
        "HTML": localStorage.getItem('DesignernewsHTML'),
        "username": items.DN_username,
        "password": items.DN_password,
        "token": localStorage.getItem('DesignernewsToken'),
        "me": JSON.parse(localStorage.getItem('DesignernewsMe')),
        "upvotes": localStorage.getItem('DesigernewsUpvotes')
      },
      "HN": {
        "error": localStorage.getItem('Hackernews_error'),
        "status": items.HN_status,
        "alarmName": 'hackernews',
        "refresh": isNaN(parseFloat(items.HN_refresh)) ? 15 : parseFloat(items.HN_refresh),
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
        "refresh": isNaN(parseFloat(items.GH_refresh)) ? 15 : parseFloat(items.GH_refresh),
        "bgFunctionName": 'getGithubData',
        "feFunctionName": 'ghShowData',
        "JSON": $.parseXML(localStorage.getItem('Github')),
        "HTML": localStorage.getItem('GithubHTML')
      },
      "PH": {
        "error": localStorage.getItem('ProductHunt_error'),
        "status": items.PH_status,
        "alarmName": 'productHunt',
        "refresh": isNaN(parseFloat(items.PH_refresh)) ? 15 : parseFloat(items.PH_refresh),
        "bgFunctionName": 'getProductHuntData',
        "feFunctionName": 'phShowData',
        "JSON": JSON.parse(localStorage.getItem('ProductHunt')),
        "HTML": localStorage.getItem('ProductHuntHTML')
      },
    };
    serviceDataRefreshDone.resolve();
  });
}