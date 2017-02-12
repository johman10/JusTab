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
      logo: require('img/GC_header.svg'),
      error: localStorage.googleCalendarError || null,
      status: items.GC_status || true,
      functionName: 'googleCalendar',
      optionsPath: 'googlecalendar',
      refresh: isNaN(parseFloat(items.GC_refresh)) ? 15 : parseFloat(items.GC_refresh),
      components: localStorage.googleCalendarComponents || null,
      calendars: ['johveck@gmail.com'],
      // TODO: Restore this code after settings work
      // calendars: items.calendars,
      days: parseFloat(items.GC_days) || 6,
      panelWidth: parseFloat(items.GC_width) || 400,
      actions: []
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
      logo: require('img/GM_header.svg'),
      error: localStorage.Gmail_error || null,
      status: items.GM_status || true,
      functionName: 'gmail',
      optionsPath: 'gmail',
      refresh: isNaN(parseFloat(items.GM_refresh)) ? 15 : parseFloat(items.GM_refresh),
      components: localStorage.gmailComponents || null,
      nextPage: localStorage.Gmail_page || null,
      panelWidth: parseFloat(items.GM_width) || 400,
      length: 25,
      actions: []
    };
  });
};

export let couchPotato = function() {
  return chromeStorage().then(function(items) {
    var data = {
      id: 3,
      name: 'CouchPotato',
      color: '#4e5969',
      logo: require('img/CP_header.png'),
      status: items.CP_status || true,
      refresh: isNaN(parseFloat(items.CP_refresh)) ? 15 : parseFloat(items.CP_refresh),
      address: items.CP_address,
      port: items.CP_port,
      key: items.CP_key,
      panelWidth: parseFloat(items.CP_width) || 400,
      error: localStorage.couchPotatoError || null,
      functionName: 'couchPotato',
      optionsPath: 'couchpotato',
      components: localStorage.couchPotatoComponents || null,
      actions: []
    };
    data = Object.assign(data, apiUrl(data));
    // TODO: remove this line and use the previous line instead
    data.apiUrl = 'https://nas.pxdesign.nl/couchpotato/api/18f01df7c60c4f519fab66877028f91a/';
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
      logo: require('img/DN_header.png'),
      error: localStorage.designerNewsError || null,
      status: items.DN_status || true,
      functionName: 'designerNews',
      optionsPath: 'designernews',
      refresh: isNaN(parseFloat(items.DN_refresh)) ? 15 : parseFloat(items.DN_refresh),
      components: localStorage.designerNewsComponents,
      panelWidth: parseFloat(items.DN_width) || 400,
      actions: ['openUnread']
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
      logo: require('img/HN_header.svg'),
      error: localStorage.Hackernews_error || null,
      status: items.HN_status || true,
      functionName: 'hackernews',
      optionsPath: 'hackernews',
      refresh: isNaN(parseFloat(items.HN_refresh)) ? 15 : parseFloat(items.HN_refresh),
      IDs: localStorage.HackernewsIDs || null,
      JSON: JSON.parse(localStorage.Hackernews || null),
      HTML: localStorage.HackernewsHTML || null,
      panelWidth: parseFloat(items.HN_width) || 400,
      actions: ['openUnread']
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
      logo: require('img/GH_header.png'),
      error: localStorage.Github_error || null,
      status: items.GH_status || true,
      functionName: 'github',
      optionsPath: 'github',
      refresh: isNaN(parseFloat(items.GH_refresh)) ? 15 : parseFloat(items.GH_refresh),
      JSON: localStorage.Github || null,
      HTML: localStorage.GithubHTML || null,
      panelWidth: parseFloat(items.GH_width) || 400,
      actions: ['openUnread']
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
      logo: require('img/PH_header.svg'),
      error: localStorage.ProductHunt_error || null,
      status: items.PH_status || true,
      functionName: 'productHunt',
      optionsPath: 'producthunt',
      refresh: isNaN(parseFloat(items.PH_refresh)) ? 15 : parseFloat(items.PH_refresh),
      JSON: JSON.parse(localStorage.ProductHunt || null),
      HTML: localStorage.ProductHuntHTML || null,
      panelWidth: parseFloat(items.PH_width) || 400,
      actions: ['openUnread']
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
      logo: require('img/DR_header.svg'),
      error: localStorage.Dribbble_error || null,
      status: items.PH_status || true,
      functionName: 'dribbble',
      optionsPath: 'dribbble',
      refresh: isNaN(parseFloat(items.DR_refresh)) ? 15 : parseFloat(items.DR_refresh),
      JSON: JSON.parse(localStorage.Dribbble || null),
      HTML: localStorage.DribbbleHTML || null,
      smallImages: items.DR_small_images,
      gifs: items.DR_gifs,
      panelWidth: parseFloat(items.DR_width) || 400,
      actions: ['openUnread']
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
      logo: require('img/RD_header.png'),
      error: localStorage.Reddit_error || null,
      status: items.RD_status || true,
      functionName: 'reddit',
      optionsPath: 'reddit',
      refresh: isNaN(parseFloat(items.RD_refresh)) ? 15 : parseFloat(items.RD_refresh),
      JSON: JSON.parse(localStorage.Reddit || null),
      HTML: localStorage.RedditHTML || null,
      panelWidth: parseFloat(items.RD_width) || 400,
      subreddit: items.RD_subreddit || 'all',
      sorting: items.RD_sorting || 'Hot',
      actions: ['openUnread']
    };
  });
};

export let nzbget = function() {
  return chromeStorage().then(function(items) {
    var data = {
      id: 12,
      name: 'NZBGet',
      color: '#282828',
      logo: require('img/NG_header.png'),
      status: items.NG_status || true,
      downloadStatus: localStorage.NzbgetStatusHTML || null || true,
      address: items.NG_address,
      port: items.NG_port,
      username: items.NG_username,
      password: items.NG_password,
      panelWidth: parseFloat(items.NG_width) || 400,
      optionsPath: 'nzbget',
      actions: [],
      queue: {
        error: localStorage.NzbgetQueue_error || null,
        functionName: 'nzbgetQueue',
        refresh: isNaN(parseFloat(items.NGQ_refresh)) ? 15 : parseFloat(items.NGQ_refresh),
        JSON: JSON.parse(localStorage.NzbgetQueue || null),
        HTML: localStorage.NzbgetQueueHTML || null
      },
      history: {
        error: localStorage.NzbgetHistory_error || null,
        functionName: 'nzbgetHistory',
        refresh: isNaN(parseFloat(items.NGH_refresh)) ? 15 : parseFloat(items.NGH_refresh),
        JSON: JSON.parse(localStorage.NzbgetHistory || null),
        HTML: localStorage.NzbgetHistoryHTML || null,
        length: parseFloat(items.NGH_length) || 25
      },
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
      logo: require('img/SO_header.png'),
      error: localStorage.Sonarr_error || null,
      status: items.SO_status || true,
      functionName: 'sonarr',
      optionsPath: 'sonarr',
      refresh: isNaN(parseFloat(items.SO_refresh)) ? 15 : parseFloat(items.SO_refresh),
      JSON: JSON.parse(localStorage.Sonarr || null),
      HTML: localStorage.SonarrHTML || null,
      address: items.SO_address,
      port: items.SO_port,
      key: items.SO_key,
      panelWidth: parseFloat(items.SO_width) || 400,
      actions: []
    };

    data = Object.assign(data, apiUrl(data));
    return data;
  });
};

const serviceData = [
  googleCalendar,
  gmail,
  couchPotato,
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
