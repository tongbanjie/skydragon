<template>
  <form class="tb-form clearfix" :class="classList" :action="action" :method="method">
    <slot></slot>
  </form>
</template>

<script>
  export default {
    name: 'TbForm',

    props: {
      action: String,
      method: String,
      inline: Boolean
    },

    computed: {
      classList () {
        const ret = [];
        if (this.inline) {
          ret.push('tb-form-inline');
        }
        return ret;
      }
    }
  }
</script>