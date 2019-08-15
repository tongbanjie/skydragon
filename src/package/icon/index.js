import Icon from './src/icon';

Icon.install = function(Vue) {
  Vue.component(Icon.name, Icon);
};

export default Icon;