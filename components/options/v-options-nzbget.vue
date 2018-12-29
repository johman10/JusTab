<template>
  <div
    v-if="service"
    class="options-nzbget"
  >
    <VInput
      :value="service.url"
      name="nzbgetUrl"
      label="Service URL"
      hint="http://localhost:6789, https://sub.domain.com/nzbget"
      @change="onChange"
    />
    <VInput
      :value="service.username"
      name="nzbgetUsername"
      label="Username"
      @change="onChange"
    />
    <VInput
      :value="service.password"
      type="password"
      name="nzbgetPassword"
      label="Password"
      @change="onChange"
    />
    <VInput
      :value="service.panelWidth"
      type="number"
      name="nzbgetWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <VInput
      :value="service.refresh"
      type="number"
      name="nzbgetRefresh"
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
