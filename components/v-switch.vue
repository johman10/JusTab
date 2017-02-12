<template>
  <div class="switch">
    <label class="switch--label">
      <input type="checkbox" class="switch--checkbox" :name="name" :checked="value" @input="toggleService" @change="toggleService">
      <span class="switch--lever"></span>
    </label>
  </div>
</template>

<style src="css/components/v-switch.scss"></style>

<script>
  export default {
    props: {
      name: String,
      value: Boolean
    },

    methods: {
      toggleService () {
        this.value = !this.value
        this.$emit('input', this.value)
        this.$emit('change', this.value)
      }
    }
  }
</script>
