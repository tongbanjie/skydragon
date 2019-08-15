export default {
  methods: {
    dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;
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
    message (type, msg) {
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
    addEvent (type, ele, fn, isCapture) {
      if (ele.attachEvent) {
        ele.attachEvent('on' + type, fn);
      } else if (ele.addEventListener) {
        ele.addEventListener(type, fn, !!isCapture);
      }
    },
    removeEvent (type, ele, fn, isCapture) {
      if (ele.detachEvent) {
        ele.detachEvent('on' + type, fn);
      } else if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, !!isCapture);
      }
    },
    getDecimalNum (num) {
      let dn;
      try {
        dn = num.toString().split('.')[1].length;
      } catch (e) {
        dn = 0;
      }
      return dn;
    },
    divNum (num1, num2) {
      let sq1, sq2, m;
      sq1 = this.getDecimalNum(num1);
      sq2 = this.getDecimalNum(num2);
      m = Math.pow(10, Math.max(sq1, sq2));
      return this.mulNum(num1, m) / this.mulNum(num2, m);
    },
    mulNum (num1, num2) {
      let sq1, sq2, m;
      sq1 = this.getDecimalNum(num1);
      sq2 = this.getDecimalNum(num2);
      m = sq1 + sq2;
      return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, m);
    },
    addNum (num1, num2) {
      let sq1, sq2;
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
      const m = Math.pow(10, Math.max(sq1, sq2));
      return (this.mulNum(num1, m) + this.mulNum(num2, m)) / m;
    }
  }
}