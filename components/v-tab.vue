<template>
  <div v-cloak class="panel-container">
    <v-fab url="/options.html" icon="settings"></v-fab>
    <v-panel v-for="(service, index) in activeServices" :key="service.id" :service-id="service.id"></v-panel>
  </div>
</template>

<style src="css/v-tab.scss"></style>

<script>
  import { mapState, mapGetters } from 'vuex';
  import dynamicImportComponent from 'modules/dynamic-import-component';
  import vPanel from 'components/v-panel';
  import vFab from 'components/v-fab';

  export default {
    name: 'v-tab',
    components: {
      vPanel,
      vFab
    },
    computed: {
      ...mapState([ 'services' ]),
      ...mapGetters([ 'activeServices' ])
    }
  }
</script>

