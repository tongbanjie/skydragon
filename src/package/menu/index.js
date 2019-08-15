import Menu from './src/menu';
import MenuItem from './src/menu-item';

Menu.install = function(Vue) {
  Vue.component(Menu.name, Menu);
};

MenuItem.install = function(Vue) {
  Vue.component(MenuItem.name, MenuItem);
};

export {
  Menu,
  MenuItem
};