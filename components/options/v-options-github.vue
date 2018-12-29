<template>
  <div
    v-if="service"
    class="options-github"
  >
    <VInput
      :value="service.panelWidth"
      type="number"
      name="githubWidth"
      label="Panel width in px"
      @change="saveData"
    />
    <VInput
      :value="service.refresh"
      type="number"
      name="githubRefresh"
      label="Refresh rate (in minutes)"
      @change="saveData"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VInput from 'components/v-input';

export default {
  components: {
    VInput
  },
  computed: {
    ...mapState({
      services: 'services',
      service (state) {
        return state.services.find(s => s.id === 8);
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
