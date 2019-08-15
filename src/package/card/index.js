import Card from './src/card';
import CardHeader from './src/card-header';
import CardBody from './src/card-body';
import CardFooter from './src/card-footer'

Card.install = function(Vue) {
  Vue.component(Card.name, Card);
};

CardHeader.install = function(Vue) {
  Vue.component(CardHeader.name, CardHeader);
};

CardBody.install = function(Vue) {
  Vue.component(CardBody.name, CardBody);
};

CardFooter.install = function(Vue) {
  Vue.component(CardFooter.name, CardFooter);
};

export {
  Card,
  CardHeader,
  CardBody,
  CardFooter
};