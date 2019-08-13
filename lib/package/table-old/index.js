'use strict';

exports.__esModule = true;
exports.TableColumn = exports.Table = undefined;

var _tableColumn = require('./src/table-column');

var _tableColumn2 = _interopRequireDefault(_tableColumn);

var _table = require('./src/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_table2.default.install = function (Vue) {
  Vue.component(_table2.default.name, _table2.default);
};
_tableColumn2.default.install = function (Vue) {
  Vue.component(_tableColumn2.default.name, _tableColumn2.default);
};
exports.Table = _table2.default;
exports.TableColumn = _tableColumn2.default;