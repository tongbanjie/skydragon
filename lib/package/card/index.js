'use strict';

exports.__esModule = true;
exports.CardFooter = exports.CardBody = exports.CardHeader = exports.Card = undefined;

var _card = require('./src/card');

var _card2 = _interopRequireDefault(_card);

var _cardHeader = require('./src/card-header');

var _cardHeader2 = _interopRequireDefault(_cardHeader);

var _cardBody = require('./src/card-body');

var _cardBody2 = _interopRequireDefault(_cardBody);

var _cardFooter = require('./src/card-footer');

var _cardFooter2 = _interopRequireDefault(_cardFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_card2.default.install = function (Vue) {
  Vue.component(_card2.default.name, _card2.default);
};

_cardHeader2.default.install = function (Vue) {
  Vue.component(_cardHeader2.default.name, _cardHeader2.default);
};

_cardBody2.default.install = function (Vue) {
  Vue.component(_cardBody2.default.name, _cardBody2.default);
};

_cardFooter2.default.install = function (Vue) {
  Vue.component(_cardFooter2.default.name, _cardFooter2.default);
};

exports.Card = _card2.default;
exports.CardHeader = _cardHeader2.default;
exports.CardBody = _cardBody2.default;
exports.CardFooter = _cardFooter2.default;