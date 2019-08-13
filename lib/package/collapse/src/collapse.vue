<template>
  <transition 
    @before-enter="beforeEnter" 
    @enter="enter" 
    @after-enter="afterEnter" 
    @before-leave="beforeLeave" 
    @leave="leave" 
    @after-leave="afterLeave" 
    :css="false">
    <div class="tb-collapse" v-show="show">
      <slot name="collapse"></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'TbCollapse',

    props: {
      show: {
        type: Boolean,
        default: true
      },

      type: {
        type: String,
        default: 'slide'
      }
    },

    data () {
      return {
        timer: null,
        oldParam: {
          paddingTop: 0,
          paddingBottom: 0,
          overflow: 'hidden'
        }
      }
    },

    methods: {
      beforeEnter (el) {
        clearTimeout(this.timer);
        el.style.height = 0;
        this.oldParam = {
          paddingTop: el.style.paddingTop,
          paddingBottom: el.style.paddingBottom,
          overflow: ''
        };
      },
      enter (el, done) {
        this.oldParam.overflow = el.style.overflow;
        el.style.paddingTop = this.oldParam.paddingTop;
        el.style.paddingBottom = this.oldParam.paddingBottom;
        if (el.scrollHeight !== 0) {
          const delay = (el.scrollHeight / 200) * 0.5;
          el.style.transition = 'height ' + delay + 's';
          el.style.height = el.scrollHeight + 'px';
          this.timer = setTimeout(() => {
            done();
          }, delay * 1000);
        } else {
          el.style.height = '';
          done();
        }
        el.style.overflow = 'hidden';
      },
      afterEnter (el) {
        el.style.transition = '';
        el.style.height = '';
        el.style.overflow = this.oldParam.overflow;
      },
      beforeLeave (el) {
        clearTimeout(this.timer);
        this.oldParam = {
          paddingTop: el.style.paddingTop,
          paddingBottom: el.style.paddingBottom,
          overflow: el.style.overflow
        };
        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
      },
      leave (el, done) {
        if (el.scrollHeight !== 0) {
          const delay = (el.scrollHeight / 200) * 0.5;
          el.style.transition = 'height ' + delay + 's';
          el.style.height = '0';
          this.timer = setTimeout(() => {
            done();
          }, delay * 1000);
        } else {
          done();
        }
      },
      afterLeave (el) {
        el.style.transition = '';
        el.style.overflow = this.oldParam.overflow;
        el.style.paddingTop = this.oldParam.paddingTop;
        el.style.paddingBottom = this.oldParam.paddingBottom;
        el.style.height = '';
      }
    }
  }
</script>