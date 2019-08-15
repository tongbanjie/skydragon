import Switch from './src/switch';

Switch.install = function(vue) {
  Vue.component(Switch.name, Switch);
};

export default Switch;