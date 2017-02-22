<template>
  <div class="options-hacker-news" v-if="service">
    <v-input type="number" @change="saveData" :value="service.panelWidth" name="hackerNewsWidth" label="Panel width in px"></v-input>
    <v-input type="number" @change="saveData" :value="service.refresh" name="hackerNewsRefresh" label="Refresh rate (in minutes)"></v-input>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import vInput from 'v-input';

  export default {
    components: {
      'v-input': vInput
    },
    computed: {
      ...mapState({
        services: 'services',
        service (state) {
          return state.services.find(s => s.id === 7);
        }
      })
    },

    methods: {
      ...mapActions([
        'updateService'
      ]),
      saveData (name, newVal) {
        let changes = {};
        changes[name] = newVal;
        this.updateService({ serviceId: this.service.id, changes });
      }
    },
  }
</script>

