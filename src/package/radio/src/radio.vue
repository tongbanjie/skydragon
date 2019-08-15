<template>
  <div class="radio m-b-15" :class="{'radio-inline': inline}">
    <label>
        <input type="radio" 
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
    name: 'TbRadio',

    mixins: [Emitter],

    props: {
      checked: Boolean,
      disabled: Boolean,
      name: String,
      inline: {
        type: Boolean,
        default: false
      },
      value: {},
      label: {}
    },

    data () {
      return {
        selfModel: ''
      }
    },

    computed: {
      model: {
        get () {
          return this.isGroup
            ? this.store : this.value !== undefined
            ? this.value : this.selfModel;
        },

        set (val) {
          if (this.isGroup) {
            this.dispatch('TbRadioGroup', 'input', [val]);
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
          if (parent.$options.componentName === 'TbRadioGroup') {
            this._radioGroup = parent;
            return true;
          }
          parent = parent.$parent;
        }
        return false;
      },

      store () {
        return this._radioGroup ? this._radioGroup.value : this.value;
      }
    },

    methods: {
      addToStore () {
        this.model = this.label;
      },

      handleChange (ev) {
        this.$emit('change', ev);
        if (this.isGroup) {
          this.$nextTick(_ => {
            this.dispatch('TbRadioGroup', 'change', [this._radioGroup.value]);
          });
        }
      }
    },

    created () {
      this.checked && this.addToStore();
    }
  }
</script>