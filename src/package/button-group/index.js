import ButtonGroup from './src/button-group';

ButtonGroup.install = function(Vue) {
  Vue.component(Button.name, Button);
};

export default ButtonGroup;