<template>
  <div
    :class="classList"
    :style="style">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TbCol',

    props: {
      span: Number,
      offset: Number,
      pull: Number,
      push: Number,
      xs: [Number, Object],
      sm: [Number, Object],
      md: [Number, Object],
      lg: [Number, Object]
    },

    data () {
      return {
      }
    },

    created () {
    },

    computed: {
      gutter() {
        return this.$parent.gutter;
      },

      style() {
        var ret = {};

        if (this.gutter) {
          ret.paddingLeft = `${this.gutter / 2}px`;
          ret.paddingRight = ret.paddingLeft;
        }

        return ret;
      },

      classList() {
        const s = [];
        ['span', 'offset', 'pull', 'push'].forEach(prop => {
          if (this[prop]) {
            s.push(
              prop !== 'span'
                ? `tb-col-${prop}-${this[prop]}`
                : `tb-col-${this[prop]}`
            );
          }
        });

        ['xs', 'sm', 'md', 'lg'].forEach(size => {
          if (typeof this[size] === 'number') {
            s.push(`tb-col-${size}-${this[size]}`);
          } else if (typeof this[size] === 'object') {
            const props = this[size];
            Object.keys(props).forEach(prop => {
              s.push(
                prop !== 'span'
                  ? `tb-col-${size}-${prop}-${props[prop]}`
                  : `tb-col-${size}-${props[prop]}`
              );
            });
          }
        });
        return s;
      }
    }
  }
</script>