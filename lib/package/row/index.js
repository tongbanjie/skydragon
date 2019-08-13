'use strict';

exports.__esModule = true;

var _row = require('./src/row');

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_row2.default.install = function (Vue) {
  Vue.component(_row2.default.name, _row2.default);
};

exports.default = _row2.default;