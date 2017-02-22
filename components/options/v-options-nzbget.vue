<template>
  <div class="options-nzbget" v-if="service">
    <v-input type="text" @change="saveData" :value="service.address" name="nzbgetAddress" label="Server address"></v-input>
    <v-input type="number" @change="saveData" :value="service.port" name="nzbgetPort" label="Server port"></v-input>
    <v-input type="text" @change="saveData" :value="service.username" name="nzbgetUsername" label="Username"></v-input>
    <v-input type="password" @change="saveData" :value="service.password" name="nzbgetPassword" label="Password"></v-input>
    <v-input type="number" @change="saveData" :value="service.panelWidth" name="nzbgetWidth" label="Panel width in px"></v-input>
    <v-input type="number" @change="saveData" :value="service.refresh" name="nzbgetRefresh" label="Refresh rate (in minutes)"></v-input>
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
          return state.services.find(s => s.id === 12);
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

