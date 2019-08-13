'use strict';

exports.__esModule = true;

var _code = require('./src/code');

var _code2 = _interopRequireDefault(_code);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_code2.default.install = function (Vue) {
  Vue.component(_code2.default.name, _code2.default);
};

exports.default = _code2.default;