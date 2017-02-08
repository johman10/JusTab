<template>
  <div class="panel" :style="panelStyling">
    <div class="panel-header">
      <div class="panel-header-background">
        <div class="panel-header-background1" :style="background1Styling"></div>
        <div class="panel-header-background2" :style="background2Styling"></div>
      </div>
      <div class="panel-header-foreground">
        <div class="top">
          <div @click="triggerRefresh" class="refresh-button waves-effect">
            <transition name="loader" mode="out-in">
              <v-spinner v-if="loading" :border="5" :width="25"></v-spinner>
              <img v-else :src="refreshIcon" :alt="`Refresh ${service.name}`">
            </transition>
          </div>
        </div>
        <div class="bottom">
          <a :href="service.url">{{service.name}}</a>
        </div>
      </div>
    </div>
    <div class="panel-content">
      <v-panel-error v-if="service.error === 'true'" :serviceId="serviceId" :serviceName="service.name"></v-panel-error>
      <component v-for="component in components" :is="component.name" :props="component.props"></component>
    </div>
  </div>
</template>

<style  lang="sass" src="css/components/v-panel.scss"></style>

<script>
  import { mapActions, mapState } from 'vuex';
  import vPanelError from "components/v-panel-error.vue";
  import vSpinner from "components/v-spinner.vue";
  import vHeader from "components/v-header.vue";
  import vPanelItem from "components/v-panel-item.vue";

  export default {
    components: {
      'v-panel-error': vPanelError,
      'v-spinner': vSpinner,
      'v-header': vHeader,
      'v-panel-item': vPanelItem
    },

    props: {
      serviceId: Number
    },

    data () {
      return {
        loading: false
      }
    },

    computed: {
      refreshIcon() {
        return require('img/icons/refresh.svg')
      },
      background1Styling() {
        return {
          'background-color': this.service.color
        }
      },
      background2Styling() {
        return {
          'background-color': this.service.color,
          'background-image': 'url(' + this.service.logo + ')'
        }
      },
      panelStyling() {
        return {
          width: this.service.panelWidth + 'px'
        }
      },
      components () {
        if (this.service.components) {
          return JSON.parse(this.service.components);
        } else {
          return {};
        }
      },
      ...mapState({
        chromePort: 'chromePort',
        service (state) {
          return state.services.find((service) => service.id === this.serviceId);
        }
      })
    },

    mounted () {
      this.chromePort.onMessage.addListener((message) => {
        if (message.name === 'finishRefresh') {
          this.loading = false;
        }
      });
    },

    methods: {
      triggerRefresh() {
        this.loading = true;
        this.chromePort.postMessage({ name: 'startRefresh', serviceId: this.serviceId })
      }
    }
  };
</script>

