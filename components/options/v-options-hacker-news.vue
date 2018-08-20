<template>
  <div
    v-if="service"
    class="options-hacker-news"
  >
    <v-select
      :options="sortingOptions"
      :value="service.sorting"
      name="hackerNewsSorting"
      label="Sorting"
      @change="onChange"
    />
    <v-input
      :value="service.panelWidth"
      type="number"
      name="hackerNewsWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <v-input
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
import vInput from 'components/v-input';
import vSelect from 'components/v-select';

export default {
  components: {
    vInput,
    vSelect
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
