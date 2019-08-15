import Switchable from './src/switchable';
import SwitchableItem from './src/switchable-item';

Switchable.install = function(Vue) {
  Vue.component(Switchable.name, Switchable);
};
SwitchableItem.install = function(Vue) {
  Vue.component(SwitchableItem.name, SwitchableItem);
}
export {
  Switchable,
  SwitchableItem
};