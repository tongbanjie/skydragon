<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TbTableCol',

  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    },
    width: {
      type: Number,
      default: 0
    },
    realWidth: {
      type: Number,
      default: 0
    },
    fixed: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'left'
    }
  },

  data () {
    return {
    }
  }
}
</script>