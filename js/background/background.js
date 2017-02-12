import serviceData from 'modules/serviceData';
import moment from 'moment';
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import store from 'store/index';
import vGoogleCalendar from 'js/background/v-google-calendar';
import vCouchPotato from 'js/background/v-couch-potato';
import vGmail from 'js/background/v-gmail';
import vDesignerNews from 'js/background/v-designer-news';

window.vueInstance = new Vue({
  store,
  mixins: [
    vGoogleCalendar,
    vCouchPotato,
    vGmail,
    vDesignerNews
  ],
  computed: {
    ...mapState(['services', 'chromePort'])
  },
  beforeCreate() {
    this.$store.dispatch('loadServices');
    chrome.runtime.onConnect.addListener((port) => {
      port.onMessage.addListener(this.startRefresh);
    });
  },
  methods: {
    startRefresh (msg) {
      if (msg.name === 'startRefresh') {
        const service = this.services.find((s) => { return s.id === msg.serviceId });
        this[service.functionName]().then(() => {
          this.finishRefresh(msg);
        });
      }
    },
    finishRefresh (msg) {
      chrome.tabs.query({ url: 'chrome://newtab/' }, function(tabs) {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, { name: 'finishRefresh', serviceId: msg.serviceId }, function () {});
        })
      });
    }
  },
  render: h => h()
});

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

  chrome.runtime.onStartup.addListener(function() {
    createAlarms();
  });

  chrome.alarms.onAlarm.addListener(function(alarm) {
    for(service in serviceData) {
      if (serviceData[key].containerId == "sabnzbd" || serviceData[key].containerId == "nzbget") {
        if (serviceData[key].queue.alarmName == alarm.name) {
          window[serviceData[key].queue.bgFunctionName]();
        }
        else if (serviceData[key].history.alarmName == alarm.name) {
          window[serviceData[key].history.bgFunctionName]();
        }
      }
      else if (serviceData[key].containerId == "couchpotato") {
        if (serviceData[key].snatched.alarmName == alarm.name) {
          window[serviceData[key].snatched.bgFunctionName]();
        }
        else if (serviceData[key].wanted.alarmName == alarm.name) {
          window[serviceData[key].wanted.bgFunctionName]();
        }
      }
      else if (serviceData[key].alarmName == alarm.name) {
        window[serviceData[key].bgFunctionName]();
      }
    };
  });
});

chrome.runtime.onInstalled.addListener(function(event) {
  createAlarms();

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

function createAlarms() {
  chrome.alarms.clearAll(function() {
    for (var key in serviceData) {
      if (serviceData[key].status && (serviceData[key].containerId == "sabnzbd" || serviceData[key].containerId == "nzbget")) {
        chrome.alarms.create(serviceData[key].queue.alarmName, {periodInMinutes: serviceData[key].queue.refresh});
        chrome.alarms.create(serviceData[key].history.alarmName, {periodInMinutes: serviceData[key].history.refresh});
      }
      else if (serviceData[key].status && serviceData[key].containerId == "couchpotato") {
        chrome.alarms.create(serviceData[key].snatched.alarmName, {periodInMinutes: serviceData[key].refresh});
        chrome.alarms.create(serviceData[key].wanted.alarmName, {periodInMinutes: serviceData[key].refresh});
      }
      else if (serviceData[key].status) {
        chrome.alarms.create(serviceData[key].alarmName, {periodInMinutes: serviceData[key].refresh});
      }
    };
  });
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
