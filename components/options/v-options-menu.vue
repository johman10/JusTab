<template>
  <nav :class="['options-menu', { 'options-menu__show': showMenu }]">
    <RouterLink
      v-for="service in sortedServices"
      :key="service.id"
      :to="service.optionsPath"
      :data-id="service.id"
      class="options-menu--link ripple"
      @mousedown.native="_showRipple"
    >
      <div class="options-menu--drag-handle" />
      {{ service.name }}
      <VSwitch
        :value="service.active"
        :service-id="service.id"
        :name="service.functionName + 'Active'"
        class="options-menu--switch"
        @input="onInput(service, $event)"
      />
    </RouterLink>
    <RouterLink
      to="/support"
      class="options-menu--link options-menu--support"
    >
      Support
    </RouterLink>
  </nav>
</template>

<style
src="css/options/v-options-menu.scss"></style>

<script>
import { mapGetters } from 'vuex';
import dragula from 'dragula';
import VSwitch from '~components/v-switch';

export default {
  components: {
    VSwitch
  },

  props: {
    showMenu: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters([ 'sortedServices' ])
  },

  mounted () {
    dragula([this.$el],{
      moves: function (el, container, handle) {
        return handle.className.includes('options-menu--drag-handle');
      },
      direction: 'vertical'
    }).on('dragend', function() {
      var serviceOrder = [];
      var menuLinks = document.querySelectorAll('.options-menu--link');

      for (const menuLink of menuLinks) {
        var serviceId = menuLink.getAttribute('data-id');
        if (serviceId) {
          serviceOrder.push(serviceId);
        }
      }
      localStorage.setItem('serviceOrder', serviceOrder);
      chrome.runtime.sendMessage({ name: 'loadServices' });
    });
  },

  methods: {
    onInput (service, key) {
      this.saveData(service.id, key, !service.active);
    }
  }
};
</script>
