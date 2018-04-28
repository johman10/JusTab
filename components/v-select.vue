<template>
  <div class="select">
    <label
      class="select__label"
      @click="showList"
    >
      {{ label }}
    </label>
    <span
      class="select__bar"
      @click="showList"
    >
      {{ changeValue }}
    </span>
    <ul
      v-show="active"
      class="select__list"
    >
      <li
        v-for="option in options"
        :key="option"
        :class="['select__list-item ripple', { 'selected': option === changeValue }]"
        @click="setValue(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style src="css/v-select.scss"></style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      changeValue: this.value,
      active: false
    };
  },

  watch: {
    changeValue () {
      this.$emit('change', this.name, this.changeValue);
    }
  },

  methods: {
    showList () {
      this.active = true;
      this.$nextTick(() => {
        this.repositionList();

        // Add eventListener after timeout to prevent it to be triggered instantly
        setTimeout(() => {
          document.querySelector('body').addEventListener('click', this.hideList);
        }, 100);
      });

    },

    repositionList () {
      const scrollOffset = 10;
      let input = this.$el.querySelector('.select__bar');
      let options = this.$el.querySelector('.select__list');
      let currentOption = this.$el.querySelector('.select__list-item.selected');
      let optionHeight = currentOption.offsetHeight;
      options.style.top = (input.offsetTop - (optionHeight / 2) + scrollOffset) + 'px';

      // If there is scroll-space move to the selected option
      if (options.scrollHeight > options.offsetHeight) {
        options.scrollTop = currentOption.offsetTop - scrollOffset;
      }
    },

    hideList () {
      document.querySelector('body').removeEventListener('click', this.hideList);
      // Delay to prevent hide before click trigger
      setTimeout(() => {
        this.active = false;
      }, 100);
    },

    setValue (newVal) {
      this.changeValue = newVal;
      this.active = false;
    }
  }
};
</script>
