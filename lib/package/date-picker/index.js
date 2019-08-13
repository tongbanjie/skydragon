'use strict';

exports.__esModule = true;

var _datePicker = require('./src/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_datePicker2.default.install = function (Vue) {
  Vue.component(_datePicker2.default.name, _datePicker2.default);
};

exports.default = _datePicker2.default;