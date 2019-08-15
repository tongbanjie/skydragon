import Carousel from './src/carousel';
import CarouselItem from './src/carousel-item';

Carousel.install = function(Vue) {
  Vue.component(Carousel.name, Carousel);
};

CarouselItem.install = function(Vue) {
  Vue.component(CarouselItem.name, CarouselItem)
}

export {
  Carousel,
  CarouselItem
};
