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
      error: localStorage.hackerNewsError || null,
      active: typeof items.hackernewsActive === 'boolean' ? items.hackernewsActive : true,
      functionName: 'hackerNews',
      optionsPath: '/hackernews',
      refresh: parseFloat(items.hackerNewsRefresh) || 15,
      components: localStorage.hackerNewsComponents,
      panelWidth: parseFloat(items.hackerNewsWidth) || 400,
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
      error: localStorage.githubError || null,
      active: typeof items.githubActive === 'boolean' ? items.githubActive : true,
      functionName: 'github',
      optionsPath: '/github',
      refresh: parseFloat(items.githubRefresh) || 15,
      panelWidth: parseFloat(items.githubWidth) || 400,
      components: localStorage.githubComponents,
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
      error: localStorage.productHuntError || null,
      active: typeof items.productHuntActive === 'boolean' ? items.productHuntActive : true,
      functionName: 'productHunt',
      optionsPath: '/producthunt',
      refresh: parseFloat(items.productHuntRefresh) || 15,
      panelWidth: parseFloat(items.productHuntWidth) || 400,
      components: localStorage.productHuntComponents,
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
      error: localStorage.dribbbleError || null,
      active: typeof items.dribbleActive === 'boolean' ? items.dribbleActive : true,
      functionName: 'dribbble',
      optionsPath: '/dribbble',
      refresh: parseFloat(items.dribbbleRefresh) || 15,
      components: localStorage.dribbbleComponents,
      smallImages: items.dribbbleSmallImages,
      gifs: items.dribbbleGifs,
      panelWidth: parseFloat(items.dribbbleWidth) || 400,
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
      error: localStorage.redditError || null,
      active: typeof items.redditActive === 'boolean' ? items.redditActive : true,
      functionName: 'reddit',
      optionsPath: '/reddit',
      refresh: parseFloat(items.redditRefresh) || 15,
      components: localStorage.redditComponents,
      panelWidth: parseFloat(items.redditWidth) || 400,
      subreddit: items.redditSubreddit || 'all',
      sorting: items.redditSorting || 'Hot',
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
      // downloadStatus: localStorage.NzbgetStatusHTML || null || true,
      address: items.nzbgetAddress,
      port: items.nzbgetPort,
      username: items.nzbgetUsername,
      password: items.nzbgetPassword,
      panelWidth: parseFloat(items.nzbgetWidth) || 400,
      optionsPath: '/nzbget',
      actions: [],
      error: localStorage.nzbgetError || null,
      functionName: 'nzbget',
      refresh: parseFloat(items.nzbgetRefresh) || 15,
      components: localStorage.nzbgetComponents
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
      error: localStorage.sonarrError || null,
      active: typeof items.sonarrActive === 'boolean' ? items.sonarrActive : true,
      functionName: 'sonarr',
      optionsPath: '/sonarr',
      refresh: parseFloat(items.sonarrRefresh) || 15,
      address: items.sonarrAddress,
      port: items.sonarrPort,
      key: items.sonarrKey,
      panelWidth: parseFloat(items.sonarrWidth) || 400,
      components: localStorage.sonarrComponents,
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
  var apiUrl;
  if (data.key) {
    apiUrl = tempUrl + '/api/' + data.key;
  } else if (data.username && data.password) {
    // TODO: Make sure tempUrl doesn't start with https:// instead it should be before the login data;
    apiUrl = `${data.username}:${data.password}@` + tempUrl;
  }

  return {
    url: url,
    apiUrl: apiUrl
  };
}

export default serviceData;
