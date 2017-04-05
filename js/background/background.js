import moment from 'moment';
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import store from 'store/index';
import vGoogleCalendar from 'js/background/v-google-calendar';
import vCouchPotato from 'js/background/v-couch-potato';
import vGmail from 'js/background/v-gmail';
import vDesignerNews from 'js/background/v-designer-news';
import vHackerNews from 'js/background/v-hacker-news';
import vGithub from 'js/background/v-github';
import vProductHunt from 'js/background/v-product-hunt';
import vDribbble from 'js/background/v-dribbble';
import vReddit from 'js/background/v-reddit';
import vNzbget from 'js/background/v-nzbget';
import vSonarr from 'js/background/v-sonarr';

let vueInstance = new Vue({
  store,
  mixins: [
    vGoogleCalendar,
    vCouchPotato,
    vGmail,
    vDesignerNews,
    vHackerNews,
    vGithub,
    vProductHunt,
    vDribbble,
    vReddit,
    vNzbget,
    vSonarr
  ],
  computed: {
    ...mapState(['services'])
  },
  beforeCreate() {
    this.$store.dispatch('loadServices');
  },
  methods: {
    ...mapActions([
      'reloadService',
      'loadServices'
    ]),
    respondToMessage (msg) {
      if (msg.name === 'startRefresh') {
        this.startRefresh(msg.serviceId);
      } else if (msg.name === 'loadServices') {
        this.loadServices();
      } else if (msg.name === 'reloadService') {
        this.reloadService({ serviceId: msg.serviceId });
      } else if (msg.name === 'setAlarms') {
        this.setAlarms();
      } else if (msg.name === 'afterUpdateServiceSettings') {
        this.reloadService({ serviceId: msg.serviceId });
        // Wait until the service is reloaded before triggering a refresh
        // Hacky. I know.
        setTimeout(() => {
          this.startRefresh(msg.serviceId);
          this.setAlarms();
        }, 500);
      }
    },
    startRefresh (serviceId) {
      const service = this.services.find(s => s.id === serviceId);
      this[service.functionName]()
        .then(() => {
          this.finishRefresh(serviceId);
        });
    },
    finishRefresh (serviceId) {
      chrome.tabs.query({ url: 'chrome://newtab/' }, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, { name: 'finishRefresh', serviceId: serviceId });
        });
      });
    },
    setAlarms () {
      chrome.alarms.clearAll(() => {
        this.services.forEach((service) => {
          if (service.active) {
            chrome.alarms.create(service.id.toString(), {periodInMinutes: service.refresh});
          }
        });
      });
    }
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  vueInstance.respondToMessage({ name: 'startRefresh', serviceId: parseInt(alarm.name) });
});

chrome.runtime.onConnect.addListener((port) => {
  // Prevent double event listeners when another connection is opened
  if (!chrome.runtime.onMessage.hasListeners()) {
    chrome.runtime.onMessage.addListener(vueInstance.respondToMessage);
  }

  port.onDisconnect.addListener(() => {
    chrome.runtime.onMessage.removeListener(vueInstance.respondToMessage);
  });
});

moment.updateLocale('en', {
  calendar : {
    lastDay : '[Yesterday]',
    sameDay : '[Today]',
    nextDay : '[Tomorrow]',
    lastWeek : '[last] dddd',
    nextWeek : 'dddd',
    sameElse : 'MMM D'
  }
});

vueInstance.setAlarms();

chrome.runtime.onInstalled.addListener(function(event) {
  if (event.reason === 'install') {
    openOptions();
  }
  else if (event.reason === 'update') {
    createNotification(
      { type: 'basic',
        title: 'JusTab is updated',
        message: 'Click here to see the changelog.',
        iconUrl: '../../img/app_icons/JusTab-128x128.png'
      },
      chrome.notifications.onClicked.addListener(function() {
        openOptions();
      })
    );
  }
});

function openOptions() {
  chrome.tabs.create({
    'url': chrome.extension.getURL('options.html')
  });
}

function createNotification(options, callback) {
  if (!callback) {
    callback = function() {};
  }

  chrome.notifications.create(getNotificationId(), options, callback);
}

function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}
