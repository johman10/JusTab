$(window).load(refreshServiceData());

function refreshServiceData() {
  var localStorageHash = localStorage;

  serviceDataRefreshDone = $.Deferred();

  chrome.storage.sync.get(function(items) {
    serviceData = {
      "spinner": "<div class='loader'><svg class='circular'><circle class='path'/></svg></div>",
      "GC": {
        "containerId": 'calendar',
        "error": localStorageHash.Calendar_error || null,
        "status": items.GC_status,
        "alarmName": 'googleCalendar',
        "refresh": isNaN(parseFloat(items.GC_refresh)) ? 15 : parseFloat(items.GC_refresh),
        "bgFunctionName": 'getCalendarData',
        "feFunctionName": 'calenderShowEvents',
        "JSON": JSON.parse(localStorageHash.Calendar || null),
        "HTML": localStorageHash.CalendarHTML || null,
        "calendars": items.calendars,
        "days": parseFloat(items.GC_days) || 6,
        "panelWidth": parseFloat(items.GC_width) || 400
      },
      "GM": {
        "containerId": 'gmail',
        "error": localStorageHash.Gmail_error || null,
        "status": items.GM_status,
        "alarmName": 'gmail',
        "refresh": isNaN(parseFloat(items.GM_refresh)) ? 15 : parseFloat(items.GM_refresh),
        "bgFunctionName": 'getGmailData',
        "feFunctionName": 'GmailShowData',
        "JSON": JSON.parse(localStorageHash.Gmail || null),
        "ReadHTML": localStorageHash.GmailReadHTML || null,
        "UnreadHTML": localStorageHash.GmailUnreadHTML || null,
        "nextPage": localStorageHash.Gmail_page || null,
        "panelWidth": parseFloat(items.GM_width) || 400
      },
      "FB": {
        "containerId": 'facebook',
        "error": localStorageHash.Facebook_error || null,
        "status": items.FB_status,
        "alarmName": 'facebook',
        "refresh": isNaN(parseFloat(items.FB_refresh)) ? 15 : parseFloat(items.FB_refresh),
        "bgFunctionName": 'getFacebookData',
        "feFunctionName": 'fbShowData',
        "JSON": $.parseXML(localStorageHash.Facebook || null),
        "url": items.FB_url,
        "HTML": localStorageHash.FacebookHTML || null,
        "panelWidth": parseFloat(items.FB_width) || 400
      },
      "CP": {
        "containerId": 'couchpotato',
        "status": items.CP_status,
        "refresh": isNaN(parseFloat(items.CP_refresh)) ? 15 : parseFloat(items.CP_refresh),
        "feFunctionName": 'cpShowData',
        "apiUrl": items.CP_address + ":" + items.CP_port + "/api/" + items.CP_key + "/",
        "url": items.CP_address + ":" + items.CP_port,
        "address": items.CP_address,
        "port": items.CP_port,
        "key": items.CP_key,
        "panelWidth": parseFloat(items.CP_width) || 400,
        "snatched": {
            "error": localStorageHash.CouchpotatoSnatched_error || null,
            "alarmName": 'couchPotatoSnatched',
            "bgFunctionName": 'getSnatchedCouchPotato',
            "JSON": JSON.parse(localStorageHash.CouchpotatoSnatched || null),
            "HTML": localStorageHash.CouchpotatoSnatchedHTML || null
        },
        "wanted": {
            "error": localStorageHash.CouchpotatoWanted_error || null,
            "alarmName": 'couchPotatoWanted',
            "bgFunctionName": 'getWantedCouchPotato',
            "JSON": JSON.parse(localStorageHash.CouchpotatoWanted || null),
            "HTML": localStorageHash.CouchpotatoWantedHTML || null
        }
      },
      "SB": {
        "containerId": 'sickbeard',
        "error": localStorageHash.Sickbeard_error || null,
        "status": items.SB_status,
        "alarmName": 'sickBeard',
        "refresh": isNaN(parseFloat(items.SB_refresh)) ? 15 : parseFloat(items.SB_refresh),
        "bgFunctionName": 'getSickBeardData',
        "feFunctionName": 'sbShowData',
        "JSON": JSON.parse(localStorageHash.Sickbeard || null),
        "MissedHTML": localStorageHash.SickbeardMissedHTML || null,
        "TodayHTML": localStorageHash.SickbeardTodayHTML || null,
        "SoonHTML": localStorageHash.SickbeardSoonHTML || null,
        "LaterHTML": localStorageHash.SickbeardLaterHTML || null,
        "apiUrl": items.SB_address + ":" + items.SB_port + "/api/" + items.SB_key + "/",
        "url": items.SB_address + ":" + items.SB_port,
        "address": items.SB_address,
        "port": items.SB_port,
        "key": items.SB_key,
        "panelWidth": parseFloat(items.SB_width) || 400
      },
      "SAB": {
        "containerId": 'sabnzbd',
        "status": items.SAB_status,
        "feFunctionName": 'sabShowData',
        "url": items.SAB_address + ":" + items.SAB_port,
        "apiUrl": items.SAB_address + ":" + items.SAB_port + "/sabnzbd/api?apikey=" + items.SAB_key,
        "downloadStatus": localStorageHash.SabnzbdStatusHTML || null,
        "address": items.SAB_address,
        "port": items.SAB_port,
        "key": items.SAB_key,
        "panelWidth": parseFloat(items.SAB_width) || 400,
        "queue": {
            "error": localStorageHash.SabnzbdQueue_error || null,
            "alarmName": 'sabnzbdQueue',
            "refresh": isNaN(parseFloat(items.SABQ_refresh)) ? 15 : parseFloat(items.SABQ_refresh),
            "bgFunctionName": 'getSabnzbdQueue',
            "JSON": JSON.parse(localStorageHash.SabnzbdQueue || null),
            "HTML": localStorageHash.SabnzbdQueueHTML || null
        },
        "history": {
            "error": localStorageHash.SabnzbdHistory_error || null,
            "alarmName": 'sabnzbdHistory',
            "refresh": isNaN(parseFloat(items.SABH_refresh)) ? 15 : parseFloat(items.SABH_refresh),
            "bgFunctionName": 'getSabnzbdHistory',
            "JSON": JSON.parse(localStorageHash.SabnzbdHistory || null),
            "HTML": localStorageHash.SabnzbdHistoryHTML || null,
            "length": items.SAB_history
        }
      },
      "DN": {
        "containerId": 'designernews',
        "error": localStorageHash.Designernews_error || null,
        "status": items.DN_status,
        "alarmName": 'designerNews',
        "refresh": isNaN(parseFloat(items.DN_refresh)) ? 15 : parseFloat(items.DN_refresh),
        "bgFunctionName": 'getDesignerNewsData',
        "feFunctionName": 'dnShowData',
        "JSON": JSON.parse(localStorageHash.Designernews || null),
        "HTML": localStorageHash.DesignernewsHTML || null,
        "panelWidth": parseFloat(items.DN_width) || 400
      },
      "HN": {
        "containerId": 'hackernews',
        "error": localStorageHash.Hackernews_error || null,
        "status": items.HN_status,
        "alarmName": 'hackernews',
        "refresh": isNaN(parseFloat(items.HN_refresh)) ? 15 : parseFloat(items.HN_refresh),
        "bgFunctionName": 'getHackerNewsData',
        "feFunctionName": 'hnShowData',
        "IDs": localStorageHash.HackernewsIDs || null,
        "JSON": JSON.parse(localStorageHash.Hackernews || null),
        "HTML": localStorageHash.HackernewsHTML || null,
        "panelWidth": parseFloat(items.HN_width) || 400
      },
      "GH": {
        "containerId": 'github',
        "error": localStorageHash.Github_error || null,
        "status": items.GH_status,
        "alarmName": 'github',
        "refresh": isNaN(parseFloat(items.GH_refresh)) ? 15 : parseFloat(items.GH_refresh),
        "bgFunctionName": 'getGithubData',
        "feFunctionName": 'ghShowData',
        "JSON": localStorageHash.Github || null,
        "HTML": localStorageHash.GithubHTML || null,
        "panelWidth": parseFloat(items.GH_width) || 400
      },
      "PH": {
        "containerId": 'producthunt',
        "error": localStorageHash.ProductHunt_error || null,
        "status": items.PH_status,
        "alarmName": 'productHunt',
        "refresh": isNaN(parseFloat(items.PH_refresh)) ? 15 : parseFloat(items.PH_refresh),
        "bgFunctionName": 'getProductHuntData',
        "feFunctionName": 'phShowData',
        "JSON": JSON.parse(localStorageHash.ProductHunt || null),
        "HTML": localStorageHash.ProductHuntHTML || null,
        "panelWidth": parseFloat(items.PH_width) || 400
      },
      "DR": {
        "containerId": 'dribbble',
        "error": localStorageHash.Dribbble_error || null,
        "status": items.PH_status,
        "alarmName": 'dribbble',
        "refresh": isNaN(parseFloat(items.DR_refresh)) ? 15 : parseFloat(items.DR_refresh),
        "bgFunctionName": 'getDribbbleData',
        "feFunctionName": 'drShowData',
        "JSON": JSON.parse(localStorageHash.Dribbble || null),
        "HTML": localStorageHash.DribbbleHTML || null,
        "smallImages": items.DR_small_images,
        "gifs": items.DR_gifs,
        "panelWidth": parseFloat(items.DR_width) || 400
      },
      "RD": {
        "containerId": 'reddit',
        "error": localStorageHash.Reddit_error || null,
        "status": items.RD_status,
        "alarmName": 'reddit',
        "refresh": isNaN(parseFloat(items.RD_refresh)) ? 15 : parseFloat(items.RD_refresh),
        "bgFunctionName": 'getRedditData',
        "feFunctionName": 'rdShowData',
        "JSON": JSON.parse(localStorageHash.Reddit || null),
        "HTML": localStorageHash.RedditHTML || null,
        "panelWidth": parseFloat(items.RD_width) || 400,
        "subreddit": items.RD_subreddit || 'all',
        "sorting": items.RD_sorting || 'Hot'
      },
      "NG": {
        "containerId": 'nzbget',
        "status": items.NG_status,
        "feFunctionName": 'ngShowData',
        "url": items.NG_address + ":" + items.NG_port,
        "apiUrl": items.NG_address + ":" + items.NG_port + "/" + items.NG_username + ":" + items.NG_password + "/jsonrpc",
        "downloadStatus": localStorageHash.NzbgetStatusHTML || null,
        "address": items.NG_address,
        "port": items.NG_port,
        "username": items.NG_username,
        "password": items.NG_password,
        "panelWidth": parseFloat(items.NG_width) || 400,
        "queue": {
            "error": localStorageHash.NzbgetQueue_error || null,
            "alarmName": 'nzbgetQueue',
            "refresh": isNaN(parseFloat(items.NGQ_refresh)) ? 15 : parseFloat(items.NGQ_refresh),
            "bgFunctionName": 'getNzbgetQueue',
            "JSON": JSON.parse(localStorageHash.NzbgetQueue || null),
            "HTML": localStorageHash.NzbgetQueueHTML || null,
        },
        "history": {
            "error": localStorageHash.NzbgetHistory_error || null,
            "alarmName": 'nzbgetHistory',
            "refresh": isNaN(parseFloat(items.NGH_refresh)) ? 15 : parseFloat(items.NGH_refresh),
            "bgFunctionName": 'getNzbgetHistory',
            "JSON": JSON.parse(localStorageHash.NzbgetHistory || null),
            "HTML": localStorageHash.NzbgetHistoryHTML || null,
            "length": parseFloat(items.NGH_length) || 25
        }
      },
      "SO": {
        "containerId": 'sonarr',
        "error": localStorageHash.Sonarr_error || null,
        "status": items.SO_status,
        "alarmName": 'sonarr',
        "refresh": isNaN(parseFloat(items.SO_refresh)) ? 15 : parseFloat(items.SO_refresh),
        "bgFunctionName": 'getSonarrData',
        "feFunctionName": 'soShowData',
        "JSON": JSON.parse(localStorageHash.Sonarr || null),
        "HTML": localStorageHash.SonarrHTML || null,
        "apiUrl": items.SO_address + ":" + items.SO_port + "/api/",
        "url": items.SO_address + ":" + items.SO_port,
        "address": items.SO_address,
        "port": items.SO_port,
        "key": items.SO_key,
        "panelWidth": parseFloat(items.SO_width) || 400
      }
    };
    serviceDataRefreshDone.resolve();
  });
}
