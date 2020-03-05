<template>
  <div
    v-if="service"
    class="options-github"
  >
    <VSelect
      :options="timeOptions"
      :value="service.time"
      name="githubTime"
      label="Trending within timeframe"
      @change="onChange"
    />
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
import VInput from '~components/v-input';
import VSelect from '~components/v-select';

export default {
  components: {
    VInput,
    VSelect
  },

  data () {
    return {
      timeOptions: [
        'daily',
        'weekly',
        'monthly'
      ]
    };
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
