<template>
  <button
    :class="['ripple', typeClass]"
    type="button"
    @click="$emit('click')"
    @mousedown="_showRipple"
  >
    <slot />
  </button>
</template>

<style src="css/v-button.scss"></style>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'flat'
    },
    text: {
      type: String,
      default: ''
    }
  },

  computed: {
    typeClass () {
      return this.type + '-button';
    }
  }
};
</script>
