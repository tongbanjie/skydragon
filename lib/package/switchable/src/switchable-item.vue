<template>
    <div :class="[prefixCls]"><slot></slot></div>
</template>

<script>
  const prefixCls = 'tb-switchable-item';
  export default {
    componentName: 'TbSwitchableItem',
    name: 'TbSwitchableItem',
    data () {
      return {
        'prefixCls': prefixCls
      }
    },
    computed: {

    }
  }
</script>