
<template>
  <div :class="classes" :style="styles" @click="back">
    <slot>
      <div :class="[prefixCls + '-inner']"><i class="tb-icon tb-icon-chevron-up"></i></div>
    </slot>
  </div>
</template>

<script>
  function scrollTop(el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 1000 / 60);
        }
      );
    }
    const diff = Math.abs(from - to);
    const step = Math.ceil(diff / duration * 50);
    var scroll = function(start, end, step) {
      if (start === end) {
        return;
      }
      let d = (start + step > end) ? end : (start + step);
      if (start > end) {
        d = (start - step < end) ? end : (start - step);
      }
      if (el === window) {
        window.scrollTo(d, d);
      } else {
        el.scrollTop = d;
      }
      window.requestAnimationFrame(() => scroll(d, end, step));
    };
    scroll(from, to, step);
  }
  const prefixCls = 'tb-back-top';

  export default {
    name: 'TbBacktop',
    componentName: 'TbBacktop',
    props: {
      // 页面滚动高度达到该值时才显示 BackTop组件 默认为300px
      height: {
        type: [Number, String],
        default: 300
      },
      // 组件距离底部的距离 默认为30px
      bottom: {
        type: [Number, String],
        default: 30
      },
      // 组件距离右边的距离 默认为30px
      right: {
        type: [Number, String],
        default: 30
      },
      // 滚动动画持续时间 (毫秒) 默认为1秒
      duration: {
        type: [Number, String],
        default: 1000
      }
    },
    data () {
      return {
        backTop: false,
        prefixCls: prefixCls
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handler, false);
      window.addEventListener('resize', this.handler, false);
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-show`]: this.backTop
          }
        ];
      },
      styles () {
        return {
          bottom: `${this.bottom}px`,
          right: `${this.right}px`
        };
      }
    },
    methods: {
      handler () {
        this.backTop = window.pageYOffset >= this.height;
      },
      back () {
        scrollTop(window, document.body.scrollTop, 0, this.duration);
        this.$emit('change');
      }
    }
  }
</script>