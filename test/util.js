import Vue from 'vue/dist/vue.common.js';
import Sd from '../src/index.js';
Vue.use(Sd);

let id = 0;

const createElm = () => {
  const elm = document.createElement('div');

  elm.id = 'app' + ++id;
  document.body.appendChild(elm);
  return elm;
};

const getVue = (Compo, mounted = false) => {
  const elm = createElm();

  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo };
  }
  return new Vue(Compo).$mount(elm);
};

const getRenderedVm = (Component, propsData) => {
  const Ctor = Vue.extend(Component);
  const elm = createElm();
  const vm = new Ctor({ propsData }).$mount(elm);
  return vm;
};

export {
  getVue,
  getRenderedVm
}