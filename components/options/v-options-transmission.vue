<template>
  <div
    class="options-transmission"
    v-if="service"
  >
    <v-input
      @change="onChange"
      :value="service.url"
      name="transmissionUrl"
      label="Service URL"
      hint="http://localhost:9091, https://sub.domain.com/transmission"
    />
    <v-input
      @change="onChange" 
      :value="service.username"
      name="transmissionUsername"
      label="Username"
    />
    <v-input
      type="password"
      @change="onChange"
      :value="service.password"
      name="transmissionPassword"
      label="Password"
    />
    <v-input
      type="number"
      @change="onChange"
      :value="service.panelWidth"
      name="transmissionWidth"
      label="Panel width in px"
    />
    <v-input
      type="number"
      @change="onChange"
      :value="service.refresh"
      name="transmissionRefresh"
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
