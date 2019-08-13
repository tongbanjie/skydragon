'use strict';

exports.__esModule = true;
exports.BreadcrumbOne = exports.Breadcrumb = undefined;

var _breadcrumb = require('./src/breadcrumb');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

var _breadcrumbOne = require('./src/breadcrumb-one');

var _breadcrumbOne2 = _interopRequireDefault(_breadcrumbOne);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_breadcrumb2.default.install = function (Vue) {
  Vue.component(_breadcrumb2.default.name, _breadcrumb2.default);
};

_breadcrumbOne2.default.install = function (Vue) {
  Vue.component(_breadcrumbOne2.default.name, _breadcrumbOne2.default);
};

exports.Breadcrumb = _breadcrumb2.default;
exports.BreadcrumbOne = _breadcrumbOne2.default;