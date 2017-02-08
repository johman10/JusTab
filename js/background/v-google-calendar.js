import moment from 'moment';
import ajax from 'modules/ajax';

export default {
  computed: {
    service () {
      return this.services[0];
    },
    calendarUrls () {
      return this.service.calendars.map((url) => { return 'https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(url) + '/events'; });
    }
  },
  methods: {
    googleCalendar () {
      return this.googleCalendarToken()
        .then(this.getEvents)
        .then(this.googleCalendarComponents)
        .catch((error) => {
          if (error) console.error(error);
          localStorage.setItem('googleCalendarError', true);
        });
    },

    googleCalendarToken() {
      return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({'interactive': true}, function (token) {
          if (!token) reject();
          resolve(token);
        });
      });
    },

    getEvents (token) {
      return new Promise((resolve, reject) => {
        var dateStart = new Date().toISOString();
        var dateEnd = moment(new Date()).add(this.service.days, 'days').endOf('day').toISOString();
        var events = [];
        var promises = [];
        var apiUrl;

        this.calendarUrls.forEach((url, i) => {
          apiUrl = url + '?&oauth_token=' + token + '&timeMin=' + dateStart + '&timeMax=' + dateEnd + '&orderBy=startTime&singleEvents=true';
          promises.push(
            ajax('GET', apiUrl).then((data) => {
              console.log(data);
              localStorage.setItem('googleCalendarError', false);
              events = events.concat(data.items);
            }, reject)
          );
        });

        Promise.all(promises)
          .then(function() {
            resolve(events.sort(sortCalendarResults));
          })
          .catch(reject);
      });
    },

    googleCalendarComponents (events) {
      let components = [];
      // Start with yesterday to include today in calendar
      let loopDate = moment().subtract(1, 'day');
      let eventStart;
      let eventStartTime;
      let eventEndTime;

      events.forEach((event) => {
        eventStart = moment(event.start.dateTime || event.start.date);
        // Create header if new loopDate;
        if (eventStart.isAfter(loopDate, 'day')) {
          components.push({
            name: 'v-header',
            props: {
              text: eventStart.calendar()
            }
          });
        }

        // Create item
        const itemComponent = {
          name: 'v-panel-item',
          props: {
            title: ''
          }
        };

        if (event.start.dateTime) {
          eventStartTime = moment(event.start.dateTime).format('HH:mm');
          eventEndTime = moment(event.end.dateTime).format('HH:mm');
          itemComponent.props.title += `${eventStartTime} - ${eventEndTime} `;
        }
        itemComponent.props.title += event.summary;
        itemComponent.props.components = [{
          name: 'v-panel-item-button',
          props: {
            url: event.htmlLink,
            iconClass: 'edit-icon'
          }
        }];
        if (event.location) {
          itemComponent.props.collapseText = event.location;
        }

        components.push(itemComponent);

        loopDate = eventStart;
      });

      localStorage.setItem('googleCalendarComponents', JSON.stringify(components));
    },

  }
};

function sortCalendarResults (a, b) {
  return new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date);
}
