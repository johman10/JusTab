function chromeStorage () {
  return new Promise(function(resolve, reject) {
    chrome.storage.sync.get(function(items) {
      resolve(items);
    });
  });
}

export let googleCalendar = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 1,
      name: 'Google Calendar',
      url: 'https://calendar.google.com',
      color: '#4285f4',
      loading: false,
      logo: require('img/GC_header.svg'),
      containerId: 'calendar',
      error: localStorage.googleCalendarError || null,
      status: items.GC_status,
      functionName: 'googleCalendar',
      refresh: isNaN(parseFloat(items.GC_refresh)) ? 15 : parseFloat(items.GC_refresh),
      bgFunctionName: 'getCalendarData',
      feFunctionName: 'calenderShowEvents',
      components: localStorage.googleCalendarComponents || null,
      calendars: ['johveck@gmail.com'],
      // TODO: Restore this code after settings work
      // calendars: items.calendars,
      days: parseFloat(items.GC_days) || 6,
      panelWidth: parseFloat(items.GC_width) || 400
    };
  });
};

export let gmail = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 2,
      name: 'Gmail',
      url: 'https://gmail.com',
      color: '#e04a3f',
      loading: false,
      logo: require('img/GM_header.svg'),
      containerId: 'gmail',
      error: localStorage.Gmail_error || null,
      status: items.GM_status,
      functionName: 'gmail',
      refresh: isNaN(parseFloat(items.GM_refresh)) ? 15 : parseFloat(items.GM_refresh),
      bgFunctionName: 'getGmailData',
      feFunctionName: 'GmailShowData',
      components: localStorage.gmailComponents || null,
      nextPage: localStorage.Gmail_page || null,
      panelWidth: parseFloat(items.GM_width) || 400,
      htmlStorageKey: ['GmailUnreadHTML', 'GmailReadHTML'],
      length: 25
    };
  });
};

export let couchPotato = function() {
  return chromeStorage().then(function(items) {
    var data = {
      id: 3,
      name: 'CouchPotato',
      containerId: 'couchpotato',
      color: '#4e5969',
      loading: false,
      logo: require('img/CP_header.png'),
      status: items.CP_status,
      refresh: isNaN(parseFloat(items.CP_refresh)) ? 15 : parseFloat(items.CP_refresh),
      feFunctionName: 'cpShowData',
      address: items.CP_address,
      port: items.CP_port,
      key: items.CP_key,
      panelWidth: parseFloat(items.CP_width) || 400,
      htmlStorageKey: ['CouchpotatoSnatchedHTML', 'CouchpotatoWantedHTML'],
      snatched: {
        error: localStorage.CouchpotatoSnatched_error || null,
        functionName: 'couchPotatoSnatched',
        bgFunctionName: 'getSnatchedCouchPotato',
        JSON: JSON.parse(localStorage.CouchpotatoSnatched || null),
        HTML: localStorage.CouchpotatoSnatchedHTML || null
      },
      wanted: {
        error: localStorage.CouchpotatoWanted_error || null,
        functionName: 'couchPotatoWanted',
        bgFunctionName: 'getWantedCouchPotato',
        JSON: JSON.parse(localStorage.CouchpotatoWanted || null),
        HTML: localStorage.CouchpotatoWantedHTML || null,
        length: 25
      }
    };
    data = Object.assign(data, apiUrl(data));
    return data;
  });
};

export let sickBeard = function() {
  return chromeStorage().then(function(items) {
    var data = {
      id: 4,
      name: 'Sick Beard',
      containerId: 'sickbeard',
      color: '#c7db40',
      loading: false,
      logo: require('img/SB_header.png'),
      error: localStorage.Sickbeard_error || null,
      status: items.SB_status,
      functionName: 'sickBeard',
      refresh: isNaN(parseFloat(items.SB_refresh)) ? 15 : parseFloat(items.SB_refresh),
      bgFunctionName: 'getSickBeardData',
      feFunctionName: 'sbShowData',
      JSON: JSON.parse(localStorage.Sickbeard || null),
      MissedHTML: localStorage.SickbeardMissedHTML || null,
      TodayHTML: localStorage.SickbeardTodayHTML || null,
      SoonHTML: localStorage.SickbeardSoonHTML || null,
      LaterHTML: localStorage.SickbeardLaterHTML || null,
      address: items.SB_address,
      port: items.SB_port,
      key: items.SB_key,
      panelWidth: parseFloat(items.SB_width) || 400,
      htmlStorageKey: ['SickbeardMissedHTML', 'SickbeardTodayHTML', 'SickbeardSoonHTML', 'SickbeardLaterHTML']
    }
    data = Object.assign(data, apiUrl(data));
    return data;
  });
}

