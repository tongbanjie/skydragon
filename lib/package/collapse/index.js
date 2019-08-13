'use strict';

exports.__esModule = true;

var _collapse = require('./src/collapse');

var _collapse2 = _interopRequireDefault(_collapse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_collapse2.default.install = function (Vue) {
  Vue.component(_collapse2.default.name, _collapse2.default);
};
exports.default = _collapse2.default;