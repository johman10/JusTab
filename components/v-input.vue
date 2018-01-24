<template>
  <div class="input">
    <input
      v-if="type === 'number'"
      v-model="changeValue"
      placeholder="."
      @input="onInput"
      @change="onChange"
      class="input__field"
      type="number"
      :name="name"
      :id="name"
    >
    <input
      v-else-if="type === 'password'"
      v-model="changeValue"
      placeholder="."
      @input="onInput"
      @change="onChange"
      class="input__field"
      type="password"
      :name="name"
      :id="name"
    >
    <input
      v-else-if="type === 'url'"
      v-model="changeValue"
      placeholder="."
      @input="onInput"
      @change="onChange"
      class="input__field"
      type="url"
      :name="name"
      :id="name"
    >
    <input
      v-else
      v-model="changeValue"
      placeholder="."
      @input="onInput"
      @change="onChange"
      class="input__field"
      type="text"
      :name="name"
      :id="name"
    >
    <span class="input__bottom-bar"/>
    <label class="input__label">
      {{ label }}
    </label>
    <span
      class="input__hint"
      v-if="hint"
    >
      Hint: {{ hint }}
    </span>
  </div>
</template>

<style src="css/v-input.scss"></style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      validator (value) {
        return ['number', 'password', 'url', 'text'].includes(value);
      }
    },
    label: {
      type: String,
      required: true
    },
    hint: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },

  data () {
    return {
      changeValue: this.value,
    };
  },

  methods: {
    onInput () {
      this.$emit('input', this.name, this.changeValue);
    },
    onChange () {
      this.$emit('change', this.name, this.changeValue);
    }
  }
};
</script>
