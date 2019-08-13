'use strict';

exports.__esModule = true;
exports.SwitchableItem = exports.Switchable = undefined;

var _switchable = require('./src/switchable');

var _switchable2 = _interopRequireDefault(_switchable);

var _switchableItem = require('./src/switchable-item');

var _switchableItem2 = _interopRequireDefault(_switchableItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_switchable2.default.install = function (Vue) {
  Vue.component(_switchable2.default.name, _switchable2.default);
};
_switchableItem2.default.install = function (Vue) {
  Vue.component(_switchableItem2.default.name, _switchableItem2.default);
};
exports.Switchable = _switchable2.default;
exports.SwitchableItem = _switchableItem2.default;