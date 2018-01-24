<template>
  <div
    class="options-sonarr"
    v-if="service"
  >
    <v-input
      type="url"
      @change="onChange"
      :value="service.url"
      name="sonarrUrl"
      label="Service URL"
      hint="http://localhost:8989, https://sub.domain.com/sonarr"
    />
    <v-input
      @change="onChange"
      :value="service.key"
      name="sonarrKey"
      label="API Key"
    />
    <v-input
      type="number"
      @change="onChange"
      :value="service.panelWidth"
      name="sonarrWidth"
      label="Panel width in px"
    />
    <v-input
      type="number"
      @change="onChange"
      :value="service.refresh"
      name="sonarrRefresh"
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
