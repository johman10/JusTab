<template>
  <div :class="['panel-image', { 'panel-image--small': props.smallImages, 'panel-image--wide': widePanel }]">
    <a
      :href="props.url"
      class="panel-image__link ripple"
      target="_blank"
      @mousedown="_showRipple"
    >
      <div
        v-if="props.gif"
        class="panel-image__gif"
      >
        GIF
      </div>
      <div
        class="panel-image__image"
        v-lazy:background-image="imageObject"
      />
      <div class="panel-image__content">
        <div
          class="panel-image__title"
          target="_blank"
        >
          {{ props.title }}
        </div>
        <div
          class="panel-image__subtitle"
          target="_blank"
        >
          {{ props.subTitle }}
        </div>
      </div>
    </a>
  </div>
</template>

<style src="css/v-panel-image.scss"></style>

<script>
export default {
  props: {
    props: {
      type: Object,
      default () {
        return {};
      }
    }
  },

  computed: {
    imageObject () {
      return {
        src: this.props.image,
        error: require('img/dribbble_fallback.svg'),
        loading: require('img/dribbble_fallback.svg')
      };
    },

    widePanel () {
      return this.props.panelWidth > 600;
    }
  }
};
</script>
