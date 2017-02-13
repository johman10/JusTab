<template>
  <div class="options-google-calendar" v-if="service">
    <div class="options-google-calendar--calendar-list">
      <label class="options--label">Calendars</label>
      <component @change="onCalendarChange" v-for="(checkbox, index) in calendarCheckboxes" :is="checkbox.name" :label="checkbox.props.label" :value="checkbox.props.value" :checked="checkedCalendar(checkbox.props.value)"></component>
    </div>

    <v-input type="number" @change="saveData" :value="service.days" name="googleCalendarDays" label="Days from today to show"></v-input>
    <v-input type="number" @change="saveData" :value="service.panelWidth" name="googleCalendarWidth" label="Panel width in px"></v-input>
    <v-input type="number" @change="saveData" :value="service.refresh" name="googleCalendarRefresh" label="Refresh rate (in minutes)"></v-input>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import vGoogleCalendar from 'js/background/v-google-calendar';
  import vCheckbox from 'v-checkbox';
  import vInput from 'v-input';

  export default {
    mixins: [
      vGoogleCalendar
    ],
    components: {
      'v-checkbox': vCheckbox,
      'v-input': vInput
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
        if (this.calendars.includes(value)) {
          let index = newCalendars.indexOf(value);
          newCalendars.splice(index, 1);
        } else {
          newCalendars.push(value);
        }
        this.saveData('googleCalendarCalendars', newCalendars);
      },
      checkedCalendar (id) {
        if (!this.service) return false;
        return this.calendars.includes(id);
      },
      saveData (name, newVal) {
        let changes = {};
        changes[name] = newVal;
        this.updateService({ serviceId: this.service.id, changes });
      }
    },

    mounted () {
      this.googleCalendersList().then((calendarListCheckboxes) => {
        this.calendarCheckboxes = calendarListCheckboxes;
      });
    }
  }
</script>

