import Vue from 'vue';

const DialogConstructor = Vue.extend(require('./dialog.vue'));

let instance;
const instances = [];
let seed = 1;

const Dialog = function(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      title: options
    };
  }
  const userOnClose = options.onCancel;
  const userOnConfirm = options.onConfirm;
  const id = 'dialog_' + seed++;

  options.onCancel = function() {
    Dialog.cancel(id, userOnClose);
  };
  options.onConfirm = function() {
    Dialog.confirm(id, userOnConfirm)
  }

  instance = new DialogConstructor({
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

Dialog.cancel = function(id, userOnClose) {
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

Dialog.confirm = function(id, userOnConfirm) {
  for (let i = 0; i < instances.length; i++) {
    if (id === instances[i].id) {
      if (typeof userOnConfirm === 'function') {
        userOnConfirm(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
}

export default Dialog;