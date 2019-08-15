import Vue from 'vue';

let TooltipConstructor = Vue.extend(require('./tooltip.vue'));

let instance;
const instances = [];
let seed = 1;

var Tooltip = function(options, message, type, position) {
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

  const id = 'tb_tooltip_' + seed++;

  instance = new TooltipConstructor({
    data: options
  });
  instance.id = id;
  instance.vm = instance.$mount();
  const tNode = document.querySelector(options.ele);
  const pNode = tNode.parentNode;
  pNode.insertBefore(instance.vm.$el, tNode.nextSibling);
  instance.vm.id = id;
  instance.dom = instance.vm.$el;
  instances.push(instance);
  return instance.vm;
};

export default Tooltip;