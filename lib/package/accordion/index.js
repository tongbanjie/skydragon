'use strict';

exports.__esModule = true;
exports.Accordion = exports.AccordionItem = undefined;

var _accordionItem = require('./src/accordion-item');

var _accordionItem2 = _interopRequireDefault(_accordionItem);

var _accordion = require('./src/accordion');

var _accordion2 = _interopRequireDefault(_accordion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_accordionItem2.default.install = function (Vue) {
  Vue.component(_accordionItem2.default.name, _accordionItem2.default);
};
_accordion2.default.install = function (Vue) {
  Vue.component(_accordion2.default.name, _accordion2.default);
};
exports.AccordionItem = _accordionItem2.default;
exports.Accordion = _accordion2.default;