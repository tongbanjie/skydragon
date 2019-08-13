'use strict';

exports.__esModule = true;

var _selectOption = require('../select/src/select-option');

var _selectOption2 = _interopRequireDefault(_selectOption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_selectOption2.default.install = function (Vue) {
  Vue.component(_selectOption2.default.name, _selectOption2.default);
};

exports.default = _selectOption2.default;