import dayjs from 'dayjs';
import ajax from 'modules/ajax';
import dateFormat from 'modules/date-format';

export default {
  computed: {
    googleCalendarService() {
      return this.services.find(s => s.id === 1);
    },
    calendarUrls() {
      return this.googleCalendarService.calendars.map(url => {
        return (
          'https://www.googleapis.com/calendar/v3/calendars/' +
          encodeURIComponent(url) +
          '/events'
        );
      });
    },
  },
  methods: {
    googleCalendar() {
      localStorage.setItem('googleCalendarError', false);
      return this.googleCalendarToken()
        .then(this.getEvents)
        .then(this.googleCalendarComponents)
        .catch(error => {
          if (error) console.error(error); // eslint-disable-line no-console
          localStorage.setItem('googleCalendarError', true);
        });
    },

    googleCalendersList() {
      return this.googleCalendarToken()
        .then(this.getCalendars)
        .then(data => {
          return data.items;
        });
    },

    getCalendars(token) {
      var url =
        'https://www.googleapis.com/calendar/v3/users/me/calendarList?oauth_token=' +
        token;
      return ajax('GET', url);
    },

    googleCalendarToken() {
      return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, function(token) {
          if (!token) return reject();
          resolve(token);
        });
      });
    },

    getEvents(token) {
      const dateStart = new Date().toISOString();
      const dateEnd = dayjs(new Date())
        .add(this.googleCalendarService.days, 'days')
        .endOf('day')
        .toISOString();
      const params = `oauth_token=${token}&timeMin=${dateStart}&timeMax=${dateEnd}&orderBy=startTime&singleEvents=true`;
      const promises = [];

      this.calendarUrls.forEach(url => {
        const apiUrl = `${url}?${params}`;
        promises.push(ajax('GET', apiUrl));
      });

      return Promise.all(promises).then(function(calendars) {
        let eventArrays = calendars.map(calendar => calendar.items);
        return [].concat.apply([], eventArrays).sort(sortCalendarResults);
      });
    },

    googleCalendarComponents(events) {
      let components = [];
      // Start with yesterday to include today in calendar
      let loopDate = dayjs().subtract(1, 'day');
      let eventStartTime;
      let eventEndTime;

      events.forEach((event, index) => {
        let eventStart = dayjs(event.start.dateTime || event.start.date);
        // Create header if new loopDate;
        if (eventStart.diff(loopDate, 'day') > 0) {
          components.push({
            name: 'v-panel-subheader',
            props: {
              text: dateFormat(eventStart),
            },
          });
          loopDate = eventStart;
        } else if (index === 0) {
          components.push({
            name: 'v-panel-subheader',
            props: {
              text: dateFormat(dayjs()),
            },
          });
          loopDate = dayjs();
        }

        // Create item
        const itemComponent = {
          name: 'v-panel-item',
          props: {
            title: '',
          },
        };

        if (event.start.dateTime) {
          eventStartTime = dayjs(event.start.dateTime).format('HH:mm');
          eventEndTime = dayjs(event.end.dateTime).format('HH:mm');
          itemComponent.props.title += `${eventStartTime} - ${eventEndTime} `;
        }
        itemComponent.props.title += event.summary ?? 'Busy';
        itemComponent.props.components = [
          {
            name: 'v-panel-item-button',
            props: {
              url: event.htmlLink,
              iconClass: 'edit-icon',
            },
          },
        ];
        if (event.location) {
          itemComponent.props.collapseText = event.location;
        }

        components.push(itemComponent);
      });

      localStorage.setItem(
        'googleCalendarComponents',
        JSON.stringify(components),
      );
    },
  },
};

function sortCalendarResults(a, b) {
  return (
    new Date(a.start.dateTime || a.start.date) -
    new Date(b.start.dateTime || b.start.date)
  );
}
