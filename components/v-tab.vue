<template>
  <div v-cloak class="panel-container">
    <v-fab url="/options.html" icon="settings"></v-fab>
    <v-panel v-for="(service, index) in activeServices" :key="service.id" :service-id="service.id"></v-panel>
    <div class="bottom-bar">
      <v-service-actions v-for="service in activeServices" :key="service.id" :service="service"></v-service-actions>
    </div>
  </div>
</template>

<style src="css/v-tab.scss"></style>

<script>
  import { mapState, mapGetters } from 'vuex';
  import vPanel from 'v-panel.vue';
  import vFab from 'v-fab.vue';
  import vServiceActions from 'v-service-actions.vue';

  export default {
    name: 'v-tab',
    components: {
      vPanel,
      vServiceActions,
      vFab
    },
    computed: {
      ...mapState([ 'services' ]),
      ...mapGetters([ 'activeServices' ])
    }
  }
</script>

