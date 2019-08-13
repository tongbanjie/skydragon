'use strict';

exports.__esModule = true;

var _modal = require('./src/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_modal2.default.install = function (Vue) {
  Vue.component(_modal2.default.name, _modal2.default);
};

exports.default = _modal2.default;