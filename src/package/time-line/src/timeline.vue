
<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>

<script>
  const prefixCls = 'tb-timeline';
  export default {
    name: 'TbTimeline',
    props: {
      pending: {
        type: Boolean,
        defalut: false
      }
    },
    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-pending`]: this.pending
          }
        ];
      }
    }
  }
</script>