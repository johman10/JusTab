<template>
  <nav :class="['options-menu', { 'options-menu__show': showMenu }]">
    <router-link v-for="service in sortedServices" :key="service.id" :to="service.optionsPath" class="options-menu--link ripple" @mousedown.native="_showRipple" :data-id="service.id">
      <span class="options-menu--drag-handle"></span>
      {{ service.name }}
      <v-switch @input="onInput(service, $event)" :value="service.active" :service-id="service.id" :name="service.functionName + 'Active'" class="options-menu--switch"></v-switch>
    </router-link>
    <router-link to="/support" class="options-menu--link options-menu--support">
      Support
    </router-link>
  </nav>
</template>

<style src="css/options/v-options-menu.scss"></style>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import dragula from 'dragula';
  import vSwitch from 'components/v-switch';

  export default {
    props: {
      showMenu: Boolean
    },
    components: {
      vSwitch
    },
    computed: {
      ...mapGetters([ 'sortedServices' ])
    },
    methods: {
      onInput (service, key, value) {
        this.saveData(service.id, key, !service.active);
      }
    },
    mounted () {
      dragula([this.$el],{
        moves: function (el, container, handle) {
          return handle.className.includes('options-menu--drag-handle');
        },
        direction: 'vertical'
      }).on('dragend', function(el) {
        var serviceOrder = [];
        var menuLinks = document.querySelectorAll('.options-menu--link');
        for(var el of menuLinks) {
          var serviceId = el.getAttribute('data-id')
          if (serviceId) {
            serviceOrder.push(serviceId);
          }
        }
        localStorage.setItem('serviceOrder', serviceOrder);
        chrome.runtime.sendMessage({ name: 'loadServices' });
      });
    }
  }
</script>
