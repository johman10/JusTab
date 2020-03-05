<template>
  <div
    v-if="service"
    class="options-product-hunt"
  >
    <VInput
      :value="service.panelWidth"
      type="number"
      name="productHuntWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <VInput
      :value="service.refresh"
      type="number"
      name="productHuntRefresh"
      label="Refresh rate (in minutes)"
      @change="onChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VInput from '~components/v-input';

export default {
  components: {
    VInput
  },
  computed: {
    ...mapState({
      services: 'services',
      service (state) {
        return state.services.find(s => s.id === 9);
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
