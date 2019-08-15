<template>
  <button 
  :type="nativeType ? nativeType : 'button'"
  :class="classList" 
  :disabled="disabled" 
  @click="handleClick">
    <i :class="fullIcon" v-if="icon"></i>
    <slot></slot>
  </button>
</template>

<script>
  // size: [xs, sm, lg]
  const sizeList = ['xs', 'sm', 'lg'];
  const typeList = ['default', 'primary', 'success', 'warning', 'error', 'info', 'danger', 'link'];

  export default {
    name: 'TbBtn',

    props: {
      type: String,
      icon: String,
      size: String,
      nativeType: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    created () {
      if (typeList.indexOf(this.type) !== -1) {
        this.classList.push('tb-btn-' + this.type);
      }

      if (sizeList.indexOf(this.size) !== -1) {
        this.classList.push('tb-btn-' + this.size);
      }

      if (this.icon && this.$slots.default) {
        this.classList.push('tb-btn-icon-text');
      }
    },

    data () {
      return {
        classList: ['tb-btn']
      }
    },

    computed: {
      fullIcon() {
        return 'tb-icon tb-icon-' + this.icon
      }
    },

    methods: {
      handleClick (ev) {
        this.$emit('click', ev);
      }
    }
  }
</script>