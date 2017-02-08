<template>
  <div class="panel-error">
    <p class="panel-error-content">There was an error connecting to {{ serviceName }}. Please check your connection and your settings.</p>
    <div class="panel-error-buttons">
      <v-button type="flat" extra-class="panel-error-settings-button" text="Settings"></v-button>
      <v-button @click="triggerRefresh" type="flat" extra-class="panel-error-retry-button" text="Retry"></v-button>
      <div class="cleardiv"></div>
    </div>
    <div class="cleardiv"></div>
  </div>
</template>

<style src="css/components/v-panel-error.scss"></style>

<script>
  import { mapState } from 'vuex';
  import vButton from 'v-button';

  export default {
    components: {
      'v-button': vButton
    },

    props: {
      serviceName: String,
      serviceId: Number
    },

    computed: {
      ...mapState(['chromePort'])
    },

    methods: {
      triggerRefresh () {
        this.chromePort.postMessage({ name: 'startRefresh', serviceId: this.serviceId })
      }
    }
  }
</script>
