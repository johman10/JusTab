<template>
  <div :class="['panel-image', { 'small-image': props.smallImages }, { 'wide-panel': widePanel }]">
    <a :href="props.url" class="panel-image--link" target="_blank">
      <div v-if="props.gif" class="panel-image--gif">GIF</div>
      <div class="panel-image--image" v-lazy:background-image="imageObject"></div>
      <div class="panel-image--content">
        <div class="panel-image--title" target="_blank">
          {{ props.title }}
        </div>
        <div class="panel-image--subtitle" target="_blank">
          {{ props.subTitle }}
        </div>
      </div>
    </a>
  </div>
</template>

<style src="css/components/v-panel-image.scss"></style>

<script>
  export default {
    computed: {
      imageObject () {
        return {
          src: this.props.image,
          error: require('img/dribbble_fallback.png'),
          loading: require('img/dribbble_fallback.png')
        }
      },

      widePanel () {
        return this.props.panelWidth > 600;
      }
    },

    props: {
      props: Object
    },

    mounted () {
      console.log(this.props.panelWidth);
    }
  }
</script>
