<template>
  <div
    v-if="service"
    class="options-sonarr"
  >
    <VInput
      :value="service.url"
      type="url"
      name="sonarrUrl"
      label="Service URL"
      hint="http://localhost:8989, https://sub.domain.com/sonarr"
      @change="onChange"
    />
    <VInput
      :value="service.key"
      name="sonarrKey"
      label="API Key"
      @change="onChange"
    />
    <VInput
      :value="service.panelWidth"
      type="number"
      name="sonarrWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <VInput
      :value="service.refresh"
      type="number"
      name="sonarrRefresh"
      label="Refresh rate (in minutes)"
      @change="onChange"
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
        return state.services.find(s => s.id === 13);
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
