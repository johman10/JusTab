<template>
  <h2>
    <img class="icon" v-if="props.icon" :src="props.icon">
    {{ props.text }}
  </h2>
</template>

<style scoped src="css/v-panel-subheader.scss"></style>

<script>
  export default {
    props: {
      props: Object
    }
  }
</script>
