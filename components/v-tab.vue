<template>
  <div
    v-cloak
    class="panel-container"
  >
    <VFab
      url="/options.html"
      icon="settings"
    />
    <VPanel
      v-for="service in activeServices"
      :key="service.id"
      :service-id="service.id"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import VPanel from 'components/v-panel';
import VFab from 'components/v-fab';

export default {
  components: {
    VPanel,
    VFab
  },
  computed: {
    ...mapState([ 'services' ]),
    ...mapGetters([ 'activeServices' ])
  }
};
</script>

<style src="css/v-tab.scss"></style>
