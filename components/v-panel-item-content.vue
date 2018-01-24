<template>
  <div class="panel-item-content">
    <div
      class="panel-item-content--image"
      v-if="image"
      v-lazy:background-image="image"
    />
    <div class="panel-item-content--titles">
      <div
        class="panel-item-content--title"
        :title="title.length > 60 ? title : ''"
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
          class="panel-item-content--subtitle"
          :title="subtitle.length > 70 ? subtitle : ''"
        >
          <a
            v-if="subtitleUrl"
            class="panel-item-content--subtitle-url"
            :href="subtitleUrl"
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
