<template>
  <div v-cloak class="panel-container">
    <div class="settings-button settings-icon waves-effect"></div>
    <v-panel v-for="(service, index) in activeServices" :service-id="service.id"></v-panel>
    <div class="bottom-bar">
      <v-service-actions v-for="service in services" :service="service"></v-service-actions>
    </div>
  </div>
</template>

<style src="css/components/v-tab.scss"></style>

<script>
  import { mapState, mapGetters } from 'vuex';
  import vPanel from 'v-panel.vue';
  import vServiceActions from 'v-service-actions.vue';

  export default {
    name: 'v-tab',
    components: {
      'v-panel': vPanel,
      'v-service-actions': vServiceActions,
    },
    computed: {
      ...mapState([ 'services' ]),
      ...mapGetters([ 'activeServices' ])
    }
  }
</script>

