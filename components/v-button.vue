<template>
  <button
    @click="$emit('click')"
    @mousedown="_showRipple"
    :class="['ripple', typeClass]"
    type="button"
  >
    <slot/>
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
