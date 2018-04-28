<template>
  <div
    class="switch ripple--no"
  >
    <label
      class="switch--label"
      @click="toggleService"
    >
      <input
        :name="name"
        :checked="value"
        type="checkbox"
        class="switch--checkbox"
      >
      <span class="switch--lever" />
    </label>
  </div>
</template>

<style src="css/v-switch.scss"></style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    toggleService () {
      this.$emit('input', this.name, !this.value);
    }
  }
};
</script>
