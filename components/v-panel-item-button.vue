<template>
  <a
    :href="props.url"
    class="ripple panel-item-button"
    @mousedown="_showRipple"
  >
    <i :class="['panel-item-button--icon', props.iconClass]" />
  </a>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default () {
        return {};
      }
    }
  }
};
</script>

<style src="css/v-panel-item-button.scss"></style>
