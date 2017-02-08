<template>
  <a @click="$emit('click')" :class="['waves-effect', typeClass, extraClass]">{{ text }}</a>
</template>

<style src="css/components/v-button.scss"></style>

<script>
  export default {
    props: {
      type: String,
      extraClass: String,
      text: String
    },

    computed: {
      typeClass () {
        return this.type + '-button';
      }
    }
  }
</script>
