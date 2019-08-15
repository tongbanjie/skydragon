import Row from '../../src/package/row';
import Cow from '../../src/package/col';
import { getRenderedVm, getVue } from '../util';

describe('Row', () => {
  let vm;

  it('check row', () => {
    vm = getVue({
      template: '<tb-row><tb-col :span="2" :md="4" :xs="24"><div class="group-item"></div></tb-col>'
    });
    const className = vm.$el.querySelector('div').className;
    expect(className).to.equal('tb-col-2 tb-col-xs-24 tb-col-md-4');
  });
});