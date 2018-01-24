<template>
  <div
    class="options-couch-potato"
    v-if="service"
  >
    <v-input
      @change="onChange"
      :value="service.url"
      name="couchPotatoUrl"
      label="Service URL"
      hint="http://localhost:5000, https://sub.domain.com/couchpotato"
    />
    <v-input
      @change="onChange"
      :value="service.key"
      name="couchPotatoKey"
      label="API Key"
    />
    <v-input
      type="number"
      @change="onChange"
      :value="service.panelWidth"
      name="couchPotatoWidth"
      label="Panel width in px"
    />
    <v-input
      type="number"
      @change="onChange"
      :value="service.refresh"
      name="couchPotatoRefresh"
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
