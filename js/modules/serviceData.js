import urlNormalize from 'modules/url-normalize';
import gcHeader from 'img/GC_header.svg';
import gmHeader from 'img/GM_header.svg';
import cpHeader from 'img/CP_header.webp';
import dnHeader from 'img/DN_header.svg';
import hnHeader from 'img/HN_header.svg';
import ghHeader from 'img/GH_header.svg';
import phHeader from 'img/PH_header.svg';
import rdHeader from 'img/RD_header.svg';
import ngHeader from 'img/NG_header.webp';
import soHeader from 'img/SO_header.svg';
import tmHeader from 'img/TM_header.webp';
import raHeader from 'img/RA_header.svg';

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
      logo: gcHeader,
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
      url: urlNormalize('https://gmail.com/'),
      color: '#e04a3f',
      logo: gmHeader,
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
    return {
      id: 3,
      name: 'CouchPotato',
      color: '#4e5969',
      logo: cpHeader,
      active: typeof items.couchPotatoActive === 'boolean' ? items.couchPotatoActive : true,
      refresh: parseFloat(items.couchPotatoRefresh) || 15,
      url: urlNormalize(items.couchPotatoUrl),
      key: items.couchPotatoKey,
      panelWidth: parseFloat(items.couchPotatoWidth) || 400,
      error: localStorage.couchPotatoError || null,
      functionName: 'couchPotato',
      optionsPath: '/couchpotato',
      components: localStorage.couchPotatoComponents || null,
      actions: []
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
      logo: dnHeader,
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
      url: urlNormalize('https://news.ycombinator.com/'),
      color: '#f60',
      logo: hnHeader,
      error: localStorage.hackerNewsError || null,
      active: typeof items.hackerNewsActive === 'boolean' ? items.hackerNewsActive : true,
      functionName: 'hackerNews',
      optionsPath: '/hackernews',
      refresh: parseFloat(items.hackerNewsRefresh) || 15,
      components: localStorage.hackerNewsComponents,
      panelWidth: parseFloat(items.hackerNewsWidth) || 400,
      actions: ['openUnread'],
      sorting: items.hackerNewsSorting || 'Top'
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
      logo: ghHeader,
      error: localStorage.githubError || null,
      active: typeof items.githubActive === 'boolean' ? items.githubActive : true,
      functionName: 'github',
      optionsPath: '/github',
      refresh: parseFloat(items.githubRefresh) || 15,
      panelWidth: parseFloat(items.githubWidth) || 400,
      components: localStorage.githubComponents,
      actions: ['openUnread'],
      time: items.githubTime || 'weekly'
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
      logo: phHeader,
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

export let reddit = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 11,
      name: 'Reddit',
      url: urlNormalize('https://www.reddit.com/'),
      color: '#CFE3FA',
      logo: rdHeader,
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
      actions: ['openUnread']
    };
  });
};

export let nzbget = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 12,
      name: 'NZBGet',
      color: '#282828',
      logo: ngHeader,
      active: typeof items.nzbgetActive === 'boolean' ? items.nzbgetActive : true,
      url: urlNormalize(items.nzbgetUrl),
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
  });
};

export let sonarr = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 13,
      name: 'Sonarr',
      color: '#5FB9EF',
      logo: soHeader,
      error: localStorage.sonarrError || null,
      active: typeof items.sonarrActive === 'boolean' ? items.sonarrActive : true,
      functionName: 'sonarr',
      optionsPath: '/sonarr',
      refresh: parseFloat(items.sonarrRefresh) || 15,
      url: urlNormalize(items.sonarrUrl),
      key: items.sonarrKey,
      panelWidth: parseFloat(items.sonarrWidth) || 400,
      components: localStorage.sonarrComponents,
      actions: []
    };
  });
};

export let transmission = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 14,
      name: 'Transmission',
      color: '#B50D11',
      logo: tmHeader,
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

export let radarr = function() {
  return chromeStorage().then(function(items) {
    return {
      id: 15,
      name: 'Radarr',
      color: '#FFC230',
      logo: raHeader,
      error: localStorage.radarrError || null,
      active: typeof items.radarrActive === 'boolean' ? items.radarrActive : true,
      functionName: 'radarr',
      optionsPath: '/radarr',
      refresh: parseFloat(items.radarrRefresh) || 15,
      url: urlNormalize(items.radarrUrl),
      key: items.radarrKey,
      panelWidth: parseFloat(items.radarrWidth) || 400,
      components: localStorage.radarrComponents,
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
  reddit,
  nzbget,
  sonarr,
  transmission,
  radarr
];

export default serviceData;
