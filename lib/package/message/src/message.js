'use strict';

exports.__esModule = true;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageCom = require('./message.vue');
var MessageConstructor = _vue2.default.extend(MessageCom.default || MessageCom);

var instance = void 0;
var instances = [];
var seed = 1;

var Message = function Message(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }

  var userOnClose = options.onClose;
  var id = 'message_' + seed++;

  options.onClose = function () {
    Message.close(id, userOnClose);
  };

  instance = new MessageConstructor({
    data: options
  });
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.show = true;
  instance.dom = instance.vm.$el;
  instances.push(instance);
  return instance.vm;
};

Message.close = function (id, userOnClose) {
  for (var i = 0; i < instances.length; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
};

exports.default = Message;