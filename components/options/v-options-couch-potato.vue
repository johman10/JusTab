<template>
  <div class="options-couch-potato" v-if="service">
    <v-input type="text" @change="saveData" :value="service.address" name="couchPotatoAddress" label="Server address"></v-input>
    <v-input type="number" @change="saveData" :value="service.port" name="couchPotatoPort" label="Server port"></v-input>
    <v-input type="text" @change="saveData" :value="service.key" name="couchPotatoKey" label="API Key"></v-input>
    <v-input type="number" @change="saveData" :value="service.panelWidth" name="couchPotatoWidth" label="Panel width in px"></v-input>
    <v-input type="number" @change="saveData" :value="service.refresh" name="couchPotatoRefresh" label="Refresh rate (in minutes)"></v-input>
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
          return state.services.find((s) => s.id === 3);
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

