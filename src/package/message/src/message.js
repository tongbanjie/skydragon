import Vue from 'vue';

const MessageCom = require('./message.vue');
const MessageConstructor = Vue.extend(MessageCom.default || MessageCom);

let instance;
const instances = [];
let seed = 1;

var Message = function(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }

  const userOnClose = options.onClose;
  const id = 'message_' + seed++;

  options.onClose = function() {
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

Message.close = function(id, userOnClose) {
  for (let i = 0; i < instances.length; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
};

export default Message;

