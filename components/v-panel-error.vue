<template>
  <div class="panel-error">
    <p class="panel-error-content">There was an error connecting to {{ serviceName }}. Please check your connection and your settings.</p>
    <div class="panel-error-buttons">
      <v-button type="flat" class="panel-error-settings-button" text="Settings"></v-button>
      <v-button @click="triggerRefresh" type="flat" class="panel-error-retry-button" text="Retry"></v-button>
      <div class="cleardiv"></div>
    </div>
    <div class="cleardiv"></div>
  </div>
</template>

<style src="css/v-panel-error.scss"></style>

<script>
  import vButton from 'components/v-button';

  export default {
    components: {
      vButton
    },

    props: {
      serviceName: String,
      serviceId: Number
    },

    methods: {
      triggerRefresh () {
        this.$emit('refresh');
      }
    }
  }
</script>
