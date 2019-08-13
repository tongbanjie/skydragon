'use strict';

exports.__esModule = true;
exports.CarouselItem = exports.Carousel = undefined;

var _carousel = require('./src/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

var _carouselItem = require('./src/carousel-item');

var _carouselItem2 = _interopRequireDefault(_carouselItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_carousel2.default.install = function (Vue) {
  Vue.component(_carousel2.default.name, _carousel2.default);
};

_carouselItem2.default.install = function (Vue) {
  Vue.component(_carouselItem2.default.name, _carouselItem2.default);
};

exports.Carousel = _carousel2.default;
exports.CarouselItem = _carouselItem2.default;