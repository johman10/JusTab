<template>
  <div
    v-if="service"
    class="options-radarr"
  >
    <VInput
      :value="service.url"
      type="url"
      name="radarrUrl"
      label="Service URL"
      hint="http://localhost:7878, https://sub.domain.com/radarr"
      @change="onChange"
    />
    <VInput
      :value="service.key"
      name="radarrKey"
      label="API Key"
      @change="onChange"
    />
    <VInput
      :value="service.panelWidth"
      type="number"
      name="radarrWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <VInput
      :value="service.refresh"
      type="number"
      name="radarrRefresh"
      label="Refresh rate (in minutes)"
      @change="onChange"
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
        return state.services.find(s => s.id === 15);
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
