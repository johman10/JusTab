<template>
  <div class="panel-item-content">
    <div
      v-lazy:background-image="image"
      v-if="image"
      class="panel-item-content--image"
    />
    <div class="panel-item-content--titles">
      <div
        :title="title.length > 60 ? title : ''"
        class="panel-item-content--title"
      >
        {{ title }}
      </div>
      <div
        v-if="extraTitle"
        class="panel-item-content--extra-title"
      >
        {{ extraTitle }}
      </div>
      <div
        v-else-if="hasCollapse"
        class="panel-item-content--icon"
      />
      <template v-if="subtitle">
        <div
          :title="subtitle.length > 70 ? subtitle : ''"
          class="panel-item-content--subtitle"
        >
          <a
            v-if="subtitleUrl"
            :href="subtitleUrl"
            class="panel-item-content--subtitle-url"
          >
            {{ subtitle }}
          </a>
          <template v-else>
            {{ subtitle }}
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<style src="css/v-panel-item-content.scss"></style>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    subtitleUrl: {
      type: String,
      default: ''
    },
    extraTitle: {
      type: String,
      default: ''
    },
    hasCollapse: {
      type: Boolean,
      default: false
    },
    image: {
      type: [String, Object],
      default: ''
    }
  }
};
</script>
