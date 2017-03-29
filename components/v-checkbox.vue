<template>
  <div class="checkbox">
    <input type="checkbox" @change="onChange" :value="value" :id="name" class="checkbox--actual" :checked="checked">
    <label :for="name" class="checkbox--label">
      <div class="checkbox--styled">
        <div class="checkbox--mark"></div>
      </div>
      {{ label }}
    </label>
  </div>
</template>

<style src="css/v-checkbox.scss"></style>

<script>
  export default {
    props: {
      name: String,
      value: [String, Boolean],
      label: String,
      checked: Boolean
    },

    methods: {
      onChange () {
        this.$emit('change', this.name, this.value);
      }
    }
  }
</script>
