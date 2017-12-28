<template>
  <a @mousedown="_showRipple" class="ripple panel-item-button" :href="props.url" @click.prevent="onClick">
    <i :class="['panel-item-button--icon', props.iconClass]"></i>
  </a>
</template>

<style src="css/v-panel-item-button.scss"></style>

<script>
  export default {
    props: {
      props: Object
    },
    methods: {
      onClick ($event) {
        chrome.tabs.create({url: this.props.url});
      }
    }
  }
</script>
