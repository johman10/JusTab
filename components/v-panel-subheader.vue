<template>
  <h2>
    {{ props.text }}
  </h2>
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

<style src="css/v-panel-subheader.scss"></style>
