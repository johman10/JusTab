<template>
  <h2>
    {{ props.text }}
  </h2>
</template>

<style src="css/v-panel-subheader.scss"></style>

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
