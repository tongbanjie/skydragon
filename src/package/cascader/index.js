import Cascader from './src/cascader';

Cascader.install = function(Vue) {
  Vue.component(Cascader.name, Cascader);
};

export default Cascader;