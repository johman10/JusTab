<template>
  <div class="switch">
    <label class="switch--label" @click="toggleService">
      <input type="checkbox" class="switch--checkbox" :name="name" :checked="value">
      <span class="switch--lever"></span>
    </label>
  </div>
</template>

<style src="css/components/v-switch.scss"></style>

<script>
  export default {
    props: {
      name: String,
      value: Boolean,
      serviceId: Number
    },

    methods: {
      toggleService () {
        this.$emit('input', this.serviceId, this.name, !this.value);
      }
    }
  }
</script>
