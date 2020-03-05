import { createLocalVue } from '@vue/test-utils';
import ripple from '~modules/ripple';

const localVue = createLocalVue();
localVue.mixin(ripple);

export default localVue;
