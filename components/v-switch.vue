<template>
  <div class="switch ripple--no">
    <label class="switch--label" @click="toggleService">
      <input type="checkbox" class="switch--checkbox" :name="name" :checked="value">
      <span class="switch--lever"></span>
    </label>
  </div>
</template>

<style src="css/v-switch.scss"></style>

<script>
  export default {
    props: {
      name: String,
      value: Boolean
    },

    methods: {
      toggleService () {
        this.$emit('input', this.name, !this.value);
      }
    }
  }
</script>
