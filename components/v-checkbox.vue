<template>
  <div class="checkbox">
    <input
      :value="value"
      :id="name"
      :checked="checked"
      type="checkbox"
      class="checkbox--actual"
      @change="onChange"
    >
    <label
      :for="name"
      class="checkbox--label"
    >
      <div class="checkbox--styled">
        <div class="checkbox--mark" />
      </div>
      {{ label }}
    </label>
  </div>
</template>

<style src="css/v-checkbox.scss"></style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: [String, Boolean],
      default: false
    },
    label: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onChange () {
      this.$emit('change', this.name, this.value);
    }
  }
};
</script>
