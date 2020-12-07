import VButton from 'components/v-button';
import { shallowMount } from '@vue/test-utils';
import localVue from '../mocks/local-vue';

describe('v-button', () => {
  const componentFactory = ({ type, content } = {}) => {
    return shallowMount(VButton, {
      propsData: {
        type,
      },
      localVue,
      slots: {
        default: content || '<div>Hello</div>'
      }
    });
  };

  it('has the ripple class', () => {
    const wrapper = componentFactory();
    expect(wrapper.classes()).toContain('ripple');
  });

  describe('content', () => {
    it('parses HTML content', () => {
      const wrapper = componentFactory({ content: '<div class="test-element">Hello</div>' });
      expect(wrapper.find('.test-element').exists()).toBe(true);
      expect(wrapper.text()).toBe('Hello');
    });
  });

  describe('type class', () => {
    it('defaults to the flat type', () => {
      const wrapper = componentFactory();
      expect(wrapper.classes()).toContain('flat-button');
    });

    it('gets a class basses on type', () => {
      const wrapper = componentFactory({ type: 'raised' });
      expect(wrapper.classes()).toContain('raised-button');
    });
  });
});
