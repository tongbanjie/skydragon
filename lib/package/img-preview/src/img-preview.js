'use strict';

exports.__esModule = true;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImgPreviewConstructor = _vue2.default.extend(require('./img-preview.vue'));

var instance = void 0;
var instances = [];
var seed = 1;

var ImgPreview = function ImgPreview(options) {
  options = options || {};

  if (Object.prototype.toString.call(options) === '[object String]') {
    options = {
      url: [options]
    };
  } else if (Object.prototype.toString.call(options) === '[object Object]') {
    if (options.url === undefined) {
      options.onMsg('请填写url');
      return;
    }
    if (Object.prototype.toString.call(options.url) === '[object String]') {
      options.url = [options.url];
    } else if (Object.prototype.toString.call(options.url) !== '[object Array]') {
      options.onMsg('url格式支持字符串和数组');
      return;
    }
  }

  var userOnClose = options.onClose;
  var id = 'imgPreview_' + seed++;

  options.onClose = function () {
    ImgPreview.close(id, userOnClose);
  };

  instance = new ImgPreviewConstructor({
    data: options
  });
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.show = true;
  instance.dom = instance.vm.$el;
  instances.push(instance);
  options.onOpen();
  return instance.vm;
};

ImgPreview.close = function (id, userOnClose) {
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

exports.default = ImgPreview;