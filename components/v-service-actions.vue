<template>
  <div class="service-actions" :style="wrapperStyling">
    <v-button v-if="service.actions.includes('openUnread')" class="service-actions--button" @click="openUnread(service)" text="Open unread" type="flat"></v-button>
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
      components () {
        return JSON.parse(this.service.components);
      },
      wrapperStyling () {
        return {
          display: this.service.actions.length > 0 ? 'inline-block' : 'none',
          pointerEvents: this.service.actions.length > 0 ? 'initial' : 'none'
        }
      }
    },
    methods: {
      openUnread () {
        var promises = []
        this.components.forEach((component) => {
          var url = component.props.url;
          if (url) promises.push(this.findHistory(url));
        });
        Promise.all(promises)
          .then((urls) => {
            urls.forEach((url) => { if (url) { window.open(url) } });
          });
      },
      findHistory (url) {
        return new Promise((resolve, reject) => {
          chrome.history.getVisits({ 'url': url }, function(data) {
            if (data.length === 0) {
              return resolve(url);
            } else {
              return resolve(false);
            }
          });
        })
      }
    }
  }
</script>
