<template>
  <div class="panel-header" :style="panelHeaderStyling">
    <div class="panel-header--background">
      <div class="panel-header--background1" :style="background1Styling"></div>
      <div class="panel-header--background2" :style="background2Styling"></div>
    </div>
    <div class="panel-header--foreground">
      <div class="panel-header--foreground-top" :style="foregroundTopStyling">
        <div @click="triggerRefresh" class="refresh-button ripple">
          <transition name="loader" mode="out-in">
            <v-spinner v-if="loading" :border="5" :width="25"></v-spinner>
            <img v-else src="~img/icons/refresh.svg" :alt="`Refresh ${service.name}`">
          </transition>
        </div>
      </div>
      <div class="panel-header--foreground-bottom">
        <a class="panel-header--url" :href="service.url">{{service.name}}</a>
      </div>
    </div>
  </div>
</template>

<style src="css/v-panel-header.scss"></style>

<script>
  import vSpinner from "components/v-spinner.vue";

  export default {
    components: {
      vSpinner
    },
    props: {
      scrollTop: Number,
      service: Object,
      loading: Boolean
    },
    data () {
      return {
        panelHeaderStyling: {
          height: '128px'
        },
        background2ScrollStyling: {
          opacity: 1,
          display: 'block'
        },
        foregroundTopStyling: {
          height: '64px',
          opacity: 1,
          display: 'block'
        }
      }
    },
    watch: {
      scrollTop (newVal) {
        let opacity = 1-(newVal*(1/64));;
        if (newVal < 64) {
          this.panelHeaderStyling.height = 128 - newVal + 'px';
          this.foregroundTopStyling.height = 64 - newVal + 'px';
          this.foregroundTopStyling.opacity = opacity;
          this.background2ScrollStyling.opacity = opacity
          this.foregroundTopStyling.display = 'block';
          this.background2ScrollStyling.display = 'block';
        } else {
          this.panelHeaderStyling.height = 64 + 'px';
          this.foregroundTopStyling.height = 0 + 'px';
          this.foregroundTopStyling.display = 'none';
          this.background2ScrollStyling.display = 'none';
        }
      }
    },
    computed: {
      background1Styling () {
        return {
          'background-color': this.service.color
        }
      },
      background2Styling () {
        return Object.assign({
          'background-color': this.service.color,
          'background-image': 'url(' + this.service.logo + ')',
        }, this.background2ScrollStyling);
      }
    },
    methods: {
      triggerRefresh () {
        this.$emit('refresh');
      }
    }
  }
</script>
