<template>
  <a @mousedown="_showRipple" :href="url" class="fab ripple">
    <div :class="iconClass"></div>
  </a>
</template>

<style src="css/v-fab.scss"></style>

<script>
  export default {
    props: {
      url: String,
      icon: String
    },

    computed: {
      iconClass () {
        return `${this.icon}-icon`;
      }
    }
  }
</script>
