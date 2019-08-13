<template>
  <div :class="['tb-steps', `tb-steps-${direction}`, {'tb-steps-center': alignCenter}]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'tbSteps',
    props: {
      current: {
        type: Number,
        required: true
      },
      direction: {
        type: String,
        default: 'horizontal',
        validator(val) {
          return ['vertical', 'horizontal'].includes(val)
        }
      },
      alignCenter: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        steps: [] // children [vm, vm]
      }
    }
  }
</script>