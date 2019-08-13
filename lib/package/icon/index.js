'use strict';

exports.__esModule = true;

var _icon = require('./src/icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_icon2.default.install = function (Vue) {
  Vue.component(_icon2.default.name, _icon2.default);
};

exports.default = _icon2.default;