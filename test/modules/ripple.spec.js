import ripple from 'modules/ripple';

describe('ripple', () => {
  it('exports _showRipple method', () => {
    expect(ripple).to.have.all.keys('methods');
    expect(ripple.methods).to.have.all.keys('_showRipple');
  });
});
