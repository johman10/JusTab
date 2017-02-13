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
      active: typeof items.googleCalendarActive === 'boolean' ? items.googleCalendarActive : true,
      functionName: 'googleCalendar',
      optionsPath: '/googlecalendar',
      refresh: parseFloat(items.googleCalendarRefresh) || 15,
      components: localStorage.googleCalendarComponents || null,
      calendars: items.googleCalendarCalendars,
      days: parseInt(items.googleCalendarDays) || 6,
      panelWidth: parseFloat(items.googleCalendarWidth) || 400,
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
      error: localStorage.gmailError || null,
      active: typeof items.gmailActive === 'boolean' ? items.gmailActive : true,
      functionName: 'gmail',
      optionsPath: '/gmail',
      refresh: parseFloat(items.gmailRefresh) || 15,
      components: localStorage.gmailComponents || null,
      nextPage: localStorage.Gmail_page || null,
      panelWidth: parseFloat(items.gmailWidth) || 400,
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
      active: typeof items.couchPotatoActive === 'boolean' ? items.couchPotatoActive : true,
      refresh: parseFloat(items.couchPotatoRefresh) || 15,
      address: items.couchPotatoAddress,
      port: items.couchPotatoPort,
      key: items.couchPotatoKey,
      panelWidth: parseFloat(items.couchPotatoWidth) || 400,
      error: localStorage.couchPotatoError || null,
      functionName: 'couchPotato',
      optionsPath: '/couchpotato',
      components: localStorage.couchPotatoComponents || null,
      actions: []
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
      logo: require('img/DN_header.png'),
      error: localStorage.designerNewsError || null,
      active: typeof items.designerNewsActive === 'boolean' ? items.designerNewsActive : true,
      functionName: 'designerNews',
      optionsPath: '/designernews',
      refresh: parseFloat(items.designerNewsRefresh) || 15,
      components: localStorage.designerNewsComponents,
      panelWidth: parseFloat(items.designerNewsWidth) || 400,
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
      active: typeof items.hackernewsActive === 'boolean' ? items.hackernewsActive : true,
      functionName: 'hackernews',
      optionsPath: '/hackernews',
      refresh: parseFloat(items.HN_refresh) || 15,
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
      active: typeof items.githubActive === 'boolean' ? items.githubActive : true,
      functionName: 'github',
      optionsPath: '/github',
      refresh: parseFloat(items.GH_refresh) || 15,
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
      active: typeof items.productHuntActive === 'boolean' ? items.productHuntActive : true,
      functionName: 'productHunt',
      optionsPath: '/producthunt',
      refresh: parseFloat(items.PH_refresh) || 15,
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
      active: typeof items.dribbleActive === 'boolean' ? items.dribbleActive : true,
      functionName: 'dribbble',
      optionsPath: '/dribbble',
      refresh: parseFloat(items.DR_refresh) || 15,
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
      active: typeof items.redditActive === 'boolean' ? items.redditActive : true,
      functionName: 'reddit',
      optionsPath: '/reddit',
      refresh: parseFloat(items.RD_refresh) || 15,
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
      active: typeof items.nzbgetActive === 'boolean' ? items.nzbgetActive : true,
      downloadStatus: localStorage.NzbgetStatusHTML || null || true,
      address: items.NG_address,
      port: items.NG_port,
      username: items.NG_username,
      password: items.NG_password,
      panelWidth: parseFloat(items.NG_width) || 400,
      optionsPath: '/nzbget',
      actions: [],
      queue: {
        error: localStorage.NzbgetQueue_error || null,
        functionName: 'nzbgetQueue',
        refresh: parseFloat(items.NGQ_refresh) || 15,
        JSON: JSON.parse(localStorage.NzbgetQueue || null),
        HTML: localStorage.NzbgetQueueHTML || null
      },
      history: {
        error: localStorage.NzbgetHistory_error || null,
        functionName: 'nzbgetHistory',
        refresh: parseFloat(items.NGH_refresh) || 15,
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
      active: typeof items.sonarrActive === 'boolean' ? items.sonarrActive : true,
      functionName: 'sonarr',
      optionsPath: '/sonarr',
      refresh: parseFloat(items.SO_refresh) || 15,
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
  var apiUrl = tempUrl + '/api/' + data.key;

  return {
    url: url,
    apiUrl: apiUrl
  };
}

export default serviceData;
