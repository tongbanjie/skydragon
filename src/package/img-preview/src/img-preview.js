import Vue from 'vue';

const ImgPreviewConstructor = Vue.extend(require('./img-preview.vue'));

let instance;
const instances = [];
let seed = 1;

const ImgPreview = (options) => {
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

  const userOnClose = options.onClose;
  const id = 'imgPreview_' + seed++;

  options.onClose = () => {
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

ImgPreview.close = (id, userOnClose) => {
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

export default ImgPreview;