import SelectOption from '../select/src/select-option';

SelectOption.install = function(Vue) {
  Vue.component(SelectOption.name, SelectOption);
};

export default SelectOption;