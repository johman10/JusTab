<template>
  <div
    v-if="service"
    class="options-reddit"
  >
    <v-input
      :value="service.subreddit"
      name="redditSubreddit"
      label="Subreddit"
      @change="onChange"
    />
    <v-checkbox
      :checked="service.nsfw"
      name="redditNsfw"
      label="Show NSFW"
      @change="onCheckboxChange"
    />
    <v-select
      :options="sortingOptions"
      :value="service.sorting"
      name="redditSorting"
      label="Sorting"
      @change="onChange"
    />
    <v-input
      :value="service.panelWidth"
      type="number"
      name="redditWidth"
      label="Panel width in px"
      @change="onChange"
    />
    <v-input
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
import vInput from '~components/v-input';
import vCheckbox from '~components/v-checkbox';
import vSelect from '~components/v-select';

export default {
  components: {
    vInput,
    vSelect,
    vCheckbox
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
    })
  },

  methods: {
    onChange (name, newVal) {
      this.saveData(this.service.id, name, newVal);
    },

    onCheckboxChange (name) {
      this.saveData(this.service.id, name, !this.service.nsfw);
    }
  },
};
</script>
