import VInput from '~components/v-input';
import { shallowMount } from '@vue/test-utils';
import localVue from '../mocks/local-vue';

describe('v-input', () => {
  const componentFactory = ({ name, type, label, hint, value } = {}) => {
    return shallowMount(VInput, {
      propsData: { name, type, label, hint, value },
      localVue,
    });
  };

  it('has the ripple class', () => {
    const wrapper = componentFactory();
    expect(wrapper.classes()).toContain('ripple');
  });
});
