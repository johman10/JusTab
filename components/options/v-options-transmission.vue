<template>
  <div
    v-if="service"
    class="options-transmission"
  >
    <v-input
      :value="service.url"
      name="transmissionUrl"
      label="Service URL"
      hint="http://localhost:9091, https://sub.domain.com/transmission"
      @change="onChange"
    />
    <v-input
      :value="service.username" 
      name="transmissionUsername"
      label="Username"
      @change="onChange"
    />
    <v-input
      :value="service.password"
      type="password"
      name="transmissionPassword"
      label="Password"
      @change="onChange"
    />
    <v-input
      :value="service.panelWidth"
      type="number"
      name="transmissionWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <v-input
      :value="service.refresh"
      type="number"
      name="transmissionRefresh"
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
        return state.services.find(s => s.id === 14);
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
