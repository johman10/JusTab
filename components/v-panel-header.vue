<template>
  <div
    :style="panelHeaderStyling"
    class="panel-header"
  >
    <div class="panel-header--background">
      <div
        :style="background1Styling"
        class="panel-header--background1"
      />
      <div
        :style="background2Styling"
        class="panel-header--background2"
      />
    </div>
    <div class="panel-header--foreground">
      <div
        :style="foregroundTopStyling"
        class="panel-header--foreground-top"
      >
        <div
          class="refresh-button ripple"
          @click="triggerRefresh"
        >
          <Transition
            name="loader"
            mode="out-in"
          >
            <VSpinner
              v-if="loading"
              :border="5"
              :width="25"
            />
            <img
              v-else
              :alt="`Refresh ${service.name}`"
              svg-inline
              src="
              img/icons/refresh.svg"
            >
          </Transition>
        </div>
      </div>
      <div class="panel-header--foreground-bottom">
        <a
          :href="service.url"
          class="panel-header--url"
        >
          {{ service.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<style src="css/v-panel-header.scss"></style>

<script>
import dynamicImportComponent from 'modules/dynamic-import-component';

export default {
  components: {
    VSpinner: dynamicImportComponent('v-spinner')
  },

  props: {
    scrollTop: {
      type: Number,
      default: 0
    },
    service: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
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
    };
  },

  computed: {
    background1Styling () {
      return {
        'background-color': this.service.color
      };
    },
    background2Styling () {
      return Object.assign({
        'background-color': this.service.color,
        'background-image': 'url(' + this.service.logo + ')',
      }, this.background2ScrollStyling);
    }
  },

  watch: {
    scrollTop (newVal) {
      let opacity = 1-(newVal*(1/64));
      if (newVal < 64) {
        this.panelHeaderStyling.height = 128 - newVal + 'px';
        this.foregroundTopStyling.height = 64 - newVal + 'px';
        this.foregroundTopStyling.opacity = opacity;
        this.background2ScrollStyling.opacity = opacity;
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

  methods: {
    triggerRefresh () {
      this.$emit('refresh');
    }
  }
};
</script>
