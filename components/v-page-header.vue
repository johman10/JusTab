<template>
  <div class="page-header" :style="{ 'background-color': color }">
    <img @click="onBackClick" alt="Back to start page" class="page-header--back-icon" src="~img/icons/arrow_back.svg">
    <img @click="onMenuClick" title="Toggle menu" alt="Back to start page" class="page-header--menu-icon" src="~img/icons/menu.svg">
    <div class="page-header--title">
      {{ title }}
    </div>
  </div>
</template>

<style src="css/v-page-header.scss"></style>

<script>
  export default {
    props: {
      title: String,
      color: String
    },

    methods: {
      onBackClick () {
        chrome.tabs.getCurrent(function (tab) {
          chrome.tabs.update({url: 'chrome://newtab'});
        });
      },
      onMenuClick () {
        this.$emit('toggle-menu');
      }
    }
  }
</script>
