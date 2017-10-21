import urlNormalize from 'modules/url-normalize';

function chromeStorage () {
  return new Promise(function(resolve) {
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
      url: urlNormalize('https://calendar.google.com/'),
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
      actions: [],
      loadMore: false
    };
  });
};

export let gmail = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 2,
      name: 'Gmail',
      url: urlNormalize('https://gmail.com/'),
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
      actions: [],
      loadMore: true
    };
  });
};

export let couchPotato = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 3,
      name: 'CouchPotato',
      color: '#4e5969',
      logo: require('img/CP_header.webp'),
      active: typeof items.couchPotatoActive === 'boolean' ? items.couchPotatoActive : true,
      refresh: parseFloat(items.couchPotatoRefresh) || 15,
      url: urlNormalize(items.couchPotatoUrl),
      key: items.couchPotatoKey,
      panelWidth: parseFloat(items.couchPotatoWidth) || 400,
      error: localStorage.couchPotatoError || null,
      functionName: 'couchPotato',
      optionsPath: '/couchpotato',
      components: localStorage.couchPotatoComponents || null,
      actions: [],
      loadMore: true
    };
  });
};

export let designerNews = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 6,
      name: 'Designer News',
      url: urlNormalize('https://www.designernews.co/'),
      color: '#1c52a2',
      logo: require('img/DN_header.svg'),
      error: localStorage.designerNewsError || null,
      active: typeof items.designerNewsActive === 'boolean' ? items.designerNewsActive : true,
      functionName: 'designerNews',
      optionsPath: '/designernews',
      refresh: parseFloat(items.designerNewsRefresh) || 15,
      components: localStorage.designerNewsComponents,
      panelWidth: parseFloat(items.designerNewsWidth) || 400,
      actions: ['openUnread'],
      loadMore: false
    };
  });
};

export let hackerNews = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 7,
      name: 'Hacker News',
      url: urlNormalize('https://news.ycombinator.com/'),
      color: '#f60',
      logo: require('img/HN_header.svg'),
      error: localStorage.hackerNewsError || null,
      active: typeof items.hackerNewsActive === 'boolean' ? items.hackerNewsActive : true,
      functionName: 'hackerNews',
      optionsPath: '/hackernews',
      refresh: parseFloat(items.hackerNewsRefresh) || 15,
      components: localStorage.hackerNewsComponents,
      panelWidth: parseFloat(items.hackerNewsWidth) || 400,
      actions: ['openUnread'],
      sorting: items.hackerNewsSorting || 'Top',
      loadMore: false
    };
  });
};

export let github = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 8,
      name: 'Github',
      url: urlNormalize('https://github.com/trending/'),
      color: '#000',
      logo: require('img/GH_header.svg'),
      error: localStorage.githubError || null,
      active: typeof items.githubActive === 'boolean' ? items.githubActive : true,
      functionName: 'github',
      optionsPath: '/github',
      refresh: parseFloat(items.githubRefresh) || 15,
      panelWidth: parseFloat(items.githubWidth) || 400,
      components: localStorage.githubComponents,
      actions: ['openUnread'],
      loadMore: false
    };
  });
};

export let productHunt = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 9,
      name: 'Product Hunt',
      url: urlNormalize('https://www.producthunt.com/'),
      color: '#df5337',
      logo: require('img/PH_header.svg'),
      error: localStorage.productHuntError || null,
      active: typeof items.productHuntActive === 'boolean' ? items.productHuntActive : true,
      functionName: 'productHunt',
      optionsPath: '/producthunt',
      refresh: parseFloat(items.productHuntRefresh) || 15,
      panelWidth: parseFloat(items.productHuntWidth) || 400,
      components: localStorage.productHuntComponents,
      actions: ['openUnread'],
      loadMore: false
    };
  });
};

export let dribbble = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 10,
      name: 'Dribbble',
      url: urlNormalize('https://dribbble.com/'),
      color: '#ea4c89',
      logo: require('img/DR_header.svg'),
      error: localStorage.dribbbleError || null,
      active: typeof items.dribbbleActive === 'boolean' ? items.dribbbleActive : true,
      functionName: 'dribbble',
      optionsPath: '/dribbble',
      refresh: parseFloat(items.dribbbleRefresh) || 15,
      components: localStorage.dribbbleComponents,
      smallImages: items.dribbbleSmallImages,
      gifs: items.dribbbleGifs,
      panelWidth: parseFloat(items.dribbbleWidth) || 400,
      actions: ['openUnread'],
      perPage: 25,
      loadMore: true
    };
  });
};

export let reddit = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 11,
      name: 'Reddit',
      url: urlNormalize('https://www.reddit.com/'),
      color: '#CFE3FA',
      logo: require('img/RD_header.svg'),
      error: localStorage.redditError || null,
      active: typeof items.redditActive === 'boolean' ? items.redditActive : true,
      functionName: 'reddit',
      optionsPath: '/reddit',
      refresh: parseFloat(items.redditRefresh) || 15,
      components: localStorage.redditComponents,
      panelWidth: parseFloat(items.redditWidth) || 400,
      subreddit: items.redditSubreddit || 'all',
      nsfw: typeof items.redditNsfw === 'boolean' ? items.redditNsfw : false,
      sorting: items.redditSorting || 'Hot',
      actions: ['openUnread'],
      loadMore: false
    };
  });
};

export let nzbget = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 12,
      name: 'NZBGet',
      color: '#282828',
      logo: require('img/NG_header.webp'),
      active: typeof items.nzbgetActive === 'boolean' ? items.nzbgetActive : true,
      url: urlNormalize(items.nzbgetUrl),
      username: items.nzbgetUsername,
      password: items.nzbgetPassword,
      panelWidth: parseFloat(items.nzbgetWidth) || 400,
      optionsPath: '/nzbget',
      actions: [],
      loadMore: true,
      error: localStorage.nzbgetError || null,
      functionName: 'nzbget',
      refresh: parseFloat(items.nzbgetRefresh) || 15,
      components: localStorage.nzbgetComponents
    };
  });
};

export let sonarr = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 13,
      name: 'Sonarr',
      color: '#5FB9EF',
      logo: require('img/SO_header.svg'),
      error: localStorage.sonarrError || null,
      active: typeof items.sonarrActive === 'boolean' ? items.sonarrActive : true,
      functionName: 'sonarr',
      optionsPath: '/sonarr',
      refresh: parseFloat(items.sonarrRefresh) || 15,
      url: urlNormalize(items.sonarrUrl),
      key: items.sonarrKey,
      panelWidth: parseFloat(items.sonarrWidth) || 400,
      components: localStorage.sonarrComponents,
      actions: [],
      loadMore: false
    };
  });
};

export let transmission = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 14,
      name: 'Transmission',
      color: '#B50D11',
      logo: require('img/TM_header.webp'),
      error: localStorage.transmissionError || null,
      active: typeof items.transmissionActive === 'boolean' ? items.transmissionActive : true,
      functionName: 'transmission',
      optionsPath: '/transmission',
      refresh: parseFloat(items.transmissionRefresh) || 15,
      url: urlNormalize(items.transmissionUrl),
      username: items.transmissionUsername,
      password: items.transmissionPassword,
      panelWidth: parseFloat(items.transmissionWidth) || 400,
      components: localStorage.transmissionComponents,
      actions: []
    };
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
  sonarr,
  transmission
];

export default serviceData;
