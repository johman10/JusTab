<template>
  <div
    v-if="service"
    class="options-hacker-news"
  >
    <VSelect
      :options="sortingOptions"
      :value="service.sorting"
      name="hackerNewsSorting"
      label="Sorting"
      @change="onChange"
    />
    <VInput
      :value="service.panelWidth"
      type="number"
      name="hackerNewsWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <VInput
      :value="service.refresh"
      type="number"
      name="hackerNewsRefresh"
      label="Refresh rate (in minutes)"
      @change="onChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VInput from 'components/v-input';
import VSelect from 'components/v-select';

export default {
  components: {
    VInput,
    VSelect
  },

  data () {
    return {
      sortingOptions: ['Top', 'New', 'Best']
    };
  },

  computed: {
    ...mapState({
      services: 'services',
      service (state) {
        return state.services.find(s => s.id === 7);
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
