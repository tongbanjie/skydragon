'use strict';

exports.__esModule = true;

var _radioGroup = require('./src/radio-group');

var _radioGroup2 = _interopRequireDefault(_radioGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_radioGroup2.default.install = function (Vue) {
  Vue.component(_radioGroup2.default.name, _radioGroup2.default);
};

exports.default = _radioGroup2.default;