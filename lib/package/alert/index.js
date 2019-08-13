'use strict';

exports.__esModule = true;

var _alert = require('./src/alert');

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_alert2.default.install = function (Vue) {
  Vue.component(_alert2.default.name, _alert2.default);
};

exports.default = _alert2.default;