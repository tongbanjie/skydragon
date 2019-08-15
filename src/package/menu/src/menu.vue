<template>
  <ul class="tb-menu" :class="{'tb-menu-active': tbShow}">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'TbMenu',

    componentName: 'TbMenu',

    data () {
      return {
        tbShow: true
      }
    },

    methods: {
      handleItemClick () {
        this.tbShow = !this.tbShow;
      }
    },

    created () {
      this.$on('item-click', this.handleItemClick);
    }
  }
</script>