<template>
  <button @click="$emit('click')" @mousedown="_showRipple" :class="['ripple', typeClass]">
    <template v-if="text">
      {{ text }}
    </template>
    <slot v-else></slot>
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
      text: String
    },

    computed: {
      typeClass () {
        return this.type + '-button';
      }
    }
  }
</script>
