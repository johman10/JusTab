<template>
  <div class="panel-container">
    <div class="settings-button settings-icon waves-effect"></div>
    <v-panel v-for="(service, index) in services" :service-id="service.id"></v-panel>

    <!-- <div class="bottom-bar-container">
      <div class="calendar-info bottom-bar-part" data-service-id="1">
      </div>
      <div class="gmail-info bottom-bar-part" data-service-id="2">
      </div>
      <div class="couchpotato-info bottom-bar-part" data-service-id="4">
      </div>
      <div class="sickbeard-info bottom-bar-part" data-service-id="5">
      </div>
      <div class="sabnzbd-info bottom-bar-part" data-service-id="6">
      </div>
      <div class="designernews-info bottom-bar-part" data-se  mrvice-id="7">
        <a href="#" class="open-all flat-button waves-effect">Open unread</a>
      </div>
      <div class="hackernews-info bottom-bar-part" data-service-id="8">
        <a href="#" class="open-all flat-button waves-effect">Open unread</a>
      </div>
      <div class="github-info bottom-bar-part" data-service-id="9">
        <a href="#" class="open-all flat-button waves-effect">Open unread</a>
      </div>
      <div class="producthunt-info bottom-bar-part" data-service-id="10">
        <a href="#" class="open-all flat-button waves-effect">Open unread</a>
      </div>
      <div class="dribbble-info bottom-bar-part" data-service-id="11">
      </div>
      <div class="reddit-info bottom-bar-part" data-service-id="12">
        <a href="#" class="open-all flat-button waves-effect">Open unread</a>
      </div>
      <div class="nzbget-info bottom-bar-part" data-service-id="13">
      </div>
      <div class="sonarr-info bottom-bar-part" data-service-id="14">
      </div>
    </div>

    <div class="cleardiv"></div> -->
  </div>
</template>

<style src="css/components/v-tab.scss"></style>

<script>
  import { mapState, mapGetters } from 'vuex';
  import vPanel from 'v-panel.vue';

  export default {
    name: 'v-tab',
    components: {
      'v-panel': vPanel
    },
    computed: {
      ...mapState([ 'services' ]),
      ...mapGetters([ 'activeServices' ])
    }
  }
</script>

