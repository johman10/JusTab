<template>
  <div
    v-if="service"
    class="panel"
    :style="panelStyling"
  >
    <v-panel-header
      @refresh="startRefresh"
      :loading="loading"
      :scroll-top="scrollTop"
      :service="service"
    />
    <div
      class="panel--content"
      :style="panelContentStyling"
      @scroll="onScroll"
    >
      <transition
        name="slide"
      >
        <v-panel-error
          @refresh="startRefresh"
          v-if="service.error === 'true'"
          :service-name="service.name"
        />
      </transition>
      <component
        v-for="(component, index) in components"
        :key="index"
        :is="component.name"
        :props="component.props"
      />
    </div>
    <v-service-actions :service="service" />
  </div>
</template>

<style src="css/v-panel.scss"></style>

<script>
import { mapGetters } from 'vuex';
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
    serviceId: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      loading: false,
      scrollTop: 0
    };
  },

  computed: {
    panelStyling () {
      return {
        width: this.service.panelWidth + 'px',
      };
    },
    panelContentStyling () {
      return {
        'padding-bottom': this.service.actions.length > 0 ? '50px' : 0
      };
    },
    components () {
      if (this.service.components) {
        return JSON.parse(this.service.components);
      } else {
        return {};
      }
    },
    nextPage () {
      const items = this.components.filter(component => component.name === 'v-panel-item' || component.name === 'v-panel-image');
      return Math.floor(items.length / this.service.perPage + 1);
    },
    service () {
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

      if (!this.service.loadMore || this.loading) return;

      const maxScrollTop = event.target.scrollHeight - event.target.offsetHeight;
      const scrollTop = event.target.scrollTop;
      const spaceToEnd = maxScrollTop - scrollTop;
      if (spaceToEnd < 200) {
        this.startRefresh(this.nextPage);
      }
    },
    startRefresh (page) {
      this.loading = true;
      chrome.runtime.sendMessage({
        name: 'startRefresh',
        serviceId: this.serviceId,
        page
      });
    }
  }
};
</script>
