import Input from '../../src/package/input';
import { getRenderedVm, getVue } from '../util';

describe('Input', () => {
  let vm;

  it('check props', () => {
    vm = getRenderedVm(Input, {
      placeholder: '请输入',
      name: 'name'
    });
    expect(vm.placeholder).to.equal('请输入');
    expect(vm.name).to.equal('name');
  });

  it('check prepend && append', () => {
    vm = getVue({
      template: '<tb-input v-model="tvalue" placeholder="helloworld"><template slot="prepend">http://</template><template slot="append">.com</template></tb-input>',
      data () {
        return {
          tvalue: ''
        }
      }
    });

    const prepend = vm.$el.querySelector('.tb-input-prepend').innerHTML;
    const append = vm.$el.querySelector('.tb-input-append').innerHTML;
    expect(prepend).to.equal('http://');
    expect(append).to.equal('.com');
  });

  it('check icon click method', done => {
    let result;
    vm = getVue({
      template: '<tb-input v-model="tvalue" icon="swap-alt" @icon-click="sayHello"></tb-input>',
      data () {
        return {
          tvalue: ''
        }
      },
      methods: {
        sayHello (e) {
          result = e;
        }
      }
    }, true);
    vm.$el.querySelector('.tb-input-icon').click();

    setTimeout(() => {
      expect(result).to.exist;
      done();
    });
  });
});