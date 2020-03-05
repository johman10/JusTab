<template>
  <div
    v-if="service"
    class="options-couch-potato"
  >
    <VInput
      :value="service.url"
      name="couchPotatoUrl"
      label="Service URL"
      hint="http://localhost:5000, https://sub.domain.com/couchpotato"
      @change="onChange"
    />
    <VInput
      :value="service.key"
      name="couchPotatoKey"
      label="API Key"
      @change="onChange"
    />
    <VInput
      :value="service.panelWidth"
      type="number"
      name="couchPotatoWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <VInput
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
import VInput from '~components/v-input';

export default {
  components: {
    VInput
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
