'use strict';

exports.__esModule = true;

var _checkbox = require('./src/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkbox2.default.install = function (Vue) {
  Vue.component(_checkbox2.default.name, CheckBox);
};

exports.default = _checkbox2.default;