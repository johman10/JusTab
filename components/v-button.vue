<template>
  <button
    :class="['ripple', typeClass]"
    :type="type"
    @click="$emit('click')"
    @mousedown="_showRipple"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
    look: {
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
      return this.look + '-button';
    }
  }
};
</script>

<style src="css/v-button.scss"></style>
