<template>
  <div class="calendar-checkbox checkbox">
    <input type="checkbox" @change="onChange" :value="value" :id="'checkbox-' + value" class="checkbox--actual" :checked="checked">
    <label :for="'checkbox-' + value" class="checkbox--label">
      <div class="checkbox--styled">
        <div class="checkbox--mark"></div>
      </div>
      {{ label }}
    </label>
  </div>"
</template>

<style src="css/components/v-checkbox.scss"></style>

<script>
  export default {
    props: {
      value: String,
      label: String,
      checked: Boolean
    },

    methods: {
      onChange () {
        this.$emit('change', this.value);
      }
    }
  }
</script>
