'use strict';

exports.__esModule = true;
exports.default = {
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    message: function message(type, msg) {
      switch (type) {
        case 'info':
          console.info(msg);
          break;
        case 'log':
          console.log(msg);
          break;
        case 'error':
          console.error(msg);
          break;
        case 'warn':
          console.warn(msg);
          break;
        default:
          console.log(msg);
          break;
      }
      return true;
    },
    addEvent: function addEvent(type, ele, fn, isCapture) {
      if (ele.attachEvent) {
        ele.attachEvent('on' + type, fn);
      } else if (ele.addEventListener) {
        ele.addEventListener(type, fn, !!isCapture);
      }
    },
    removeEvent: function removeEvent(type, ele, fn, isCapture) {
      if (ele.detachEvent) {
        ele.detachEvent('on' + type, fn);
      } else if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, !!isCapture);
      }
    },
    getDecimalNum: function getDecimalNum(num) {
      var dn = void 0;
      try {
        dn = num.toString().split('.')[1].length;
      } catch (e) {
        dn = 0;
      }
      return dn;
    },
    divNum: function divNum(num1, num2) {
      var sq1 = void 0,
          sq2 = void 0,
          m = void 0;
      sq1 = this.getDecimalNum(num1);
      sq2 = this.getDecimalNum(num2);
      m = Math.pow(10, Math.max(sq1, sq2));
      return this.mulNum(num1, m) / this.mulNum(num2, m);
    },
    mulNum: function mulNum(num1, num2) {
      var sq1 = void 0,
          sq2 = void 0,
          m = void 0;
      sq1 = this.getDecimalNum(num1);
      sq2 = this.getDecimalNum(num2);
      m = sq1 + sq2;
      return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, m);
    },
    addNum: function addNum(num1, num2) {
      var sq1 = void 0,
          sq2 = void 0;
      try {
        sq1 = num1.toString().split('.')[1].length;
      } catch (e) {
        sq1 = 0;
      }
      try {
        sq2 = num2.toString().split('.')[1].length;
      } catch (e) {
        sq2 = 0;
      }
      var m = Math.pow(10, Math.max(sq1, sq2));
      return (this.mulNum(num1, m) + this.mulNum(num2, m)) / m;
    }
  }
};