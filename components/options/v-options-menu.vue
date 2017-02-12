<template>
  <nav class="options-menu">
    <router-link v-for="service in services" :to="service.optionsPath" class="options-menu--link">
      <span class="options-menu--drag-handle"></span>
      {{ service.name }}
      <v-switch v-model="service.status" :name="service.functionName + 'Status'" class="options-menu--switch"></v-switch>
    </router-link>
    <router-link to="/support" class="options-menu--link options-menu--support">
      Support
    </router-link>
  </nav>
</template>

<style src="css/components/options/v-options-menu.scss"></style>

<script>
  import vSwitch from 'v-switch';
  import { mapState } from 'vuex';

  export default {
    components: {
      'v-switch': vSwitch
    },
    computed: {
      ...mapState([ 'services' ])
    }
  }
</script>
