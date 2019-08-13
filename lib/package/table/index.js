'use strict';

exports.__esModule = true;
exports.TableCol = exports.Table = undefined;

var _table = require('./src/table');

var _table2 = _interopRequireDefault(_table);

var _tableCol = require('./src/table-col');

var _tableCol2 = _interopRequireDefault(_tableCol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_table2.default.install = function (Vue) {
  Vue.component(_table2.default.name, _table2.default);
};

_tableCol2.default.install = function (Vue) {
  Vue.component(_tableCol2.default.name, _tableCol2.default);
};

exports.Table = _table2.default;
exports.TableCol = _tableCol2.default;