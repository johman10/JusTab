<template>
  <div class="input">
    <input
      v-if="type === 'number'"
      :id="name"
      v-model="changeValue"
      :name="name"
      placeholder="."
      class="input__field"
      type="number"
      @input="onInput"
      @change="onChange"
    />
    <input
      v-else-if="type === 'password'"
      :id="name"
      v-model="changeValue"
      :name="name"
      placeholder="."
      class="input__field"
      type="password"
      @input="onInput"
      @change="onChange"
    />
    <input
      v-else-if="type === 'url'"
      :id="name"
      v-model="changeValue"
      :name="name"
      placeholder="."
      class="input__field"
      type="url"
      @input="onInput"
      @change="onChange"
    />
    <input
      v-else
      :id="name"
      v-model="changeValue"
      :name="name"
      placeholder="."
      class="input__field"
      type="text"
      @input="onInput"
      @change="onChange"
    />
    <span class="input__bottom-bar" />
    <label class="input__label">
      {{ label }}
    </label>
    <span
      v-if="hint"
      class="input__hint"
    >
      Hint: {{ hint }}
    </span>
  </div>
</template>

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

<style src="css/v-input.scss"></style>
