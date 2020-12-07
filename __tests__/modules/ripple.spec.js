import { shallowMount } from '@vue/test-utils';
import ripple from 'modules/ripple';
import localVue from '../mocks/local-vue';

describe('ripple', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount({ template: '<div class="ripple" @mousedown="_showRipple"></div>' }, {
      localVue
    });
  });

  it('exports _showRipple method', () => {
    expect(ripple).toHaveProperty('methods');
    expect(ripple.methods).toHaveProperty('_showRipple');
  });

  it('adds the ripple element with the right class on click', () => {
    wrapper.trigger('mousedown');
    expect(wrapper.find('.ripple__element').exists()).toBe(true);
  });

  describe('remove ripple element', () => {
    beforeEach(() => {
      wrapper.trigger('mousedown');
    });

    it('when there are two mouse down events after each other', () => {
      wrapper.trigger('mousedown');
      expect(wrapper.findAll('.ripple__element').length).toBe(1);
    });

    it('on mouse up', (done) => {
      wrapper.trigger('mouseup');
      // Timeout for delay of removing
      setTimeout(() => {
        expect(wrapper.find('.ripple__element').exists()).toBe(false);
        done();
      }, 350);
    });

    it('on mouse leave', (done) => {
      wrapper.trigger('mouseleave');
      // Timeout for delay of removing
      setTimeout(() => {
        expect(wrapper.find('.ripple__element').exists()).toBe(false);
        done();
      }, 350);
    });
  });
});
