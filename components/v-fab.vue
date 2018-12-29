<template>
  <a
    :href="url"
    class="fab ripple"
    @mousedown="_showRipple"
  >
    <div :class="iconClass" />
  </a>
</template>

<style src="css/v-fab.scss"></style>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },

  computed: {
    iconClass () {
      return `${this.icon}-icon`;
    }
  }
};
</script>
