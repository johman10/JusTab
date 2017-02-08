<template>
  <div>
    {{ props.title }}
    <component v-for="component in props.components" :is="component.name" :props="component.props"></component>
  </div>
</template>

<script>
  import vPanelItemButton from 'v-panel-item-button';

  export default {
    components: {
      'v-panel-item-button': vPanelItemButton
    },

    props: {
      props: Object
    },

    data () {
      return {
        expanded: false
      }
    }
  }
</script>
