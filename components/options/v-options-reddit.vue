<template>
  <div class="options-reddit" v-if="service">
    <v-input type="text" @change="onChange" :value="service.subreddit" name="redditSubreddit" label="Subreddit"></v-input>
    <v-checkbox @change="onCheckboxChange" :checked="service.nsfw" name="redditNsfw" label="Show NSFW"></v-checkbox>
    <v-select @change="onChange" :options="sortingOptions" :value="service.sorting" name="redditSorting" label="Sorting"></v-select>
    <v-input type="number" @change="onChange" :value="service.panelWidth" name="redditWidth" label="Panel width in px"></v-input>
    <v-input type="number" @change="onChange" :value="service.refresh" name="redditRefresh" label="Refresh rate (in minutes)"></v-input>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import vInput from 'components/v-input';
  import vCheckbox from 'components/v-checkbox';
  import vSelect from 'components/v-select';

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
      }
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
        this.saveData(this.service.id, name, newVal)
      },

      onCheckboxChange (name, value) {
        this.saveData(this.service.id, name, !this.service.nsfw);
      }
    },
  }
</script>

