import Nav from './src/nav';

Nav.install = function(Vue) {
  Vue.component(Nav.name, Nav);
};

export default Nav;