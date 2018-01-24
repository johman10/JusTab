<template>
  <div
    class="page-header"
    :style="{ 'background-color': color }"
  >
    <img
      @click="onMenuClick"
      class="page-header--menu-icon"
      src="~img/icons/menu.svg"
      alt="Toggle menu"
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
      default: '#000000'
    }
  },

  methods: {
    onMenuClick () {
      this.$emit('toggle');
    }
  }
};
</script>
