<template>
  <div
    v-if="service"
    :style="panelStyling"
    class="panel"
  >
    <v-panel-header
      :loading="loading"
      :scroll-top="scrollTop"
      :service="service"
      @refresh="onRefresh"
    />
    <div
      :style="panelContentStyling"
      class="panel--content"
      @scroll="onScroll"
    >
      <transition
        name="slide"
      >
        <v-panel-error
          v-if="service.error === 'true'"
          :service-name="service.name"
          @refresh="onRefresh"
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
    },
    onRefresh () {
      this.loading = true;
      chrome.runtime.sendMessage({ name: 'startRefresh', serviceId: this.serviceId });
    }
  }
};
</script>
