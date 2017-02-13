<template>
  <div class="input">
    <input v-if="type === 'text'" :value="changeValue" v-model="changeValue" placeholder="." @input="onInput" @change="onChange" class="input--field" type="text" :name="name" :id="name" required>
    <input v-else-if="type === 'number'" :value="changeValue" v-model="changeValue" placeholder="." @input="onInput" @change="onChange" class="input--field" type="number" :name="name" :id="name" required>
    <span class="input--bottom-bar"></span>
    <label class="input--label">{{ label }}</label>
  </div>
</template>

<style src="css/components/v-input.scss"></style>

<script>
  export default {
    props: {
      name: String,
      type: String,
      label: String,
      value: [String, Number]
    },

    data () {
      return {
        changeValue: this.value,
      }
    },

    methods: {
      onInput () {
        this.$emit('input', this.name, this.changeValue);
      },
      onChange () {
        this.$emit('change', this.name, this.changeValue);
      }
    }
  }
</script>
