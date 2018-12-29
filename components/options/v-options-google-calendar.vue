<template>
  <div
    v-if="service"
    class="options-google-calendar"
  >
    <div class="options-google-calendar--calendar-list">
      <label class="options--label">
        Calendars
      </label>
      <div v-if="error">
        {{ error }}
      </div>
      <VCheckbox
        v-for="calendar in calendars"
        :key="calendar.id"
        :label="calendar.summary"
        :name="calendar.id"
        :value="calendar.id"
        :checked="checkedCalendar(calendar.id)"
        @change="onCalendarChange"
      />
    </div>

    <VInput
      :value="service.days"
      type="number"
      name="googleCalendarDays"
      label="Days from today to show"
      @change="onChange"
    />
    <VInput
      :value="service.panelWidth"
      type="number"
      name="googleCalendarWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <VInput
      :value="service.refresh"
      type="number"
      name="googleCalendarRefresh"
      label="Refresh rate (in minutes)"
      @change="onChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import vGoogleCalendar from 'js/background/v-google-calendar';
import vCheckbox from 'components/v-checkbox';
import vInput from 'components/v-input';

export default {
  components: {
    vCheckbox,
    vInput
  },

  mixins: [
    vGoogleCalendar
  ],

  data () {
    return {
      calendars: [],
      error: null
    };
  },

  computed: {
    ...mapState({
      services: 'services',
      service (state) {
        return state.services.find((s) => s.id === 1);
      }
    }),
    activeCalendars () {
      if (!this.service) return [];
      return this.service.calendars || [];
    }
  },

  mounted () {
    this.googleCalendersList()
      .then((calendars) => {
        this.calendars = calendars;
      })
      .catch((error) => {
        this.error = error;
      });
  },

  methods: {
    onCalendarChange (name, value) {
      let newCalendars = [].concat(this.activeCalendars);
      if (this.activeCalendars.includes(value)) {
        let index = newCalendars.indexOf(value);
        newCalendars.splice(index, 1);
      } else {
        newCalendars.push(value);
      }
      this.saveData(this.service.id, 'googleCalendarCalendars', newCalendars);
    },
    checkedCalendar (id) {
      if (!this.service) return false;
      return this.activeCalendars.includes(id);
    },
    onChange (name, newVal) {
      this.saveData(this.service.id, name, newVal);
    }
  }
};
</script>
