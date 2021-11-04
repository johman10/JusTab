<template>
  <div class="checkbox">
    <input
      :id="name"
      v-model="checked"
      :value="val"
      type="checkbox"
      class="checkbox--actual"
      @change="onChange"
    />
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

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: [Boolean, Array],
      required: true
    },
    val: {
      type: [String, Boolean],
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      checkedProxy: false,
    };
  },

  computed: {
    checked: {
      get () {
        return this.value;
      },
      set (val) {
        this.checkedProxy = val;
      }
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.checkedProxy);
    }
  }
};
</script>

<style src="css/v-checkbox.scss"></style>