export let sabnzbd = function() {
  return chromeStorage().then(function(items) {
    var data = {
      id: 5,
      name: 'SABnzbd',
      containerId: 'sabnzbd',
      color: '#ffeb3b',
      loading: false,
      logo: require('img/SAB_header.png'),
      status: items.SAB_status,
      feFunctionName: 'sabShowData',
      downloadStatus: localStorage.SabnzbdStatusHTML || null,
      address: items.SAB_address,
      port: items.SAB_port,
      key: items.SAB_key,
      panelWidth: parseFloat(items.SAB_width) || 400,
      htmlStorageKey: ['SabnzbdQueueHTML', 'SabnzbdHistoryHTML'],
      queue: {
        error: localStorage.SabnzbdQueue_error || null,
        functionName: 'sabnzbdQueue',
        refresh: isNaN(parseFloat(items.SABQ_refresh)) ? 15 : parseFloat(items.SABQ_refresh),
        bgFunctionName: 'getSabnzbdQueue',
        JSON: JSON.parse(localStorage.SabnzbdQueue || null),
        HTML: localStorage.SabnzbdQueueHTML || null
      },
      history: {
        error: localStorage.SabnzbdHistory_error || null,
        functionName: 'sabnzbdHistory',
        refresh: isNaN(parseFloat(items.SABH_refresh)) ? 15 : parseFloat(items.SABH_refresh),
        bgFunctionName: 'getSabnzbdHistory',
        JSON: JSON.parse(localStorage.SabnzbdHistory || null),
        HTML: localStorage.SabnzbdHistoryHTML || null,
        length: items.SAB_history
      }
    };

    data = Object.assign(data, apiUrl(data));
    return data;
  });
};

export let designerNews = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 6,
      name: 'Designer News',
      url: 'https://www.designernews.co/',
      color: '#1c52a2',
      loading: false,
      logo: require('img/DN_header.png'),
      containerId: 'designernews',
      error: localStorage.Designernews_error || null,
      status: items.DN_status,
      functionName: 'designerNews',
      refresh: isNaN(parseFloat(items.DN_refresh)) ? 15 : parseFloat(items.DN_refresh),
      bgFunctionName: 'getDesignerNewsData',
      feFunctionName: 'dnShowData',
      JSON: JSON.parse(localStorage.Designernews || null),
      HTML: localStorage.DesignernewsHTML || null,
      panelWidth: parseFloat(items.DN_width) || 400,
      htmlStorageKey: 'DesignernewsHTML'
    };
  });
};

export let hackerNews = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 7,
      name: 'Hacker News',
      url: 'https://news.ycombinator.com/',
      color: '#f60',
      loading: false,
      logo: require('img/HN_header.svg'),
      containerId: 'hackernews',
      error: localStorage.Hackernews_error || null,
      status: items.HN_status,
      functionName: 'hackernews',
      refresh: isNaN(parseFloat(items.HN_refresh)) ? 15 : parseFloat(items.HN_refresh),
      bgFunctionName: 'getHackerNewsData',
      feFunctionName: 'hnShowData',
      IDs: localStorage.HackernewsIDs || null,
      JSON: JSON.parse(localStorage.Hackernews || null),
      HTML: localStorage.HackernewsHTML || null,
      panelWidth: parseFloat(items.HN_width) || 400,
      htmlStorageKey: 'HackernewsHTML'
    };
  });
};

export let github = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 8,
      name: 'Github',
      url: 'https://github.com/trending',
      color: '#000',
      loading: false,
      logo: require('img/GH_header.png'),
      containerId: 'github',
      error: localStorage.Github_error || null,
      status: items.GH_status,
      functionName: 'github',
      refresh: isNaN(parseFloat(items.GH_refresh)) ? 15 : parseFloat(items.GH_refresh),
      bgFunctionName: 'getGithubData',
      feFunctionName: 'ghShowData',
      JSON: localStorage.Github || null,
      HTML: localStorage.GithubHTML || null,
      panelWidth: parseFloat(items.GH_width) || 400,
      htmlStorageKey: 'GithubHTML'
    };
  });
};

export let productHunt = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 9,
      name: 'Product Hunt',
      url: 'https://www.producthunt.com/',
      color: '#df5337',
      loading: false,
      logo: require('img/PH_header.svg'),
      containerId: 'producthunt',
      error: localStorage.ProductHunt_error || null,
      status: items.PH_status,
      functionName: 'productHunt',
      refresh: isNaN(parseFloat(items.PH_refresh)) ? 15 : parseFloat(items.PH_refresh),
      bgFunctionName: 'getProductHuntData',
      feFunctionName: 'phShowData',
      JSON: JSON.parse(localStorage.ProductHunt || null),
      HTML: localStorage.ProductHuntHTML || null,
      panelWidth: parseFloat(items.PH_width) || 400,
      htmlStorageKey: 'ProductHuntHTML'
    };
  });
};

