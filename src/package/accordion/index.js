import AccordionItem from './src/accordion-item';
import Accordion from './src/accordion';

AccordionItem.install = function(Vue) {
  Vue.component(AccordionItem.name, AccordionItem);
};
Accordion.install = function(Vue) {
  Vue.component(Accordion.name, Accordion);
}
export {
  AccordionItem,
  Accordion
}