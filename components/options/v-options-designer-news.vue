<template>
  <div
    v-if="service"
    class="options-designer-news"
  >
    <v-input
      :value="service.panelWidth"
      type="number"
      name="designerNewsWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <v-input
      :value="service.refresh"
      type="number"
      name="designerNewsRefresh"
      label="Refresh rate (in minutes)"
      @change="onChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import vInput from '~components/v-input';

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
      this.saveData(this.service.id, name, newVal);
    }
  },
};
</script>
