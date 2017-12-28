<template>
  <div class="options-transmission" v-if="service">
    <v-input type="text" @change="onChange" :value="service.folder" name="bookmarksFolder" label="Bookmark folder to display"></v-input>
    <v-checkbox @change="onChange" label="Show recursive list" name="bookmarksRecursive" :checked="service.recursive" :value="!service.recursive"></v-checkbox>

    <v-input type="number" @change="onChange" :value="service.panelWidth" name="googleCalendarWidth" label="Panel width in px"></v-input>
    <v-input type="number" @change="onChange" :value="service.refresh" name="googleCalendarRefresh" label="Refresh rate (in minutes)"></v-input>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import vInput from 'components/v-input';
  import vCheckbox from 'components/v-checkbox';

  export default {
    components: {
      vInput,
      vCheckbox
    },
    computed: {
      ...mapState({
        services: 'services',
        service (state) {
          return state.services.find(s => s.id === 15);
        }
      })
    },
    methods: {
      onChange (name, newVal) {
        this.saveData(this.service.id, name, newVal)
      }
    },
  }
</script>
