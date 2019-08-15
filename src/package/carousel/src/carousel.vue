<template>
  <div class="tb-carousel">
    <div class="tb-carousel-indicators">
      <ul class="clearfix">
        <li v-for="(one, index) in ciArr" :class="{'active': curNum === index}" @click="toScroll(index)"></li>
      </ul>
    </div>
    <div class="tb-carousel-inner">
      <slot></slot>
    </div>
    <div class="tb-carousel-control tb-carousel-control-left" @click="scrollLeft">
      <tb-icon icon="chevron-left" size="20px"></tb-icon>
    </div>
    <div class="tb-carousel-control tb-carousel-control-right" @click="scrollRight">
      <tb-icon icon="chevron-right" size="20px"></tb-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TbCarousel',

    props: {
      activeNum: {
        type: Number,
        default: 0
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      delay: {
        type: Number,
        default: 4000
      }
    },

    data () {
      return {
        curNum: 0,
        ciLen: 0,
        ciArr: [],
        isInAuto: true,
        timer: null,
        autoTimer: null
      }
    },

    mounted () {
      const self = this;
      self.curNum = self.activeNum ? self.activeNum : self.curNum;
      self.$children.forEach(function(ele, index) {
        if (ele.$options.componentName === 'TbCarouselItem') {
          self.ciArr.push(ele);
        }
      });
      self.ciLen = self.ciArr.length;
      self.ciArr[self.curNum].setActive(true);
      if (self.autoPlay) {
        self.autoPlay();
      }
    },

    methods: {
      scrollRight () {
        this.closeAutoPlay();
        const next = (this.curNum + 1) % this.ciLen;
        this.scroll(this.curNum, next, 'right');
        this.timer = setTimeout(() => {
          this.autoPlay();
        }, 500);
      },

      scrollLeft () {
        this.closeAutoPlay();
        const prev = this.curNum === 0 ? this.ciLen - 1 : this.curNum - 1;
        this.scroll(this.curNum, prev, 'left');
        this.timer = setTimeout(() => {
          this.autoPlay();
        }, 500);
      },

      toScroll (index) {
        if (index > this.curNum) {
          this.scroll(this.curNum, index, 'right');
        } else if (index < this.curNum) {
          this.scroll(this.curNum, index, 'left');
        }
      },

      scroll (fromNum, toNum, direction) {
        this.ciArr[fromNum].setActive(false, direction);
        this.ciArr[toNum].setActive(true, direction);
        this.$emit('changeCarousel', toNum);
        this.$nextTick(() => {
          this.curNum = toNum;
        });
      },

      closeAutoPlay () {
        clearInterval(this.autoTimer);
        clearTimeout(this.timer);
      },

      autoPlay () {
        this.autoTimer = setInterval(() => {
          const next = (this.curNum + 1) % this.ciLen;
          this.scroll(this.curNum, next, 'right');
        }, this.delay);
      }
    }
  }
</script>