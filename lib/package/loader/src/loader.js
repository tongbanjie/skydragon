'use strict';

exports.__esModule = true;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoaderConstructor = _vue2.default.extend(require('./loader.vue'));

var LoaderDirective = {};

LoaderDirective.install = function (Vue) {
  if (Vue.prototype.$isServer) return;

  var toggleLoader = function toggleLoader(el, binding) {
    var $target = el.fullscreen ? document.body : el;
    var originPosition = (0, _util2.default)($target, 'position');
    if (binding.value) {
      if (originPosition !== 'absolute' && originPosition !== 'fixed') {
        $target.classList.add('tb-loader-relative');
      }
      $target.classList.add('tb-loader-hidden');
      el.loader.scrollTop = $target.scrollTop;
      el.loadmount = el.loader.$mount().$el;
      $target.appendChild(el.loadmount);
      el.inserted = true;
    } else {
      if (el.inserted) {
        $target.classList.remove('tb-loader-hidden', 'tb-loader-relative');
        $target.removeChild(el.loadmount);
        el.inserted = false;
      }
    }
  };

  Vue.directive('loader', {
    bind: function bind(el, binding, vnode) {
      var type = el.getAttribute('tb-loader-type');
      var size = el.getAttribute('tb-loader-size');
      var text = el.getAttribute('tb-loader-text');
      var color = el.getAttribute('tb-loader-color');
      var bgc = el.getAttribute('tb-loader-bgc');
      var instance = new LoaderConstructor({
        data: { size: size, type: type, text: text, color: color, bgc: bgc, scrollTop: 0 }
      });
      el.fullscreen = !!binding.modifiers.fullscreen;
      el.loader = instance;
      binding.value && toggleLoader(el, binding);
    },
    update: function update(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoader(el, binding);
      }
    },
    unbind: function unbind(el, binding) {
      if (el.inserted) {
        toggleLoader(el, { value: false });
      }
    }
  });
};

exports.default = LoaderDirective;