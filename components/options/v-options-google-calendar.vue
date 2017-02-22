<template>
  <div class="options-google-calendar" v-if="service">
    <div class="options-google-calendar--calendar-list">
      <label class="options--label">Calendars</label>
      <div v-if="error">
        {{ error }}
      </div>
      <v-checkbox @change="onCalendarChange" v-for="calendar in calendars" :label="calendar.summary" :name="calendar.id" :value="calendar.id" :checked="checkedCalendar(calendar.id)"></v-checkbox>
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
      activeCalendars () {
        if (!this.service) return [];
        return this.service.calendars || [];
      }
    },

    data () {
      return {
        calendars: [],
        error: null
      }
    },

    methods: {
      ...mapActions([
        'updateService'
      ]),
      onCalendarChange (name, value) {
        let newCalendars = [].concat(this.activeCalendars);
        if (this.activeCalendars.includes(value)) {
          let index = newCalendars.indexOf(value);
          newCalendars.splice(index, 1);
        } else {
          newCalendars.push(value);
        }
        this.saveData('googleCalendarCalendars', newCalendars);
      },
      checkedCalendar (id) {
        if (!this.service) return false;
        return this.activeCalendars.includes(id);
      },
      saveData (name, newVal) {
        let changes = {};
        changes[name] = newVal;
        this.updateService({ serviceId: this.service.id, changes });
      }
    },

    mounted () {
      this.googleCalendersList()
        .then((calendars) => {
          console.log(calendars);
          this.calendars = calendars;
        })
        .catch((error) => {
          console.log(error);
          this.error = error
        });
    }
  }
</script>

