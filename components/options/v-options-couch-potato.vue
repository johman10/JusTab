<template>
  <div class="options-couch-potato" v-if="service">
    <v-input type="text" @change="onChange" :value="service.address" name="couchPotatoAddress" label="Server address"></v-input>
    <v-input type="number" @change="onChange" :value="service.port" name="couchPotatoPort" label="Server port"></v-input>
    <v-input type="text" @change="onChange" :value="service.key" name="couchPotatoKey" label="API Key"></v-input>
    <v-input type="number" @change="onChange" :value="service.panelWidth" name="couchPotatoWidth" label="Panel width in px"></v-input>
    <v-input type="number" @change="onChange" :value="service.refresh" name="couchPotatoRefresh" label="Refresh rate (in minutes)"></v-input>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import vInput from 'v-input';

  export default {
    components: {
      vInput
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
      onChange (name, newVal) {
        this.saveData(this.service.id, name, newVal)
      }
    }
  }
</script>

