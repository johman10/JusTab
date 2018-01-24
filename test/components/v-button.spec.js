import Vue from 'test/test-helpers';
import vButton from 'components/v-button';

describe('v-button', () => {
  const componentFactory = ({ type, content }) => {
    return new Vue({
      components: {
        vButton
      },
      data: {
        type
      },
      template: `<v-button :type="type">${ content }</v-button>`,
    }).$mount();
  };

  it('has the ripple class', () => {
    const component = componentFactory({});
    expect(component.$el).to.have.class('ripple');
  });

  describe('content', () => {
    it('parses HTML content', () => {
      const component = componentFactory({ content: '<div class="test-element">Hello</div>' });
      expect(component.$el.querySelector('.test-element')).to.exist;
      expect(component.$el.querySelector('.test-element')).to.include.text('Hello');
    });
  });

  describe('type class', () => {
    it('defaults to the flat type', () => {
      const component = componentFactory({});
      expect(component.$el).to.have.class('flat-button');
    });

    it('gets a class basses on type', () => {
      const component = componentFactory({ type: 'raised' });
      expect(component.$el).to.have.class('raised-button');
    });
  });
});
