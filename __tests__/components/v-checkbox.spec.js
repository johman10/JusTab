import { shallowMount } from '@vue/test-utils';
import VCheckbox from '~components/v-checkbox';

describe('v-checkbox', () => {
  const componentFactory = (propsData = {}) => {
    return shallowMount(VCheckbox, {
      propsData: {
        name: 'test-checkbox',
        label: 'hallo',
        ...propsData
      }
    });
  };

  describe('structure', () => {
    it('contains an actual checkbox', () => {
      const wrapper = componentFactory();
      expect(wrapper.contains('input[type="checkbox"]')).toBe(true);
    });

    it('contains a styled checkbox', () => {
      const wrapper = componentFactory();
      expect(wrapper.contains('.checkbox--styled')).toBe(true);
    });
  });

  // describe('type class', () => {
  //   it('defaults to the flat type', () => {
  //     const component = componentFactory({});
  //     expect(component.$el).to.have.class('flat-button');
  //   });

  //   it('gets a class basses on type', () => {
  //     const component = componentFactory({ type: 'raised' });
  //     expect(component.$el).to.have.class('raised-button');
  //   });
  // });
});
