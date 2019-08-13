'use strict';

exports.__esModule = true;

var _col = require('./src/col');

var _col2 = _interopRequireDefault(_col);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_col2.default.install = function (Vue) {
  Vue.component(_col2.default.name, _col2.default);
};

exports.default = _col2.default;