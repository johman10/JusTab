<template>
  <div
    v-cloak
    class="panel-container"
  >
    <v-fab
      url="/options.html"
      icon="settings"
    />
    <v-panel
      v-for="service in activeServices"
      :key="service.id"
      :service-id="service.id"
    />
  </div>
</template>

<style src="css/v-tab.scss"></style>

<script>
import { mapState, mapGetters } from 'vuex';
import vPanel from '~components/v-panel';
import vFab from '~components/v-fab';

export default {
  components: {
    vPanel,
    vFab
  },
  computed: {
    ...mapState([ 'services' ]),
    ...mapGetters([ 'activeServices' ])
  }
};
</script>
