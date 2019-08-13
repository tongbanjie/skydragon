'use strict';

exports.__esModule = true;

var _badge = require('./src/badge');

var _badge2 = _interopRequireDefault(_badge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_badge2.default.install = function (Vue) {
  Vue.component(_badge2.default.name, _badge2.default);
};

exports.default = _badge2.default;