<template>
  <div class="panel-item-content">
    <div class="panel-item-content--image" v-if="image" v-lazy:background-image="image"></div>
    <div class="panel-item-content--titles">
      <div class="panel-item-content--title">
        {{ title }}
      </div>
      <div v-if="extraTitle" class="panel-item-content--extra-title">
        {{ extraTitle }}
      </div>
      <div v-else-if="hasCollapse" class="panel-item-content--icon"></div>
      <template v-if="subtitle">
        <a v-if="subtitleUrl" class="panel-item-content--subtitle-url" :href="subtitleUrl">
          <div v-if="subtitle" class="panel-item-content--subtitle">
            {{ subtitle }}
          </div>
        </a>
        <div v-else class="panel-item-content--subtitle">
          {{ subtitle }}
        </div>
      </template>
    </div>
  </div>
</template>

<style src="css/components/v-panel-item-content.scss"></style>

<script>
  export default {
    props: {
      title: String,
      subtitle: String,
      subtitleUrl: String,
      extraTitle: String,
      hasCollapse: Boolean,
      image: [String, Boolean]
    }
  }
</script>
