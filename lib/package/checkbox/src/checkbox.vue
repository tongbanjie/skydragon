<template>
  <div class="checkbox" :class="{'checkbox-inline': inline}">
    <label>
      <input type="checkbox" 
      v-if="trueLabel || falseLabel" 
      v-model="model" 
      :disabled="disabled" 
      :name="name"
      :true-value="trueLabel" 
      :false-value="falseLabel" 
      @change="handleChange">
      <input type="checkbox" 
      v-else 
      v-model="model" 
      :disabled="disabled" 
      :name="name"
      :value="label" 
      @change="handleChange">
      <i class="input-helper"></i>
      <span v-if="$slots.default || label">
        <slot></slot>
        <template v-if="!$slots.default">{{label}}</template>
      </span>
    </label>
  </div>
</template>

<script>
  import Emitter from '../../../mixins/emitter';

  export default {
    name: 'TbCheckbox',

    mixins: [Emitter],

    props: {
      checked: Boolean,
      disabled: Boolean,
      name: String,
      value: {},
      inline: {
        type: Boolean,
        default: false
      },
      label: {},
      trueLabel: [String, Number],
      falseLabel: [String, Number]
    },

    data () {
      return {
        selfModel: false,
        selfLabel: this.label
      }
    },

    computed: {
      model: {
        get() {
          return this.isGroup
            ? this.store : this.value !== undefined
            ? this.value : this.selfModel;
        },

        set (val) {
          if (this.isGroup) {
            this.dispatch('TbCheckboxGroup', 'input', [val]);
          } else if (this.value !== undefined) {
            this.$emit('input', val);
          } else {
            this.selfModel = val;
          }
        }
      },

      isGroup () {
        let parent = this.$parent;

        while (parent) {
          if (parent.$options.componentName === 'TbCheckboxGroup') {
            this._checkboxGroup = parent;
            return true;
          }
          parent = parent.$parent;
        }
        return false;
      },

      store () {
        return this._checkboxGroup ? this._checkboxGroup.value : this.value;
      },

      isChecked () {
        if ({}.toString.call(this.model) === '[object Boolean]') {
          return this.model;
        } else if (Array.isArray(this.model)) {
          return this.model.indexOf(this.label) > -1;
        } else if (this.model !== null && this.model !== undefined) {
          return this.model === this.trueLabel;
        }
        return false;
      }
    },

    methods: {
      addToStore () {
        if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
          this.model.push(this.label);
        } else {
          this.model = this.trueLabel || true;
        }
      },

      handleChange (ev) {
        this.$emit('change', ev);
        this.labelSet();
        if (this.isGroup) {
          this.$nextTick(_ => {
            this.dispatch('TbCheckboxGroup', 'change', [this._checkboxGroup.value]);
          });
        }
      },

      labelSet () {
        if (this.isChecked) {
          this.label = this.trueLabel ? this.trueLabel : this.selfLabel;
        } else {
          this.label = this.falseLabel ? this.falseLabel : this.selfLabel;
        }
      }
    },

    created () {
      this.checked && this.addToStore();
      this.labelSet();
    }
  }
</script>