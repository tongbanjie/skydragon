'use strict';

exports.__esModule = true;

var _cascader = require('./src/cascader');

var _cascader2 = _interopRequireDefault(_cascader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cascader2.default.install = function (Vue) {
  Vue.component(_cascader2.default.name, _cascader2.default);
};

exports.default = _cascader2.default;