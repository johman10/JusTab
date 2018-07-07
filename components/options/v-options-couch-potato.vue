<template>
  <div
    v-if="service"
    class="options-couch-potato"
  >
    <v-input
      :value="service.url"
      name="couchPotatoUrl"
      label="Service URL"
      hint="http://localhost:5000, https://sub.domain.com/couchpotato"
      @change="onChange"
    />
    <v-input
      :value="service.key"
      name="couchPotatoKey"
      label="API Key"
      @change="onChange"
    />
    <v-input
      :value="service.panelWidth"
      type="number"
      name="couchPotatoWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <v-input
      :value="service.refresh"
      type="number"
      name="couchPotatoRefresh"
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
        return state.services.find((s) => s.id === 3);
      }
    })
  },

  methods: {
    onChange (name, newVal) {
      this.saveData(this.service.id, name, newVal);
    }
  }
};
</script>
