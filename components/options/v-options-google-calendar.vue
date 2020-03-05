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
        v-model="activeCalendars"
        :label="calendar.summary"
        :name="calendar.id"
        :val="calendar.id"
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
import VGoogleCalendar from 'js/background/v-google-calendar';
import VCheckbox from 'components/v-checkbox';
import VInput from 'components/v-input';

export default {
  components: {
    VCheckbox,
    VInput
  },

  mixins: [
    VGoogleCalendar
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
    activeCalendars: {
      get() {
        if (!this.service) return [];
        return (this.service.calendars || []).filter(calendarId => (
          // Filter calendars from previously selected list if they don't exist anymore in the latest version of the list
          this.calendars.some(calendar => calendar.id === calendarId)
        ));
      },
      set(value) {
        this.onChange('googleCalendarCalendars', value);
      }
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
    onChange (name, newVal) {
      this.saveData(this.service.id, name, newVal);
    }
  }
};
</script>
