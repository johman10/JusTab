<template>
  <div class="options-dribbble" v-if="service">
    <v-input type="number" @change="saveData" :value="service.panelWidth" name="dribbbleWidth" label="Panel width in px"></v-input>
    <v-input type="number" @change="saveData" :value="service.refresh" name="dribbbleRefresh" label="Refresh rate (in minutes)"></v-input>
    <v-checkbox @change="onCheckboxChange" :checked="service.gifs" name="dribbbleGifs" label="Play gifs"></v-checkbox>
    <v-checkbox @change="onCheckboxChange" :checked="service.smallImages" name="dribbbleSmallImages" label="Small images"></v-checkbox>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import vInput from 'v-input';
  import vCheckbox from 'v-checkbox';

  export default {
    components: {
      'v-input': vInput,
      'v-checkbox': vCheckbox
    },
    computed: {
      ...mapState({
        services: 'services',
        service (state) {
          return state.services.find(s => s.id === 10);
        }
      })
    },

    methods: {
      ...mapActions([
        'updateService'
      ]),
      saveData (name, newVal) {
        let changes = {};
        changes[name] = newVal;
        this.updateService({ serviceId: this.service.id, changes });
      },
      onCheckboxChange (name, value) {
        if (name === 'dribbbleGifs') {
          this.saveData(name, !this.service.gifs);
        } else if (name === 'dribbbleSmallImages') {
          this.saveData(name, !this.service.smallImages);
        }
      }
    },
  }
</script>

