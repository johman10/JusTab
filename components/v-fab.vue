<template>
  <a
    @mousedown="_showRipple"
    :href="url"
    class="fab ripple"
  >
    <div :class="iconClass"/>
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
