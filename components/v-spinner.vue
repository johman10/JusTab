<template>
  <div
    :style="spinnerStyle"
    class="spinner"
  >
    <svg
      class="spinner-circular"
      viewBox="25 25 50 50"
    >
      <circle
        :style="circleStyle"
        class="spinner-path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke-miterlimit="10"
      />
    </svg>
  </div>
</template>

<style src="css/v-spinner.scss"></style>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#FFFFFF'
    },
    width: {
      type: Number,
      default: 28
    },
    border: {
      type: Number,
      default: 2
    }
  },

  computed: {
    spinnerStyle() {
      return {
        width: this.width + 'px',
      };
    },
    circleStyle() {
      return {
        'stroke-width': this.border,
        stroke: this.color
      };
    }
  }
};
</script>
