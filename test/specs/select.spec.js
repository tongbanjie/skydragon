import { getVue } from '../util';

describe('Select', () => {
  let vm;

  // 单选
  it('set value', done => {
    vm = getVue({
      template: '<tb-select-input v-model="selectValue" :options="options" :filter="true" :multi="true"></tb-select-input>',
      data () {
        return {
          selectValue: 1,
          options: [{
            value: 1,
            disabled: false,
            label: '铜板街'
          }, {
            value: 2,
            disabled: true,
            label: '铜金所'
          }, {
            value: 3,
            disabled: true,
            label: '铜贝'
          }, {
            value: 4,
            disabled: false,
            label: '铜板'
          }, {
            value: 5,
            disabled: false,
            label: '铜升花'
          }, {
            value: 6,
            disabled: false,
            label: '铜天下'
          }]
        }
      }
    });

    let value = vm.$el.querySelector('.tb-input').value;
    expect(value).to.equal('铜板街');
    // 修改值
    vm.selectValue = 4;
    setTimeout(() => {
      value = vm.$el.querySelector('.tb-input').value
      expect(value).to.equal('铜板');
      done();
    }, 50);
  });

  // 多选
  it('check multi', done => {
    vm.selectValue = '1,4';
    setTimeout(() => {
      const value = vm.$el.querySelector('.tb-input').value;
      expect(value).to.equal('铜板街,铜板');
      done();
    }, 50);
  });

  // 筛选
  it('check filter', done => {
    vm.$el.querySelector('.tb-input').click();
    setTimeout(() => {
      const c = vm.$children[0];
      c.filterLabel = '铜板'
      setTimeout(() => {
        const li = vm.$el.querySelectorAll('li');
        const arr = [];
        for (var i = 0; i < li.length; i++) {
          arr.push(li[i].innerText)
        }
        expect(JSON.stringify(arr)).to.equal(JSON.stringify(['铜板街', '铜板']));
        done();
      }, 50);
    }, 300);
  });
});