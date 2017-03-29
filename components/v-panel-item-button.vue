<template>
  <a @mousedown="_showRipple" class="ripple panel-item-button" :href="props.url">
    <i :class="['panel-item-button--icon', props.iconClass]"></i>
  </a>
</template>

<style src="css/v-panel-item-button.scss"></style>

<script>
  export default {
    props: {
      props: Object
    }
  }
</script>
