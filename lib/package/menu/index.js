'use strict';

exports.__esModule = true;
exports.MenuItem = exports.Menu = undefined;

var _menu = require('./src/menu');

var _menu2 = _interopRequireDefault(_menu);

var _menuItem = require('./src/menu-item');

var _menuItem2 = _interopRequireDefault(_menuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_menu2.default.install = function (Vue) {
  Vue.component(_menu2.default.name, _menu2.default);
};

_menuItem2.default.install = function (Vue) {
  Vue.component(_menuItem2.default.name, _menuItem2.default);
};

exports.Menu = _menu2.default;
exports.MenuItem = _menuItem2.default;