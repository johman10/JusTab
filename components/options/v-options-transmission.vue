<template>
  <div class="options-transmission" v-if="service">
    <v-input type="text" @change="onChange" :value="service.address" name="transmissionAddress" label="Server address"></v-input>
    <v-input type="number" @change="onChange" :value="service.port" name="transmissionPort" label="Server port"></v-input>
    <v-input type="text" @change="onChange" :value="service.username" name="transmissionUsername" label="Username"></v-input>
    <v-input type="password" @change="onChange" :value="service.password" name="transmissionPassword" label="Password"></v-input>
    <v-input type="number" @change="onChange" :value="service.panelWidth" name="transmissionWidth" label="Panel width in px"></v-input>
    <v-input type="number" @change="onChange" :value="service.refresh" name="transmissionRefresh" label="Refresh rate (in minutes)"></v-input>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import vInput from 'components/v-input';

  export default {
    components: {
      vInput
    },
    computed: {
      ...mapState({
        services: 'services',
        service (state) {
          return state.services.find(s => s.id === 14);
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
