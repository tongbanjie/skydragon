import CheckboxGroup from './src/checkbox-group';

CheckboxGroup.install = function(Vue) {
  Vue.component(CheckboxGroup.name, CheckboxGroup);
};

export default CheckboxGroup;