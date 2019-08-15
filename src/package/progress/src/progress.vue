<template>
  <div class="tb-progress" :class="progressClassList" :style="progressStyle">
    <div class="tb-progress-bar" role="progressbar"
      :class="classList" 
      :style="style">
      <span class="tb-progress-num" v-if="showPercent">{{curPercent}}%</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TbProgress',
    
    props: {
      percent: {
        type: Number,
        default: 0
      },
      type: {
        type: String,
        default: 'primary'
      },
      rectHeight: {
        type: String,
        default: 5
      },
      showPercent: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      active: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      curPercent () {
        if (this.percent < 0) {
          return 0;
        }
        if (this.percent > 100) {
          return 100;
        }
        return this.percent;
      },
      style () {
        const s = [];
        s.push({
          width: this.curPercent + '%'
        });
        return s;
      },
      progressClassList () {
        const p = [];
        if (this.striped) {
          p.push('tb-progress-striped');
        }
        if (this.active) {
          p.push('tb-progress-active');
        }
        return p;
      },
      classList () {
        const c = [];
        if (this.type) {
          c.push('tb-progress-bar-' + this.type);
        }
        return c;
      },
      progressStyle () {
        const s = [];
        s.push({
          'height': this.rectHeight + 'px',
          'border-radius': this.rectHeight + 'px',
          'line-height': this.rectHeight + 'px'
        });
        return s;
      }
    }
  }
</script>