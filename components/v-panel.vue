<template>
  <div v-if="service" class="panel" :style="panelStyling">
    <v-panel-header @refresh="onRefresh" :loading="loading" :scrollTop="scrollTop" :service="service"></v-panel-header>
    <div class="panel--content" :style="panelContentStyling" @scroll="onScroll">
      <transition name="slide">
        <v-panel-error @refresh="onRefresh" v-if="service.error === 'true'" :serviceId="serviceId" :serviceName="service.name"></v-panel-error>
      </transition>
      <component v-for="(component, index) in components" :key="index" :is="component.name" :props="component.props"></component>
    </div>
    <v-service-actions :service="service"></v-service-actions>
  </div>
</template>

<style src="css/v-panel.scss"></style>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import dynamicImportComponent from 'modules/dynamic-import-component';
  import vPanelHeader from 'components/v-panel-header';

  export default {
    components: {
      vPanelHeader,
      vPanelSubheader: dynamicImportComponent('v-panel-subheader'),
      vPanelError: dynamicImportComponent('v-panel-error'),
      vPanelItem: dynamicImportComponent('v-panel-item'),
      vPanelImage: dynamicImportComponent('v-panel-image'),
      vServiceActions: dynamicImportComponent('v-service-actions')
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

