<template>
  <div>
    <v-options-menu></v-options-menu>
    <router-view></router-view>
  </div>
</template>

<style src="css/components/options/v-options.scss"></style>

<script>
  import vOptionsMenu from 'options/v-options-menu';

  export default {
    components: {
      'v-options-menu': vOptionsMenu
    }
  }
</script>
