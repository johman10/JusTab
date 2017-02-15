import moment from 'moment';
import ajax from 'modules/ajax';

export default {
  computed: {
    googleCalendarService () {
      return this.services.find(s => s.id === 1);
    },
    calendarUrls () {
      return this.googleCalendarService.calendars.map((url) => {
        return 'https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(url) + '/events';
      });
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

    googleCalendersList () {
      return this.googleCalendarToken()
        .then(this.getCalendars)
        .then(this.googleCalendarsListComponents);
    },

    getCalendars (token) {
      var url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList?oauth_token=' + token;
      return ajax('GET', url);
    },

    googleCalendarsListComponents (data) {
      let components = [];
      data.items.forEach((calendar) => {
        components.push({
          name: 'v-checkbox',
          props: {
            label: calendar.summary,
            value: calendar.id
          }
        });
      });
      return components;
    },

    googleCalendarToken () {
      return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({'interactive': true}, function (token) {
          if (!token) reject();
          resolve(token);
        });
      });
    },

    getEvents (token) {
      var dateStart = new Date().toISOString();
      var dateEnd = moment(new Date()).add(this.googleCalendarService.days, 'days').endOf('day').toISOString();
      var promises = [];
      var apiUrl;

      this.calendarUrls.forEach((url) => {
        apiUrl = url + '?&oauth_token=' + token + '&timeMin=' + dateStart + '&timeMax=' + dateEnd + '&orderBy=startTime&singleEvents=true';
        promises.push(ajax('GET', apiUrl));
      });

      return Promise.all(promises)
        .then(function(calendars) {
          localStorage.setItem('googleCalendarError', false);
          let eventArrays = calendars.map(calendar => calendar.items);
          return [].concat.apply([], eventArrays).sort(sortCalendarResults);
        });
    },

    googleCalendarComponents (events) {
      let components = [];
      // Start with yesterday to include today in calendar
      let loopDate = moment().subtract(1, 'day');
      let eventStartTime;
      let eventEndTime;

      events.forEach((event, index) => {
        let eventStart = moment(event.start.dateTime || event.start.date);
        // Create header if new loopDate;
        if (eventStart.isAfter(loopDate, 'day')) {
          components.push({
            name: 'v-panel-subheader',
            props: {
              text: eventStart.calendar()
            }
          });
          loopDate = eventStart;
        } else if (index === 0) {
          components.push({
            name: 'v-panel-subheader',
            props: {
              text: moment().calendar()
            }
          });
          loopDate = moment();
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
      });

      localStorage.setItem('googleCalendarComponents', JSON.stringify(components));
    },

  }
};

function sortCalendarResults (a, b) {
  return new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date);
}
