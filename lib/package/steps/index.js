'use strict';

exports.__esModule = true;
exports.Step = exports.Steps = undefined;

var _steps = require('./src/steps');

var _steps2 = _interopRequireDefault(_steps);

var _step = require('./src/step');

var _step2 = _interopRequireDefault(_step);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_steps2.default.install = function (Vue) {
  Vue.component(_steps2.default.name, _steps2.default);
};

_step2.default.install = function (Vue) {
  Vue.component(_step2.default.name, _step2.default);
};

exports.Steps = _steps2.default;
exports.Step = _step2.default;