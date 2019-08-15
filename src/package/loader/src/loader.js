import Vue from 'vue';
import getStyle from './util.js';

const LoaderConstructor = Vue.extend(require('./loader.vue'));

const LoaderDirective = {};

LoaderDirective.install = Vue => {
  if (Vue.prototype.$isServer) return;

  const toggleLoader = (el, binding) => {
    const $target = el.fullscreen ? document.body : el;
    const originPosition = getStyle($target, 'position');
    if (binding.value) {
      if (originPosition !== 'absolute' && originPosition !== 'fixed') {
        $target.classList.add('tb-loader-relative');
      }
      $target.classList.add('tb-loader-hidden');
      el.loader.scrollTop = $target.scrollTop;
      el.loadmount = el.loader.$mount().$el;
      $target.appendChild(el.loadmount);
      el.inserted = true
    } else {
      if (el.inserted) {
        $target.classList.remove('tb-loader-hidden', 'tb-loader-relative');
        $target.removeChild(el.loadmount);
        el.inserted = false;
      }
    }
  }

  Vue.directive('loader', {
    bind(el, binding, vnode) {
      const type = el.getAttribute('tb-loader-type');
      const size = el.getAttribute('tb-loader-size');
      const text = el.getAttribute('tb-loader-text');
      const color = el.getAttribute('tb-loader-color');
      const bgc = el.getAttribute('tb-loader-bgc')
      const instance = new LoaderConstructor({
        data: { size, type, text, color, bgc, scrollTop: 0 }
      });
      el.fullscreen = !!binding.modifiers.fullscreen;
      el.loader = instance;
      binding.value && toggleLoader(el, binding)
    },
    update(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoader(el, binding);
      }
    },
    unbind(el, binding) {
      if (el.inserted) {
        toggleLoader(el, { value: false })
      }
    }
  })
}

export default LoaderDirective;

