'use strict';

exports.__esModule = true;

var _progress = require('./src/progress');

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_progress2.default.install = function (Vue) {
  Vue.component(_progress2.default.name, _progress2.default);
};

exports.default = _progress2.default;