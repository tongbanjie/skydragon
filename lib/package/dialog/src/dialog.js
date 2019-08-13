'use strict';

exports.__esModule = true;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogConstructor = _vue2.default.extend(require('./dialog.vue'));

var instance = void 0;
var instances = [];
var seed = 1;

var Dialog = function Dialog(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      title: options
    };
  }
  var userOnClose = options.onCancel;
  var userOnConfirm = options.onConfirm;
  var id = 'dialog_' + seed++;

  options.onCancel = function () {
    Dialog.cancel(id, userOnClose);
  };
  options.onConfirm = function () {
    Dialog.confirm(id, userOnConfirm);
  };

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

Dialog.cancel = function (id, userOnClose) {
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

Dialog.confirm = function (id, userOnConfirm) {
  for (var i = 0; i < instances.length; i++) {
    if (id === instances[i].id) {
      if (typeof userOnConfirm === 'function') {
        userOnConfirm(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
};

exports.default = Dialog;