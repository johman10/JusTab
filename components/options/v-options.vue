<template>
  <div>
    <v-page-header @toggle="toggleMenu" :title="pageTitle" :color="headerColor"></v-page-header>
    <v-options-menu :show-menu="showMenu"></v-options-menu>
    <div class="options--view">
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<style src="css/options/v-options.scss"></style>

<script>
  import vOptionsMenu from 'options/v-options-menu';
  import vPageHeader from 'v-page-header';
  import { mapState } from 'vuex';

  export default {
    components: {
      vOptionsMenu,
      vPageHeader
    },
    data () {
      return {
        showMenu: false
      }
    },
    computed: {
      ...mapState({
        services: 'services',
        service (state) {
          return state.services.find((service) => service.optionsPath === this.$route.path);
        }
      }),
      headerColor () {
        if (this.service) {
          return this.service.color;
        } else if (this.$route.path === '/support') {
          return '#03a9f4';
        } else {
          return 'white';
        }
      },
      pageTitle () {
        if (this.service) {
          return this.service.name;
        } else if (this.$route.path === '/support') {
          return 'Support';
        }
      }
    },

    methods: {
      toggleMenu () {
        this.showMenu = !this.showMenu;
      }
    }
  }
</script>
