<template>
  <i :class="fullIcon" @click="handleClick" :style="style"><slot></slot></i>
</template>
<script>
  export default {
    name: 'TbIcon',

    props: {
      icon: String,
      color: String,
      size: {
        type: String,
        default: '12px'
      }
    },

    computed: {
      fullIcon() {
        return 'tb-icon tb-icon-' + this.icon
      },
      style() {
        const temp = {};
        if (this.color) {
          temp.color = this.color;
        }
        if (this.size) {
          temp.fontSize = this.size;
        }
        return temp;
      }
    },

    methods: {
      handleClick (ev) {
        this.$emit('click', ev);
      }
    }
  }
</script>