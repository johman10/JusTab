<template>
  <nav :class="['options-menu', { 'options-menu__show': showMenu }]">
    <router-link v-for="service in services" :to="service.optionsPath" class="options-menu--link">
      <span class="options-menu--drag-handle"></span>
      {{ service.name }}
      <v-switch @input="processChanges" :value="service.active" :service-id="service.id" :name="service.functionName + 'Active'" class="options-menu--switch"></v-switch>
    </router-link>
    <router-link to="/support" class="options-menu--link options-menu--support">
      Support
    </router-link>
  </nav>
</template>

<style src="css/components/options/v-options-menu.scss"></style>

<script>
  import vSwitch from 'v-switch';
  import { mapState, mapActions } from 'vuex';

  export default {
    props: {
      showMenu: Boolean
    },
    components: {
      'v-switch': vSwitch
    },
    computed: {
      ...mapState([ 'services' ])
    },
    methods: {
      processChanges (serviceId, key, value) {
        let changes = {}
        changes[key] = value;
        this.updateService({ serviceId, changes })
      },
      ...mapActions([ 'updateService' ])
    }
  }
</script>
