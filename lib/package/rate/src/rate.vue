<template>
  <div class="tb-rate-div">
    <div class="tb-rate-stars clearfix">
      <span class="tb-p-r-10" style="display: inline-block" v-for="num in starNum"
        @mouseover="setRate(num, false)"
        @mouseout="backRate()"
        @click="setRate(num, true)">
        <tb-icon :icon="icon" class="tb-rate-parent" :size="size">
          <tb-icon :icon="icon" class="tb-rate-child" :size="size" :style="{'width': computeWith(num)}"></tb-icon>
        </tb-icon>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TbRate',

    props: {
      starNum: {
        type: Number,
        default: 5
      },
      value: {},
      disabled: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: 'star'
      },
      size: {
        type: String,
        default: '22px'
      }
    },

    data () {
      return {
        starStyles: [],
        originRate: 0
      }
    },

    computed: {
      model: {
        get () {
          return this.value ? parseFloat(this.value) : 0;
        },

        set (label) {
          this.$emit('input', label);
        }
      },
      starClass () {
        return 'tb-icon-' + this.icon;
      }
    },

    methods: {
      computeWith (num) {
        if (num > Math.ceil(this.model)) {
          return 0
        }
        if (this.model <= num && this.model > num - 1) {
          return parseInt((this.model - num + 1) * 100) + '%';
        }
        return '100%'
      },

      setRate (num, type) {
        if (!this.disabled) {
          this.model = num;
          if (type) {
            this.originRate = num;
            this.$emit('setRate', num);
          }
        }
      },

      backRate () {
        this.model = this.originRate;
      }
    },

    created () {
      this.originRate = this.value ? parseFloat(this.value) : 0;
    }
  }
</script>