'use strict';

exports.__esModule = true;
exports.TabOne = exports.TabPanel = undefined;

var _tabPanel = require('./src/tab-panel');

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _tabOne = require('./src/tab-one');

var _tabOne2 = _interopRequireDefault(_tabOne);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tabPanel2.default.install = function (Vue) {
  Vue.components(_tabPanel2.default.name, _tabPanel2.default);
};

_tabOne2.default.install = function (Vue) {
  Vue.components(_tabOne2.default.name, _tabOne2.default);
};

exports.TabPanel = _tabPanel2.default;
exports.TabOne = _tabOne2.default;