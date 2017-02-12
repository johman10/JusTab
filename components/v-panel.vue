<template>
  <div v-if="service" class="panel" :style="panelStyling">
    <v-panel-header @refresh="onRefresh" :loading="loading" :scrollTop="scrollTop" :service="service"></v-panel-header>
    <div class="panel--content" :style="panelContentStyling" @scroll="onScroll">
      <v-panel-error @refresh="onRefresh" v-if="service.error === 'true'" :serviceId="serviceId" :serviceName="service.name"></v-panel-error>
      <component v-for="component in components" :is="component.name" :props="component.props"></component>
    </div>
  </div>
</template>

<style src="css/components/v-panel.scss"></style>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import vPanelError from "components/v-panel-error.vue";
  import vPanelHeader from "components/v-panel-header.vue";
  import vPanelSubheader from "components/v-panel-subheader.vue";
  import vPanelItem from "components/v-panel-item.vue";

  export default {
    components: {
      'v-panel-error': vPanelError,
      'v-panel-header': vPanelHeader,
      'v-panel-subheader': vPanelSubheader,
      'v-panel-item': vPanelItem,
    },

    props: {
      serviceId: Number
    },

    data () {
      return {
        loading: false,
        scrollTop: 0
      }
    },

    computed: {
      panelStyling () {
        return {
          width: this.service.panelWidth + 'px',
        }
      },
      panelContentStyling () {
        return {
          'padding-bottom': this.service.actions.length > 0 ? '50px' : 0
        }
      },
      components () {
        if (this.service.components) {
          return JSON.parse(this.service.components);
        } else {
          return {};
        }
      },
      service (state) {
        return this.activeServices.find((service) => service.id === this.serviceId);
      },
      ...mapGetters([ 'activeServices' ])
    },

    mounted () {
      chrome.runtime.onMessage.addListener((message) => {
        if (message.name === 'finishRefresh') {
          this.loading = false;
        }
      });
    },

    methods: {
      onScroll(event) {
        this.scrollTop = event.target.scrollTop;
      },
      onRefresh () {
        this.loading = true;
        chrome.runtime.sendMessage({ name: 'startRefresh', serviceId: this.serviceId });
      }
    }
  };
</script>

