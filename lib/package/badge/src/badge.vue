<template>
  <sup class="tb-badge" :class="badgeClass" v-if="show">{{count}}</sup>
</template>

<script>
  export default {
    name: 'TbBadge',

    props: {
      show: {
        type: Boolean,
        default: true
      },

      type: {
        type: String,
        default: 'circle'
      },

      count: {
        type: String
      },

      color: {
        type: String,
        default: 'red'
      }
    },

    mounted () {
      this.$el.parentNode.style.position = 'relative';
    },

    computed: {
      badgeClass () {
        const s = [];
        if (this.type === 'circle') {
          s.push('tb-badge-circle');
        } else if (this.type === 'rect') {
          s.push('tb-badge-rect');
        }
        if (this.count === undefined) {
          s.push('tb-badge-blank');
        }
        s.push('tb-bgm-' + this.color);
        return s;
      }
    }
  };
</script>