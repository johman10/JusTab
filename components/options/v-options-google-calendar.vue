<template>
  <div v-if="service">
    {{ service.name }}
    <component @change="onCalendarChange" v-for="(checkbox, index) in calendarCheckboxes" :is="checkbox.name" :label="checkbox.props.label" :value="checkbox.props.value" :checked="checkedCalendar(checkbox.props.value)"></component>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import vGoogleCalendar from 'js/background/v-google-calendar';
  import vCheckbox from 'v-checkbox';

  export default {
    mixins: [
      vGoogleCalendar
    ],
    components: {
      'v-checkbox': vCheckbox
    },
    computed: {
      ...mapState({
        services: 'services',
        service (state) {
          return state.services.find((s) => s.id === 1);
        }
      }),
      calendars () {
        if (!this.service) return [];
        return this.service.calendars || [];
      }
    },

    data () {
      return {
        calendarCheckboxes: []
      }
    },

    methods: {
      ...mapActions([
        'updateService'
      ]),
      onCalendarChange (value) {
        let newCalendars = [].concat(this.calendars);
        let changes = {};

        if (this.calendars.includes(value)) {
          let index = newCalendars.indexOf(value);
          newCalendars.splice(index, 1);
        } else {
          newCalendars.push(value);
        }
        changes['googleCalendarCalendars'] = newCalendars;
        this.updateService({ serviceId: this.service.id, changes });
      },
      checkedCalendar (id) {
        if (!this.service) return false;
        return this.calendars.includes(id);
      }
    },

    mounted () {
      this.googleCalendersList().then((calendarListCheckboxes) => {
        this.calendarCheckboxes = calendarListCheckboxes;
      });
    }
  }
    // // Build list of calendars
    // document.querySelector('.calendar-loading').innerHTML = serviceData.spinner;

    // chrome.identity.getAuthToken({ 'interactive': true },function (token) {
    //   var url = "https://www.googleapis.com/calendar/v3/users/me/calendarList?oauth_token=" + token;
    //   var checkboxContainer = document.querySelector('.calendar-select-container');
    //   var events = "";

    //   ajax('GET', url)
    //   .then(function(data) {
    //     document.querySelector('.calendar-loading').style.display = 'none';

    //     var calendarsStorage = serviceData.GC.calendars;
    //     var checked;

    //     data.items.forEach(function(calendar) {
    //       checked = calendarsStorage.indexOf(calendar.id) > -1;
    //       checkboxContainer.insertAdjacentHTML('beforeend', checkboxTemplate(calendar, checked));
    //     });

    //     createEventListeners();
    //   }, function(error) {
    //     console.log(error);
    //     document.querySelector('.calendar-loading').style.display = 'none';
    //     checkboxContainer.insertAdjacentHTML('beforeend',
    //       '<div>' +
    //         '<div class="error-icon"></div>' +
    //         '<p>' +
    //           'Failed to connect to Google Calendar check your connection and refresh.' +
    //         '</p>' +
    //       '</div>'
    //     );

    //     createEventListeners();
    //   });
    // });
</script>

