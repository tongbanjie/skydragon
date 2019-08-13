<template>
  <transition name="te-ttshow">
    <div class="tb-tooltip" 
      :class="classList" 
      :style="styleList"
      v-show="show" 
      :id="id" v-html="msg">
    </div>
  </transition>
</template>

<script>
  // type: default, success, warning, danger, info
  // position: top, right, bottom, left
  // this.$tooltip({
  //  ele: '',
  //  type: 'success',
  //  position: 'righttop'
  // });
  
  import Emitter from '../../../mixins/emitter';

  export default {

    mixins: [Emitter],

    data () {
      return {
        ele: null,
        type: 'default',
        position: 'top',
        msg: '',
        show: false,
        styleList: [],
        id: ''
      }
    },

    computed: {
      classList () {
        const s = [];
        s.push('tb-tooltip-' + this.type);
        s.push('tb-tooltip-' + this.position);
        return s;
      }
    },

    methods: {
      handleTooltip (isOpen) {
        const self = this;
        self.show = isOpen;
        if (isOpen) {
          self.$nextTick(() => {
            self.setPosition();
          });
        }
      },

      setPosition () {
        const self = this;
        const ttfEle = document.querySelector(self.ele);
        const ttEle = document.querySelector('#' + self.id);
        if (!ttfEle || !ttEle) {
          return;
        }

        const fLeft = ttfEle.offsetLeft;
        const fTop = ttfEle.offsetTop;
        const fWidth = ttfEle.offsetWidth;
        const fHeight = ttfEle.offsetHeight;
        const width = ttEle.offsetWidth;
        const height = ttEle.offsetHeight;
        const s = {
          left: 0,
          top: 0
        };
        switch (self.position) {
          case 'top':
            s.top = (fTop - height - 5) + 'px';
            s.left = (fLeft - (width / 2 - fWidth / 2)) + 'px';
            break;
          case 'bottom':
            s.top = (fTop + fHeight + 5) + 'px';
            s.left = (fLeft - (width / 2 - fWidth / 2)) + 'px';
            break;
          case 'left':
            s.top = (fTop - (height / 2 - fHeight / 2)) + 'px';
            s.left = (fLeft - width - 6) + 'px';
            break;
          case 'right':
            s.top = (fTop - (height / 2 - fHeight / 2)) + 'px';
            s.left = (fLeft + fWidth + 6) + 'px';
            break;
        }
        this.styleList.push(s);
      },

      listenEle () {
        const self = this;
        const ttEle = document.querySelector(self.ele);

        self.addEvent('mouseenter', ttEle, function(ev) {
          self.handleTooltip(true, ev);
        }, true);

        self.addEvent('mouseout', ttEle, function(ev) {
          self.handleTooltip(false, ev);
        }, true);
      }
    },

    mounted () {
      // this.setPosition();
      if (this.show) {
        this.$nextTick(() => {
          this.setPosition();
        });
      } else {
        this.listenEle();
      }
    }
  }
</script>