import Vue from 'test/test-helpers';
import vCheckbox from 'v-checkbox';

describe('v-checkbox', () => {
  const componentFactory = ({ name, value, label, checked }) => {
    return new Vue({
      template: '<v-checkbox :name="name" :value="value" :label="label" :checked="checked"></v-checkbox>',
      components: {
        vCheckbox
      },
      data: {
        name,
        value,
        label,
        checked
      }
    }).$mount();
  };

  describe('structure', () => {
    it('contains an actual checkbox', () => {
      const component = componentFactory({});
      expect(component.$el.querySelector('input[type="checkbox"]')).to.exist;
    });

    it('contains a styled checkbox', () => {
      const component = componentFactory({});
      expect(component.$el.querySelector('.checkbox--styled')).to.exist;
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
