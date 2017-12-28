<template>
  <div class="service-actions" :style="wrapperStyling">
    <v-button v-for="(action, index) in service.actions" :key="index" v-if="isValidAction(action)" class="service-actions--button" @click="action.onClick(service)" :text="action.text" type="flat"></v-button>
  </div>
</template>

<style src="css/v-service-actions.scss"></style>

<script>
  import vButton from 'components/v-button';

  export default {
    components: {
      vButton
    },
    props: {
      service: Object
    },
    computed: {
      wrapperStyling () {
        return {
          display: this.service.actions.length > 0 ? 'inline-block' : 'none',
          pointerEvents: this.service.actions.length > 0 ? 'initial' : 'none'
        }
      }
    },
    methods: {
      isValidAction (action) {
        return action && action.text && typeof action.onClick === 'function'
      }
    }
  }
</script>
