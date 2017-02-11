<template>
  <a class="panel-item-button" :href="props.url">
    <i :class="['panel-item-button--icon', props.iconClass]"></i>
  </a>
</template>

<style src="css/components/v-panel-item-button.scss"></style>

<script>
  export default {
    props: {
      props: Object
    }
  }
</script>
