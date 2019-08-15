import Breadcrumb from './src/breadcrumb';
import BreadcrumbOne from './src/breadcrumb-one';

Breadcrumb.install = function(Vue) {
  Vue.component(Breadcrumb.name, Breadcrumb);
};

BreadcrumbOne.install = function(Vue) {
  Vue.component(BreadcrumbOne.name, BreadcrumbOne);
};

export {
  Breadcrumb,
  BreadcrumbOne
};