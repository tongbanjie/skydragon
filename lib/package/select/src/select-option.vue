<template>
  <ul>
    <li v-for="(option, index) in options"
      :class="{'disabled': option.disabled, 'active': isChecked(option.value)}" 
      :value="option.value" 
      @click="setSelected(option.value, option.disabled)" v-if="checkFilter(option.label)">{{option.label}}<tb-icon icon="check" class="tb-input-select-icon" size="16px" v-if="isChecked(option.value)"></tb-icon></li>
  </ul>
</template>

<script>
  import Emitter from '../../../mixins/emitter';

  export default {
    name: 'TbSelectOption',

    mixins: [Emitter],

    data () {
      return {

      }
    },

    props: {
      options: Array,
      selectedValue: {},
      selectedLabel: String,
      filterLabel: String,
      multi: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      isChecked (value) {
        const str = this.selectedValue + '';
        const selectedArr = str.split(',');
        for (let i = 0; i < selectedArr.length; i++) {
          if (selectedArr[i] === value + '') {
            return true;
          }
        }
        return false;
      },

      handleSelected (value, str) {
        str = str + '';
        const selectedArr = str === '' ? [] : str.split(',');
        let newValue = '';
        let isHas = false;
        for (let i = 0; i < selectedArr.length; i++) {
          if (selectedArr[i] === value + '') {
            selectedArr.splice(i, 1);
            isHas = true;
            break;
          }
        }
        if (!isHas) {
          selectedArr.push(value + '');
        }
        for (let j = 0; j < selectedArr.length; j++) {
          newValue += (j === 0 ? selectedArr[j] : ',' + selectedArr[j]);
        }
        return newValue;
      },
      setSelected (value, disabled) {
        if (disabled) {
          return;
        }
        let tValue = value;
        if (this.multi) {
          tValue = this.handleSelected(value, this.selectedValue);
        }

        this.dispatch('TbSelectGroup', 'input', [tValue]);
        this.$parent.setSelected();
      },

      checkFilter (label) {
        if (label.indexOf(this.filterLabel) !== -1) {
          return true;
        }
        return false;
      }
    }
  }
</script>