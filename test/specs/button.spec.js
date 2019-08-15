import Button from '../../src/package/button';
import { getRenderedVm, getVue } from '../util';

describe('Button', () => {
  let vm;

  it('check classname', () => {
    vm = getRenderedVm(Button, {
      type: 'primary',
      icon: 'archive'
    });
    const className = vm.$el.className;
    expect(className).to.equal('btn btn-primary');
  });

  it('check icon', () => {
    expect(vm.icon).to.equal('archive');
  });

  it('check size', () => {
    vm = getRenderedVm(Button, {
      type: 'primary',
      icon: 'archive',
      size: 'xs'
    });
    const className = vm.$el.className;
    expect(className).to.equal('btn btn-primary btn-xs');
  });

  it('check disabled', () => {
    vm = getRenderedVm(Button, {
      type: 'primary',
      icon: 'archive',
      size: 'xs',
      disabled: true
    });
    const disabled = vm.$el.disabled;
    expect(disabled).to.equal(true);
  });

  it('check button value', done => {
    let result;
    vm = getVue({
      template: '<tb-btn type="primary" @click="sayHello">primary</tb-btn>',
      methods: {
        sayHello (ev) {
          result = ev;
        }
      }
    }, true);

    vm.$el.click();

    setTimeout(() => {
      expect(result).to.exist;
      done();
    }, 20);
  });
});