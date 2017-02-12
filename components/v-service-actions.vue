<template>
  <div class="service-actions" :style="wrapperStyling">
    <v-button v-if="service.actions.includes('openUnread')" class="service-actions--button" @click="openUnread(service)" text="Open unread" type="flat"></v-button>
  </div>
</template>

<style src="css/components/v-service-actions.scss"></style>

<script>
  import vButton from 'v-button';

  export default {
    components: {
      'v-button': vButton
    },
    props: {
      service: Object
    },
    data () {
      return {
        wrapperStyling: {
          width: this.service.panelWidth + 'px',
          opacity: this.service.actions.length > 0 ? 1 : 0
        }
      }
    },
    computed: {
      components () {
        return JSON.parse(this.service.components);
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
