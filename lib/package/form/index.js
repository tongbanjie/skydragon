'use strict';

exports.__esModule = true;
exports.FormItem = exports.Form = undefined;

var _form = require('./src/form');

var _form2 = _interopRequireDefault(_form);

var _formItem = require('./src/form-item');

var _formItem2 = _interopRequireDefault(_formItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_form2.default.install = function (Vue) {
  Vue.component(_form2.default.name, _form2.default);
};

_formItem2.default.install = function (Vue) {
  Vue.component(_formItem2.default.name, _formItem2.default);
};

exports.Form = _form2.default;
exports.FormItem = _formItem2.default;