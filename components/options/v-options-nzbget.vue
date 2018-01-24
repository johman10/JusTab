<template>
  <div
    class="options-nzbget"
    v-if="service"
  >
    <v-input
      @change="onChange"
      :value="service.url"
      name="nzbgetUrl"
      label="Service URL"
      hint="http://localhost:6789, https://sub.domain.com/nzbget"
    />
    <v-input
      @change="onChange"
      :value="service.username"
      name="nzbgetUsername"
      label="Username"
    />
    <v-input
      type="password"
      @change="onChange"
      :value="service.password"
      name="nzbgetPassword"
      label="Password"
    />
    <v-input
      type="number"
      @change="onChange"
      :value="service.panelWidth"
      name="nzbgetWidth"
      label="Panel width in px"
    />
    <v-input
      type="number"
      @change="onChange"
      :value="service.refresh"
      name="nzbgetRefresh"
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
        return state.services.find(s => s.id === 12);
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
