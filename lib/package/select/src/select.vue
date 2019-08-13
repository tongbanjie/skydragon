<template>
  <div class="tb-input-select">
    <tb-input :icon="selectIcon" @click="listShow" :disabled="disabled" v-model="model" :readonly="readonly" @icon-click="listShow">
      <template slot="prepend" v-if="$slots.prepend"><slot name="prepend"></slot></template>
      <template slot="append" v-if="$slots.append"><slot name="append"></slot></template>
    </tb-input>
    <transition :name="selectEffect">
      <div class="tb-input-select-list z-depth-1" v-if="selectOp">
        <div class="tb-input-select-filter tb-p-l-5 tb-p-r-5 tb-p-b-5" v-if="filter">
          <tb-input :icon="searchIcon" v-model="filterLabel" @icon-click="filterLabel = ''" @input="backFilter"></tb-input>
        </div>
        <tb-select-option :options="options" @setSelected="setSelected" :selected-value="value" :selected-label="model" :filter-label="filterLabel" :multi="multi"></tb-select-option>
      </div>
    </transition>
  </div>
</template>

<script>
  import Emitter from '../../../mixins/emitter';

  export default {
    name: 'TbSelectInput',

    componentName: 'TbSelectGroup',

    mixins: [Emitter],

    props: {
      options: Array,
      disabled: Boolean,
      readonly: {
        type: Boolean,
        default: true
      },
      value: {},
      placeholder: String,
      filter: {
        type: Boolean,
        default: false
      },
      multi: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        selectOp: false,
        filterLabel: ''
      }
    },

    computed: {
      model: {
        get () {
          const selectedArr = (this.value + '').split(',');
          let newLabel = '';
          for (let i = 0; i < this.options.length; i++) {
            for (let j = 0; j < selectedArr.length; j++) {
              if (this.options[i].value + '' === selectedArr[j]) {
                newLabel += newLabel === '' ? this.options[i].label : ',' + this.options[i].label;
              }
            }
          }
          if (newLabel) {
            return newLabel;
          }
          if (this.readonly) {
            return this.value ? this.value : this.placeholder;
          } else {
            return this.value;
          }
        },

        set (label) {
          if (!this.readonly && !this.multi) {
            this.$emit('input', label);
          }
        }
      },

      selectIcon () {
        if (this.selectOp) {
          return 'chevron-up';
        }
        return 'chevron-down';
      },

      selectEffect () {
        return 'te-select-fade'
      },

      searchIcon () {
        if (this.filterLabel === '') {
          return 'search';
        }
        return 'close';
      }
    },

    methods: {
      backFilter () {
        this.$emit('backFilter', this.filterLabel);
      },
      listShow (ev) {
        if (!this.disabled) {
          if (this.selectOp) {
            this.listHide(ev);
          } else {
            this.selectOp = true;
            if (this.filter) {
              this.$emit('backFilter', this.filterLabel);
            }
          }
        }
      },

      listHide (ev) {
        this.filterLabel = '';
        this.selectOp = false;
      },

      checkIsInSelect (node) {
        if (!node) {
          return false;
        } else if (node.className && node.className.indexOf('tb-input-select') !== -1) {
          return true;
        }
        return this.checkIsInSelect(node.parentNode);
      },

      setSelected () {
        if (!this.multi) {
          this.listHide();
        }
      }
    },

    created () {
      const self = this;
      const bd = document.getElementsByTagName('body')[0];
      self.addEvent('click', bd, function(ev) {
        if (!self.checkIsInSelect(ev.target)) {
          self.listHide();
        }
      });
    }
  }
</script>