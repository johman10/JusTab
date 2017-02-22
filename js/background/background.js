import serviceData from 'modules/serviceData';
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

    chrome.alarms.onAlarm.addListener(function(alarm) {
      chrome.runtime.sendMessage({ name: 'startRefresh', serviceId: parseInt(alarm.name) });
    });

    chrome.runtime.onConnect.addListener((port) => {
      chrome.runtime.onMessage.addListener(this.respondToMessage);
    });
  },
  methods: {
    respondToMessage (msg) {
      if (msg.name === 'startRefresh') {
        const service = this.services.find(s => s.id === msg.serviceId);
        this[service.functionName]().then(() => {
          this.finishRefresh(msg);
        });
      } else if (msg.name === 'loadServices') {
        this.$store.dispatch('loadServices');
      } else if (msg.name === 'reloadService') {
        this.$store.dispatch('reloadService', { serviceId: msg.serviceId });
        this.setAlarms();
      }
    },
    finishRefresh (msg) {
      chrome.runtime.sendMessage({ name: 'finishRefresh', serviceId: msg.serviceId });
    },
    setAlarms () {
      chrome.alarms.clearAll(() => {
        this.services.forEach((service) => {
          if (service.active) {
            chrome.alarms.create(service.id.toString(), {periodInMinutes: service.refresh});
          }
        })
      });
    }
  }
});

vueInstance.setAlarms();

Promise.all(serviceData).then(function() {
  // Settings for moment.js
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
});

chrome.runtime.onInstalled.addListener(function(event) {
  if (event.reason == "install") {
    openOptions();
  }
  else if (event.reason == "update") {
    createNotification(
      { type: "basic",
        title: "JusTab is updated",
        message: "Click here to see the changelog.",
        iconUrl: "../../img/app_icons/JusTab-128x128.png"
      },
      chrome.notifications.onClicked.addListener(function() {
        openOptions();
      })
    );
  }
});

function htmlEncode(string) {
  // return $('<div/>').text(string).html();
  return document.createElement( 'a' ).appendChild(
           document.createTextNode(string)
         ).parentNode.innerHTML;
}

function openOptions() {
  chrome.tabs.create({
    'url': chrome.extension.getURL("options.html") + '#support'
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
