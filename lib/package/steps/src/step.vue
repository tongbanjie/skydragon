<template>
  <div :class="['tb-step', `tb-step-${$parent.direction}`, `tb-step-${status}`]">
    <div class="tb-step-icon">
      <tb-icon v-if="icon" :icon="icon" size="24px" class="tb-step-icon-import"/>
      <div v-else class="tb-step-icon-orgin" >
        <tb-icon v-if="status === 'finish'" icon="check" size="16px"></tb-icon>
        <span v-else>{{index + 1}}</span>
      </div>
    </div>
    <div class="tb-step-info">
      <div class="tb-step-title">{{title}}</div>
      {{desc}}
    </div>
    <div class="tb-step-line"></div>
  </div>
</template>
<script>
  export default {
    name: 'tbStep',
    props: {
      title: String,
      desc: String,
      icon: String
    },
    data() {
      return {
        index: -1
      }
    },
    computed: {
      status() {
        const index = this.index;
        const current = this.$parent.current;
        if (index === -1 || index > current) return 'wait';
        if (index === current) return 'process';
        if (index < current) return 'finish';
        return 'wait'
      }
    },
    created() {
      const steps = this.$parent.steps;
      this.index = steps.length;
      steps.push(this)
    },
    beforeDestroy() {
      const steps = this.$parent.steps;
      const index = steps.indexOf(this);
      if (index > -1) {
        steps.splice(index, 1)
      }
    }
  }
</script>