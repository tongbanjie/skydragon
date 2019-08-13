'use strict';

exports.__esModule = true;

var _buttonGroup = require('./src/button-group');

var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_buttonGroup2.default.install = function (Vue) {
  Vue.component(Button.name, Button);
};

exports.default = _buttonGroup2.default;