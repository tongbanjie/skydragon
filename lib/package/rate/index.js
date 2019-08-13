'use strict';

exports.__esModule = true;

var _rate = require('./src/rate');

var _rate2 = _interopRequireDefault(_rate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_rate2.default.install = function (Vue) {
  Vue.component(_rate2.default.name, _rate2.default);
};

exports.default = _rate2.default;