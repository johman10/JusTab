<template>
  <div
    class="options-github"
    v-if="service"
  >
    <v-input
      type="number"
      @change="saveData"
      :value="service.panelWidth"
      name="githubWidth"
      label="Panel width in px"
    />
    <v-input
      type="number"
      @change="saveData"
      :value="service.refresh"
      name="githubRefresh"
      label="Refresh rate (in minutes)"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import vInput from 'components/v-input';

export default {
  components: {
    vInput
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
