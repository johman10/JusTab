<template>
  <div class="panel-item-content">
    <div class="panel-item-content--title">
      {{ title }}
    </div>
    <div v-if="extraTitle" class="panel-item-content--extra-title">
      {{ extraTitle }}
    </div>
    <div v-else-if="hasCollapse" class="panel-item-content--icon"></div>
    <div v-if="subtitle" class="panel-item-content--subtitle">
      {{ subtitle }}
    </div>
  </div>
</template>

<style src="css/components/v-panel-item-content.scss"></style>

<script>
  export default {
    props: {
      title: String,
      subtitle: String,
      extraTitle: String,
      hasCollapse: Boolean
    }
  }
</script>
