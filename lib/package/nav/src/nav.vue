<template>
  <div class="tb-nav" :class="{'tb-nav-fixed': position}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TbNav',

    props: {
      position: {
        type: Boolean,
        default: false
      }
    }
  }
</script>