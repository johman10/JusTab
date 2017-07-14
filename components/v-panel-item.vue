<template>
  <div :class="['panel-item', { 'panel-item__hover ripple': hasCollapse || props.url, 'panel-item__expanded': expanded, 'panel-item__two-lines': props.subtitle, 'panel-item__image': props.image }]" @click="expandItem" @mousedown="_showRipple">
    <div class="panel-item--base">
      <a v-if="props.url" :href="props.url" class="panel-item--url" target="_blank">
        <v-panel-item-content :image="props.image" :has-collapse="hasCollapse" :expanded="expanded" :title="props.title" :subtitle="props.subtitle" :subtitle-url="props.subtitleUrl" :extra-title="props.extraTitle"></v-panel-item-content>
      </a>
      <v-panel-item-content v-else :image="props.image" :has-collapse="hasCollapse" :expanded="expanded" :title="props.title" :subtitle="props.subtitle" :subtitle-url="props.subtitleUrl" :extra-title="props.extraTitle"></v-panel-item-content>
    </div>
    <div v-if="hasCollapse" v-show="expanded" class="panel-item--collapse">
      <div class="panel-item--collapse-content">
        {{ props.collapseText }}
      </div>
      <div v-if="props.components" class="panel-item--button-container">
        <component v-for="(component, index) in props.components" :key="index" :is="component.name" :props="component.props"></component>
      </div>
    </div>
  </div>
</template>

<style src="css/v-panel-item.scss"></style>

<script>
  import dynamicImportComponent from 'modules/dynamic-import-component';
  import vPanelItemContent from 'components/v-panel-item-content';

  export default {
    components: {
      vPanelItemContent,
      vPanelItemButton: dynamicImportComponent('v-panel-item-button')
    },

    props: {
      props: Object
    },

    data () {
      return {
        expanded: false
      }
    },

    computed: {
      hasCollapse () {
        return !!(this.props.collapseText || this.props.components)
      }
    },

    methods: {
      expandItem () {
        if (this.hasCollapse) {
          this.expanded = !this.expanded
        }
      }
    }
  }
</script>
