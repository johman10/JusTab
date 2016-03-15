$(window).load(refreshServiceData());

function refreshServiceData() {

  // I'm probably gonna need this little fallback for if there is no array of votes
  if (!localStorage.getItem('DesigernewsUpvotes')) {
    localStorage.setItem('DesigernewsUpvotes', []);
  }

  serviceDataRefreshDone = $.Deferred();

  chrome.storage.sync.get(function(items) {
    serviceData = {
      "spinner": "<div class='loader'><svg class='circular'><circle class='path'/></svg></div>",
      "GC": {
        "containerId": 'calendar',
        "error": localStorage.getItem('Calendar_error'),
        "status": items.GC_status,
        "alarmName": 'googleCalendar',
        "refresh": isNaN(parseFloat(items.GC_refresh)) ? 15 : parseFloat(items.GC_refresh),
        "bgFunctionName": 'getCalendarData',
        "feFunctionName": 'calenderShowEvents',
        "JSON": JSON.parse(localStorage.getItem('Calendar')),
        "HTML": localStorage.getItem('CalendarHTML'),
        "calendars": items.calendars,
        "days": parseFloat(items.GC_days),
        "panelWidth": parseFloat(items.GC_width) || 400
      },
      "GM": {
        "containerId": 'gmail',
        "error": localStorage.getItem('Gmail_error'),
        "status": items.GM_status,
        "alarmName": 'gmail',
        "refresh": isNaN(parseFloat(items.GM_refresh)) ? 15 : parseFloat(items.GM_refresh),
        "bgFunctionName": 'getGmailData',
        "feFunctionName": 'GmailShowData',
        "JSON": JSON.parse(localStorage.getItem('Gmail')),
        "ReadHTML": localStorage.getItem('GmailReadHTML'),
        "UnreadHTML": localStorage.getItem('GmailUnreadHTML'),
        "nextPage": localStorage.getItem('Gmail_page'),
        "panelWidth": parseFloat(items.GM_width) || 400
      },
      "FB": {
        "containerId": 'facebook',
        "error": localStorage.getItem('Facebook_error'),
        "status": items.FB_status,
        "alarmName": 'facebook',
        "refresh": isNaN(parseFloat(items.FB_refresh)) ? 15 : parseFloat(items.FB_refresh),
        "bgFunctionName": 'getFacebookData',
        "feFunctionName": 'fbShowData',
        "JSON": $.parseXML(localStorage.getItem('Facebook')),
        "url": items.FB_url,
        "HTML": localStorage.getItem('FacebookHTML'),
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
            "error": localStorage.getItem('CouchpotatoSnatched_error'),
            "alarmName": 'couchPotatoSnatched',
            "bgFunctionName": 'getSnatchedCouchPotato',
            "JSON": JSON.parse(localStorage.getItem('CouchpotatoSnatched')),
            "HTML": localStorage.getItem('CouchpotatoSnatchedHTML')
        },
        "wanted": {
            "error": localStorage.getItem('CouchpotatoWanted_error'),
            "alarmName": 'couchPotatoWanted',
            "bgFunctionName": 'getWantedCouchPotato',
            "JSON": JSON.parse(localStorage.getItem('CouchpotatoWanted')),
            "HTML": localStorage.getItem('CouchpotatoWantedHTML')
        }
      },
      "SB": {
        "containerId": 'sickbeard',
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
        "key": items.SB_key,
        "panelWidth": parseFloat(items.SB_width) || 400
      },
      "SAB": {
        "containerId": 'sabnzbd',
        "status": items.SAB_status,
        "feFunctionName": 'sabShowData',
        "url": items.SAB_address + ":" + items.SAB_port,
        "apiUrl": items.SAB_address + ":" + items.SAB_port + "/sabnzbd/api?apikey=" + items.SAB_key,
        "downloadStatus": localStorage.getItem('SabnzbdStatusHTML'),
        "address": items.SAB_address,
        "port": items.SAB_port,
        "key": items.SAB_key,
        "panelWidth": parseFloat(items.SAB_width) || 400,
        "queue": {
            "error": localStorage.getItem('SabnzbdQueue_error'),
            "alarmName": 'sabnzbdQueue',
            "refresh": isNaN(parseFloat(items.SABQ_refresh)) ? 15 : parseFloat(items.SABQ_refresh),
            "bgFunctionName": 'getSabnzbdQueue',
            "JSON": JSON.parse(localStorage.getItem('SabnzbdQueue')),
            "HTML": localStorage.getItem('SabnzbdQueueHTML')
        },
        "history": {
            "error": localStorage.getItem('SabnzbdHistory_error'),
            "alarmName": 'sabnzbdHistory',
            "refresh": isNaN(parseFloat(items.SABH_refresh)) ? 15 : parseFloat(items.SABH_refresh),
            "bgFunctionName": 'getSabnzbdHistory',
            "JSON": JSON.parse(localStorage.getItem('SabnzbdHistory')),
            "HTML": localStorage.getItem('SabnzbdHistoryHTML'),
            "length": items.SAB_history
        }
      },
      "DN": {
        "containerId": 'designernews',
        "error": localStorage.getItem('Designernews_error'),
        "status": items.DN_status,
        "alarmName": 'designerNews',
        "refresh": isNaN(parseFloat(items.DN_refresh)) ? 15 : parseFloat(items.DN_refresh),
        "bgFunctionName": 'getDesignerNewsData',
        "feFunctionName": 'dnShowData',
        "JSON": JSON.parse(localStorage.getItem('Designernews')),
        "HTML": localStorage.getItem('DesignernewsHTML'),
        "panelWidth": parseFloat(items.DN_width) || 400
      },
      "HN": {
        "containerId": 'hackernews',
        "error": localStorage.getItem('Hackernews_error'),
        "status": items.HN_status,
        "alarmName": 'hackernews',
        "refresh": isNaN(parseFloat(items.HN_refresh)) ? 15 : parseFloat(items.HN_refresh),
        "bgFunctionName": 'getHackerNewsData',
        "feFunctionName": 'hnShowData',
        "IDs": localStorage.getItem('HackernewsIDs'),
        "JSON": JSON.parse(localStorage.getItem('Hackernews')),
        "HTML": localStorage.getItem('HackernewsHTML'),
        "panelWidth": parseFloat(items.HN_width) || 400
      },
      "GH": {
        "containerId": 'github',
        "error": localStorage.getItem('Github_error'),
        "status": items.GH_status,
        "alarmName": 'github',
        "refresh": isNaN(parseFloat(items.GH_refresh)) ? 15 : parseFloat(items.GH_refresh),
        "bgFunctionName": 'getGithubData',
        "feFunctionName": 'ghShowData',
        "JSON": localStorage.getItem('Github'),
        "HTML": localStorage.getItem('GithubHTML'),
        "panelWidth": parseFloat(items.GH_width) || 400
      },
      "PH": {
        "containerId": 'producthunt',
        "error": localStorage.getItem('ProductHunt_error'),
        "status": items.PH_status,
        "alarmName": 'productHunt',
        "refresh": isNaN(parseFloat(items.PH_refresh)) ? 15 : parseFloat(items.PH_refresh),
        "bgFunctionName": 'getProductHuntData',
        "feFunctionName": 'phShowData',
        "JSON": JSON.parse(localStorage.getItem('ProductHunt')),
        "HTML": localStorage.getItem('ProductHuntHTML'),
        "panelWidth": parseFloat(items.PH_width) || 400
      },
      "DR": {
        "containerId": 'dribbble',
        "error": localStorage.getItem('Dribbble_error'),
        "status": items.PH_status,
        "alarmName": 'dribbble',
        "refresh": isNaN(parseFloat(items.DR_refresh)) ? 15 : parseFloat(items.DR_refresh),
        "bgFunctionName": 'getDribbbleData',
        "feFunctionName": 'drShowData',
        "JSON": JSON.parse(localStorage.getItem('Dribbble')),
        "HTML": localStorage.getItem('DribbbleHTML'),
        "smallImages": items.DR_small_images,
        "gifs": items.DR_gifs,
        "panelWidth": parseFloat(items.DR_width) || 400
      },
      "RD": {
        "containerId": 'reddit',
        "error": localStorage.getItem('Reddit_error'),
        "status": items.RD_status,
        "alarmName": 'reddit',
        "refresh": isNaN(parseFloat(items.RD_refresh)) ? 15 : parseFloat(items.RD_refresh),
        "bgFunctionName": 'getRedditData',
        "feFunctionName": 'rdShowData',
        "JSON": JSON.parse(localStorage.getItem('Reddit')),
        "HTML": localStorage.getItem('RedditHTML'),
        "panelWidth": parseFloat(items.RD_width) || 400,
        "subreddit": items.RD_subreddit || 'all',
        "sorting": items.RD_sorting || 'Hot'
      }
    };
    serviceDataRefreshDone.resolve();
  });
}
