import { getVue } from '../util';

describe('checkbox', () => {
  let vm;

  it('set value', done => {
    vm = getVue({
      template: '<tb-checkbox v-model="checked" label="hello" true-label="hello" false-label="world"></tb-checkbox>',
      data () {
        return {
          checked: 'hello'
        }
      }
    });

    let checked = vm.$el.querySelector('input[type="checkbox"]').checked;
    expect(checked).to.equal(true);
    vm.checked = 'world';
    setTimeout(() => {
      checked = vm.$el.querySelector('input[type="checkbox"]').checked;
      expect(checked).to.equal(false);
      done();
    }, 200);
  });

  it('check checkbox group', done => {
    vm = getVue({
      template: '<tb-checkbox-group v-model="checked2"><tb-checkbox label="say" :inline="true">dasda</tb-checkbox><tb-checkbox label="what" :inline="true">hello world2</tb-checkbox></tb-checkbox-group>',
      data () {
        return {
          checked2: ['say', 'what']
        }
      }
    });

    const checkboxs = vm.$el.querySelectorAll('input[type="checkbox"]:checked');
    const arr = [];
    checkboxs.forEach((one, index) => {
      arr.push(one.value);
    });

    expect(JSON.stringify(arr)).to.equal(JSON.stringify(['say', 'what']));
    done();
  });
});