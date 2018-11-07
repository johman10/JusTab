<template>
  <div
    :style="{ 'background-color': color }"
    class="page-header"
  >
    <img
      class="page-header--menu-icon"
      svg-inline
      src="img/icons/menu.svg"
      alt="Toggle menu"
      @click="onMenuClick"
    >
    <div class="page-header--title">
      {{ title }}
    </div>
  </div>
</template>

<style src="css/v-page-header.scss"></style>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#FFFFFF'
    }
  },

  methods: {
    onMenuClick () {
      this.$emit('toggle');
    }
  }
};
</script>
