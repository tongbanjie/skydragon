<template>
  <div class="tb-input-number">
    <tb-input v-model="model" :readonly="readonly" type="number">
      <template slot="append">
        <div class="tb-in-up" @click="inUp" :class="{'disabled': checkDisable('max')}">
          <tb-icon icon="chevron-up"></tb-icon>
        </div>
        <div class="tb-in-down" @click="inDown" :class="{'disabled': checkDisable('min')}">
          <tb-icon icon="chevron-down"></tb-icon>
        </div>
      </template>
    </tb-input>
  </div>
</template>

<script>
  import Emitter from '../../../mixins/emitter';

  export default {
    name: 'tb-input-number',

    mixins: [Emitter],

    props: {
      value: {
        type: Number,
        required: true
      },
      min: {
        type: Number
      },
      max: {
        type: Number
      },
      step: {
        type: Number,
        default: 1
      },
      readonly: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      model: {
        get () {
          let val = 0;
          if (this.value !== undefined && !isNaN(this.value)) {
            val = this.value;
          }
          if (this.min !== undefined && !isNaN(this.min) && this.min > val) {
            val = this.min;
            this.$emit('input', val);
          }
          if (this.max !== undefined && !isNaN(this.max) && this.max < val) {
            val = this.max;
            this.$emit('input', val);
          }
          return val;
        },

        set (val) {
          this.$emit('input', val);
        }
      }
    },

    methods: {
      checkDisable (type) {
        if (type === 'max') {
          if (this.max === undefined) {
            return false;
          }
          if (this.addNum(this.model, this.step) > this.max) {
            return true;
          }
        }
        if (type === 'min') {
          if (this.min === undefined) {
            return false;
          }
          if (this.addNum(this.model, -this.step) < this.min) {
            return true;
          }
        }
        return false;
      },

      inUp () {
        if (!this.checkDisable('max')) {
          this.model = this.addNum(this.model, this.step);
        }
      },

      inDown () {
        if (!this.checkDisable('min')) {
          this.model = this.addNum(this.model, -this.step);
        }
      }
    }
  }
</script>