<template>
  <div :class="[prefixCls]" :style="styles" @mouseover="stopChange" @mouseout="startChange">
    <div :class="[prefixCls + '-list']">
      <div :class="[prefixCls + '-track']" :style="trackStyles">
        <slot></slot>
      </div>
    </div>
    <button :class="[prefixCls+'-prev']" @click="prevHandler" v-show="arrow"><i class="tb-switchable-icon tb-icon tb-icon-chevron-left"></i></button>
    <button :class="[prefixCls+'-next']" @click="nextHandler" v-show="arrow"><i class="tb-switchable-icon tb-icon tb-icon-chevron-right"></i></button>
    <ul :class="[prefixCls+'-nav']">
      <li 
        v-for="(item, index) in slides" :class="[index === currentIndex ? 'active' : '']"
        @click="dotsEvent('click', index)"
        @mouseover="dotsEvent('mouseover', index)">
        {{ index+1 }}
      </li>
    </ul>
  </div>
</template>


<script>
  import Emitter from '../../../mixins/emitter';
  const prefixCls = 'tb-switchable';

  export default {
    name: 'TbSwitchable',
    componentName: 'TbSwitchable',
    mixins: [Emitter],
    props: {
      // 最外层容器的宽度
      width: {
        type: Number
      },
      // 最外层容器的高度
      height: {
        type: Number
      },
      // 触发类型
      triggertype: {
        type: String,
        default: 'click' // 可选 mouseover 或 click
      },
      autoplay: {
        type: Boolean,
        default: false
      },
      // 自动切换的时间间隔
      autospeed: {
        type: Number,
        default: 3000
      },
      // 切换速度
      speed: {
        type: Number,
        default: 800
      },
      easing: {
        type: String,
        default: 'ease'
      },
      // 切换到第几项，默认为第一项
      switchtoindex: {
        type: [Number, String],
        default: 0
      },
      // 鼠标移动到容器内是否停止滚动， 默认停止
      pausehover: {
        type: Boolean,
        default: true
      },
      // 是否显示箭头, 默认不显示
      arrow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        slides: [],
        styles: {},
        timer: null,
        // 保存当前的值， 默认为0
        currentIndex: 0,
        trackWidth: 0,
        trackOffset: 0
      }
    },
    computed: {
      trackStyles () {
        return {
          width: `${this.trackWidth}px`,
          transform: `translate3d(-${this.trackOffset}px, 0px, 0px)`,
          transition: `transform ${this.speed}ms ${this.easing}`
        };
      }
    },
    mounted () {
      // 初始化 获取子元素的长度
      this.childsLen();
      this.styles = {
        'width': this.width + 'px',
        'height': this.height + 'px'
      };
      this.trackWidth = this.width * (this.slides.length || 0);

      // 初始化 切换到第几项
      this.switchTo();

      if (this.autoplay) {
        this.setAutoplay();
      }
    },
    methods: {
      childsLen () {
        // 创建完成后，获取元素
        this.$children.forEach((item, index) => {
          this.slides.push(item);
        })
      },
      dotsEvent (type, index) {
        if (type === this.triggertype) {
          this.currentIndex = index;
          // 切换到第几项
          this.gotoItem(index);
          this.$emit('input', index);
          this.$emit('change', index);
        }
      },
      off () {
        if (this.timer) {
          window.clearInterval(this.timer);
          this.timer = null;
        }
      },
      gotoItem(index) {
        this.off();
        this.$nextTick(() => {
          this.trackOffset = index * this.width;
          this.setAutoplay();
        });
      },
      setAutoplay () {
        this.off();
        // 如果为true 自动轮播
        if (this.autoplay) {
          this.timer = window.setInterval(() => {
            this.start(1);
          }, this.autospeed);
        }
      },
      // 开始轮播
      start (offset) {
        let index = this.currentIndex;
        index = index + offset;
        while (index < 0) {
          index += this.slides.length;
        }
        index = index % this.slides.length;
        this.currentIndex = index;

        this.$nextTick(() => {
          this.trackOffset = index * this.width;
        });
        this.$emit('input', index);
        this.$emit('change', index);
      },
      // 移动到轮播上去 是否停止播放 默认为true
      stopChange () {
        if (this.pausehover) {
          this.off();
        }
      },
      // 移开时 开始播放
      startChange () {
        this.setAutoplay();
      },
      // 初始化切换到第几项
      switchTo () {
        this.currentIndex = this.switchtoindex;
        this.gotoItem(this.currentIndex);
      },
      prevHandler () {
        this.start(-1);
      },
      nextHandler () {
        this.start(1);
      }
    }
  }
</script>