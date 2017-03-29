<template>
  <div class="options-designer-news" v-if="service">
    <v-input type="number" @change="onChange" :value="service.panelWidth" name="designerNewsWidth" label="Panel width in px"></v-input>
    <v-input type="number" @change="onChange" :value="service.refresh" name="designerNewsRefresh" label="Refresh rate (in minutes)"></v-input>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import vInput from 'v-input';

  export default {
    components: {
      vInput
    },
    computed: {
      ...mapState({
        services: 'services',
        service (state) {
          return state.services.find((s) => s.id === 6);
        }
      })
    },

    methods: {
      onChange (name, newVal) {
        this.saveData(this.service.id, name, newVal)
      }
    },
  }
</script>

