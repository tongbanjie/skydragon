<template>
  <div>
    <pre v-if="preCode"><code><slot v-pre></slot></code></pre>
    <code v-else><slot v-pre></slot></code>
  </div>
</template>

<script>
  export default {
    name: 'TbCode',

    props: {
      preCode: {
        type: Boolean,
        default: true
      }
    },

    created () {
      // console.log(this.$slots.default);
    }
  }
</script>