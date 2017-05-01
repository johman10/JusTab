import Vue from 'test/test-helpers';
import ripple from 'modules/ripple';

describe('ripple', () => {
  const mousedownEvent = new MouseEvent('mousedown');
  const mouseupEvent = new MouseEvent('mouseup');
  const mouseleaveEvent = new MouseEvent('mouseleave');
  let vm;

  beforeEach(() => {
    vm = new Vue({
      template: '<div class="ripple" @mousedown="_showRipple"></div>'
    }).$mount();
  });

  it('exports _showRipple method', () => {
    expect(ripple).to.have.all.keys('methods');
    expect(ripple.methods).to.have.all.keys('_showRipple');
  });

  it('adds the ripple element with the right class on click', () => {
    vm.$el.dispatchEvent(mousedownEvent);
    expect(vm.$el.querySelector('.ripple__element')).to.exist;
  });

  describe('remove ripple element', () => {
    beforeEach(() => {
      vm.$el.dispatchEvent(mousedownEvent);
    });

    it('on mouse up', (done) => {
      vm.$el.dispatchEvent(mouseupEvent);
      // Timeout for delay of removing
      setTimeout(() => {
        expect(vm.$el).to.not.contain('.ripple__element');
        done();
      }, 350);
    });

    it('on mouse leave', (done) => {
      vm.$el.dispatchEvent(mouseleaveEvent);
      // Timeout for delay of removing
      setTimeout(() => {
        expect(vm.$el.querySelector('.ripple__element')).to.not.exist;
        done();
      }, 350);
    });
  });
});
