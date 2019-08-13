'use strict';

exports.__esModule = true;

var _backTop = require('./src/back-top');

var _backTop2 = _interopRequireDefault(_backTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_backTop2.default.install = function (Vue) {
  Vue.component(_backTop2.default.name, _backTop2.default);
};

exports.default = _backTop2.default;