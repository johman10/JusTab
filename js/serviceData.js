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
  serviceData =
    {
      "GC":
      {
        "status": items.GC_status,
        "alarmName": 'googleCalendar',
        "refresh": parseFloat(items.GC_refresh),
        "bgFunctionName": 'getCalendarData',
        "feFunctionName": 'calenderShowEvents'
      },
      "GM":
      {
        "status": items.GM_status,
        "alarmName": 'gmail',
        "refresh": parseFloat(items.GM_refresh),
        "bgFunctionName": 'getGmailData',
        "feFunctionName": 'GmailShowData'
      },
      "FB":
      {
        "status": items.FB_status,
        "alarmName": 'facebook',
        "refresh": parseFloat(items.FB_refresh),
        "bgFunctionName": 'getFacebookData',
        "feFunctionName": 'fbShowData'
      },
      "CPW":
      {
        "status": items.CP_status,
        "alarmName": 'couchPotatoWanted',
        "refresh": parseFloat(items.CP_refresh),
        "bgFunctionName": 'getWantedCouchPotato',
        "feFunctionName": 'cpShowData'
      },
      "CPS":
      {
        "status": items.CP_status,
        "alarmName": 'couchPotatoSnatched',
        "refresh": parseFloat(items.CP_refresh),
        "bgFunctionName": 'getSnatchedCouchPotato',
        "feFunctionName": 'cpShowData'
      },
      "SB":
      {
        "status": items.SB_status,
        "alarmName": 'sickBeard',
        "refresh": parseFloat(items.SB_refresh),
        "bgFunctionName": 'getSickBeardData',
        "feFunctionName": 'sbShowData'
      },
      "SABQ":
      {
        "status": items.SAB_status,
        "alarmName": 'sabnzbdQueue',
        "refresh": parseFloat(items.SABQ_refresh),
        "bgFunctionName": 'getSabnzbdQueue',
        "feFunctionName": 'sabShowData'
      },
      "SABH":
      {
        "status": items.SAB_status,
        "alarmName": 'sabnzbdHistory',
        "refresh": parseFloat(items.SABH_refresh),
        "bgFunctionName": 'getSabnzbdHistory',
        "feFunctionName": 'sabShowData'
      },
      "DN":
      {
        "status": items.DN_status,
        "alarmName": 'designerNews',
        "refresh": parseFloat(items.DN_refresh),
        "bgFunctionName": 'getDesignerNewsData',
        "feFunctionName": 'dnShowData'
      }
    }
  ;
});