
<template>
  <li :class="[prefixCls + '-item']">
    <div :class="[prefixCls + '-item-tb']"></div>
    <div :class="headClasses" :style="customColor" ref="dot"><slot name="dot"></slot></div>
    <div :class="[prefixCls + '-item-content']">
      <slot></slot>
    </div>
  </li>
</template>

<script>
  const prefixCls = 'tb-timeline';
  export default {
    name: 'TbTimelineItem',
    props: {
      color: {
        type: String,
        default: 'blue'
      }
    },
    data () {
      return {
        dot: false,
        prefixCls: prefixCls,
      }
    },
    mounted () {
      this.dot = this.$refs.dot.innerHTML.length ? true : false;
    },
    computed: {
      headClasses () {
        return [
          `${prefixCls}-item-head`,
          {
            [`${prefixCls}-item-head-custom`]: this.dot,
            [`${prefixCls}-item-head-${this.color}`]: this.headColorShow
          }
        ];
      },
      headColorShow () {
        return this.color === 'blue' || this.color === 'red' || this.color === 'green';
      },
      customColor () {
        let style = {};
        if (this.color) {
          if(!this.headColorShow) {
            style = {
              'color': this.color,
              'border-color': this.color
            }
          }
        }
        return style;
      },
    }
  }
</script>