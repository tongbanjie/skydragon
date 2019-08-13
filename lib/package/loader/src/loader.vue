<template>
  <div
    :class="['tb-loader-directive', sizeClass]"
    :style="{'background-color': validBgc}"
  >
    <div :class="loaderSpanClass">
      <span
        v-for="n in 8"
        class="tb-loader-span"
        :style="{'background-color': validColor}"
      ></span>
      <div
        class="tb-loader-text"
        v-if="text"
        :style="{'color': validColor}"
      >{{text}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        size: 'default',
        type: 'dot',
        text: '',
        color: '#0c7cd5',
        bgc: 'rgba(255,255,255,.7)',
        scrollTop: 0
      }
    },
    computed: {
      validColor() {
        return this.color || '#0c7cd5'
      },
      validBgc() {
        return this.bgc || 'rgba(255,255,255,.7)'
      },
      validSize() {
        return ['small', 'default', 'large'].includes(this.size) ? this.size : 'default';
      },
      validType() {
        return ['dot', 'flower'].includes(this.type) ? this.type : 'dot';
      },
      sizeClass () {
        return 'tb-loader-' + this.validSize;
      },
      loaderSpanClass () {
        return [
          'tb-loader-' + this.validType,
          'tb-loader-' + this.validType + '-' + this.validSize
        ];
      }
    },
    mounted() {
      this.$el.style.top = this.scrollTop + 'px'
    }

  }
</script>