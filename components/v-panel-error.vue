<template>
  <div class="panel-error">
    <p class="panel-error-content">
      There was an error connecting to {{ serviceName }}. Please check your connection and your settings.
    </p>
    <div class="panel-error-buttons">
      <VButton
        look="flat"
        class="panel-error-settings-button"
        @click="openSettings"
      >
        Settings
      </VButton>
      <VButton
        look="flat"
        class="panel-error-retry-button"
        @click="triggerRefresh"
      >
        Retry
      </VButton>
      <div class="cleardiv" />
    </div>
    <div class="cleardiv" />
  </div>
</template>

<script>
import VButton from 'components/v-button';

export default {
  components: {
    VButton
  },

  props: {
    serviceName: {
      type: String,
      required: true
    }
  },

  methods: {
    openSettings () {
      window.location = `chrome-extension://ahfidkanlmlkhggdgencpoanjkokcfck/options.html#/${this.serviceName.toLowerCase().split(' ').join('')}`;
    },
    triggerRefresh () {
      this.$emit('refresh');
    }
  }
};
</script>

<style src="css/v-panel-error.scss"></style>