export let dribbble = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 10,
      name: 'Dribbble',
      url: 'https://dribbble.com',
      color: '#ea4c89',
      loading: false,
      logo: require('img/DR_header.svg'),
      containerId: 'dribbble',
      error: localStorage.Dribbble_error || null,
      status: items.PH_status,
      functionName: 'dribbble',
      refresh: isNaN(parseFloat(items.DR_refresh)) ? 15 : parseFloat(items.DR_refresh),
      bgFunctionName: 'getDribbbleData',
      feFunctionName: 'drShowData',
      JSON: JSON.parse(localStorage.Dribbble || null),
      HTML: localStorage.DribbbleHTML || null,
      smallImages: items.DR_small_images,
      gifs: items.DR_gifs,
      panelWidth: parseFloat(items.DR_width) || 400,
      htmlStorageKey: 'DribbbleHTML'
    };
  });
};

export let reddit = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 11,
      name: 'Reddit',
      url: 'https://www.reddit.com/',
      color: '#CFE3FA',
      loading: false,
      logo: require('img/RD_header.png'),
      containerId: 'reddit',
      error: localStorage.Reddit_error || null,
      status: items.RD_status,
      functionName: 'reddit',
      refresh: isNaN(parseFloat(items.RD_refresh)) ? 15 : parseFloat(items.RD_refresh),
      bgFunctionName: 'getRedditData',
      feFunctionName: 'rdShowData',
      JSON: JSON.parse(localStorage.Reddit || null),
      HTML: localStorage.RedditHTML || null,
      panelWidth: parseFloat(items.RD_width) || 400,
      subreddit: items.RD_subreddit || 'all',
      sorting: items.RD_sorting || 'Hot',
      htmlStorageKey: 'RedditHTML'
    };
  });
};

export let nzbget = function() {
  return chromeStorage().then(function(items) {
    var data = {
      id: 12,
      name: 'NZBGet',
      color: '#282828',
      loading: false,
      logo: require('img/NG_header.png'),
      containerId: 'nzbget',
      status: items.NG_status,
      feFunctionName: 'ngShowData',
      downloadStatus: localStorage.NzbgetStatusHTML || null,
      address: items.NG_address,
      port: items.NG_port,
      username: items.NG_username,
      password: items.NG_password,
      panelWidth: parseFloat(items.NG_width) || 400,
      htmlStorageKey: ['NzbgetQueueHTML', 'NzbgetHistoryHTML'],
      queue: {
        error: localStorage.NzbgetQueue_error || null,
        functionName: 'nzbgetQueue',
        refresh: isNaN(parseFloat(items.NGQ_refresh)) ? 15 : parseFloat(items.NGQ_refresh),
        bgFunctionName: 'getNzbgetQueue',
        JSON: JSON.parse(localStorage.NzbgetQueue || null),
        HTML: localStorage.NzbgetQueueHTML || null
      },
      history: {
        error: localStorage.NzbgetHistory_error || null,
        functionName: 'nzbgetHistory',
        refresh: isNaN(parseFloat(items.NGH_refresh)) ? 15 : parseFloat(items.NGH_refresh),
        bgFunctionName: 'getNzbgetHistory',
        JSON: JSON.parse(localStorage.NzbgetHistory || null),
        HTML: localStorage.NzbgetHistoryHTML || null,
        length: parseFloat(items.NGH_length) || 25
      }
    };

    data = Object.assign(data, apiUrl(data));
    return data;
  });
};

export let sonarr = function() {
  return chromeStorage().then(function(items) {
    var data = {
      id: 13,
      name: 'Sonarr',
      color: '#5FB9EF',
      loading: false,
      logo: require('img/SO_header.png'),
      containerId: 'sonarr',
      error: localStorage.Sonarr_error || null,
      status: items.SO_status,
      functionName: 'sonarr',
      refresh: isNaN(parseFloat(items.SO_refresh)) ? 15 : parseFloat(items.SO_refresh),
      bgFunctionName: 'getSonarrData',
      feFunctionName: 'soShowData',
      JSON: JSON.parse(localStorage.Sonarr || null),
      HTML: localStorage.SonarrHTML || null,
      address: items.SO_address,
      port: items.SO_port,
      key: items.SO_key,
      panelWidth: parseFloat(items.SO_width) || 400,
      htmlStorageKey: 'SonarrHTML'
    };

    data = Object.assign(data, apiUrl(data));
    return data;
  });
};

const serviceData = [
  googleCalendar,
  gmail,
  couchPotato,
  sickBeard,
  sabnzbd,
  designerNews,
  hackerNews,
  github,
  productHunt,
  dribbble,
  reddit,
  nzbget,
  sonarr
];

function apiUrl(data) {
  var tempUrl = data.address;
  if (data.port) {
    tempUrl += ':' + data.port;
  }
  var url = tempUrl;
  var apiUrl = tempUrl + '/api/' + data.key + '/';

  return {
    url: url,
    apiUrl: apiUrl
  };
}

export default serviceData;
