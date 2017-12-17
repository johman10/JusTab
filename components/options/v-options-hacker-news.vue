<template>
  <div class="options-hacker-news" v-if="service">
    <v-select @change="onChange" :options="sortingOptions" :value="service.sorting" name="hackerNewsSorting" label="Sorting"></v-select>
    <v-input type="number" @change="onChange" :value="service.panelWidth" name="hackerNewsWidth" label="Panel width in px"></v-input>
    <v-input type="number" @change="onChange" :value="service.refresh" name="hackerNewsRefresh" label="Refresh rate (in minutes)"></v-input>
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
      }
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
        this.saveData(this.service.id, name, newVal)
      }
    },
  }
</script>
