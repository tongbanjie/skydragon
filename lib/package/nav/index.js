'use strict';

exports.__esModule = true;

var _nav = require('./src/nav');

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nav2.default.install = function (Vue) {
  Vue.component(_nav2.default.name, _nav2.default);
};

exports.default = _nav2.default;