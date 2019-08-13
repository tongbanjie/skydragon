'use strict';

exports.__esModule = true;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TooltipConstructor = _vue2.default.extend(require('./tooltip.vue'));

var instance = void 0;
var instances = [];
var seed = 1;

var Tooltip = function Tooltip(options, message, type, position) {
  options = options || {};

  if (message) {
    options = {
      ele: options,
      msg: message
    };
    if (type) {
      options.type = type;
    }
    if (position) {
      options.position = position;
    }
  } else {
    options.msg = options.message;
    delete options.message;
  }

  var id = 'tb_tooltip_' + seed++;

  instance = new TooltipConstructor({
    data: options
  });
  instance.id = id;
  instance.vm = instance.$mount();
  var tNode = document.querySelector(options.ele);
  var pNode = tNode.parentNode;
  pNode.insertBefore(instance.vm.$el, tNode.nextSibling);
  instance.vm.id = id;
  instance.dom = instance.vm.$el;
  instances.push(instance);
  return instance.vm;
};

exports.default = Tooltip;