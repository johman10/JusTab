<template>
  <div
    v-if="service"
    class="options-reddit"
  >
    <VInput
      :value="service.subreddit"
      name="redditSubreddit"
      label="Subreddit"
      @change="onChange"
    />
    <VCheckbox
      v-model="showNsfw"
      name="redditNsfw"
      label="Show NSFW"
    />
    <VSelect
      :options="sortingOptions"
      :value="service.sorting"
      name="redditSorting"
      label="Sorting"
      @change="onChange"
    />
    <VInput
      :value="service.panelWidth"
      type="number"
      name="redditWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <VInput
      :value="service.refresh"
      type="number"
      name="redditRefresh"
      label="Refresh rate (in minutes)"
      @change="onChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VInput from '~components/v-input';
import VCheckbox from '~components/v-checkbox';
import VSelect from '~components/v-select';

export default {
  components: {
    VInput,
    VSelect,
    VCheckbox
  },

  data () {
    return {
      sortingOptions: [
        'Hot',
        'New',
        'Rising',
        'Top - Hour',
        'Top - Day',
        'Top - Week',
        'Top - Month',
        'Top - Year',
        'Top - All Time',
        'Controversial - Hour',
        'Controversial - Day',
        'Controversial - Week',
        'Controversial - Months',
        'Controversial - Year',
        'Controversial - All Time'
      ]
    };
  },

  computed: {
    ...mapState({
      services: 'services',
      service (state) {
        return state.services.find((s) => s.id === 11);
      }
    }),
    showNsfw: {
      get() {
        return this.service.nsfw;
      },
      set(val) {
        this.onChange('redditNsfw', val);
      }
    }
  },

  methods: {
    onChange (name, newVal) {
      this.saveData(this.service.id, name, newVal);
    }
  },
};
</script>
