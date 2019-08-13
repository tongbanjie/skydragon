'use strict';

exports.__esModule = true;
exports.TimeLineItem = exports.TimeLine = undefined;

var _timeline = require('./src/timeline');

var _timeline2 = _interopRequireDefault(_timeline);

var _timelineItem = require('./src/timeline-item');

var _timelineItem2 = _interopRequireDefault(_timelineItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_timeline2.default.install = function (vue) {
  Vue.component(_timeline2.default.name, _timeline2.default);
};
_timelineItem2.default.install = function (vue) {
  Vue.component(_timelineItem2.default.name, _timelineItem2.default);
};

exports.TimeLine = _timeline2.default;
exports.TimeLineItem = _timelineItem2.default;