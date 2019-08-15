<template>
  <div class="tb-alert" :class="classList" v-if="curShow">
    <a class="tb-alert-close" v-if="hasClose" @click="closeAlert" href="javascript:void(0)">x</a>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TbAlert',

    props: {
      hasClose: Boolean,
      type: String,
      show: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        selfShow: true
      }
    },

    computed: {
      classList () {
        const list = [];
        if (this.type) {
          list.push('tb-alert-' + this.type);
        }
        if (this.hasClose) {
          list.push('tb-alert-dismissible');
        }
        return list;
      },
      curShow () {
        return this.show;
      }
    },

    methods: {
      closeAlert () {
        this.$emit('close')
      }
    }
  }
</script>