'use strict';

exports.__esModule = true;

var _switch = require('./src/switch');

var _switch2 = _interopRequireDefault(_switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_switch2.default.install = function (vue) {
  Vue.component(_switch2.default.name, _switch2.default);
};

exports.default = _switch2.default;