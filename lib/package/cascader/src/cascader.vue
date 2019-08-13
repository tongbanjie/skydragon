<template>
  <div class="tb-cascader">
    <div
      class="tb-cascader-input"
      @mouseenter="setHover(true)"
      @mouseleave="setHover(false)"
    >
      <tb-input
        v-model="checkedLabel"
        @click="toggleOptions"
        @icon-click="iconClick"
        :icon="inputIcon"
        :readonly="true"
        :placeholder="placeholder"
        :disabled="disabled"
      >
        <template slot="prepend" v-if="$slots.prepend"><slot name="prepend"></slot></template>
        <template slot="append" v-if="$slots.append"><slot name="append"></slot></template>
      </tb-input>
    </div>
    <transition name="te-select-fade">
      <div class="tb-input-select-list" v-if="selectOp">
        <div
          v-for="(num, index) in tempIndexArr"
          class="z-depth-1"
          :key="i"
        > 
          <tb-cascader-options
            :temp-index-arr="tempIndexArr" 
            :serial-num="index"
            :options="options"
            @setSelected="setTempIndexArr"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import TbCascaderOptions from './options.vue';

  export default {
    name: 'TbCascader',

    props: {
      value: {
        type: Array,
        default: []
      },
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default: []
      }
    },

    data () {
      return {
        selectOp: false,
        hover: false,
        tempIndexArr: []
      }
    },

    computed: {
      checkedLabel () {
        let str = '';
        let char = '';
        let curOptions = JSON.parse(JSON.stringify(this.options));
        for (let i = 0; i < this.indexArr.length; i++) {
          str += char + curOptions[this.indexArr[i]].label;
          char = ' / ';
          curOptions = curOptions[this.indexArr[i]].children;
          if (curOptions === null || curOptions === undefined || curOptions.length === 0) {
            break;
          }
        }
        this.$emit('getlabel', str);
        return str;
      },

      inputIcon () {
        if (this.selectOp) {
          return 'chevron-up';
        } else if (this.value.length > 0 && this.hover) {
          return 'close';
        }
        return 'chevron-down';
      },
      indexArr: {
        get () {
          const getValueLable = (options, valueArr, indexArr) => {
            if (valueArr.length === 0 || options === undefined || options.length === 0) {
              return indexArr;
            }
            let index = -1;
            for (let i = 0; i < options.length; i++) {
              if (options[i].value === valueArr[0]) {
                indexArr.push(i);
                index = i;
                break;
              }
            }
            if (index !== -1) {
              return getValueLable(options[index].children, valueArr.slice(1, valueArr.length), indexArr);
            }
            return indexArr;
          }
          const temp = getValueLable(JSON.parse(JSON.stringify(this.options)), this.value, []);
          return temp;
        },

        set (val) {
          this.setValue(val);
        }
      }
    },

    mounted() {
      // 空白点击 缩回
      const self = this;
      const bd = document.getElementsByTagName('body')[0];
      bd.addEventListener('click', function(ev) {
        if (!self.checkIsInSelect(ev.target)) {
          self.selectOp = false;
        }
      });
    },

    methods: {
      setValue (tempArr) {
        const valArr = [];
        let arr = this.options;
        for (let i = 0; i < tempArr.length; i++) {
          valArr.push(arr[tempArr[i]].value);
          arr = arr[tempArr[i]].children;
        }
        this.$emit('input', valArr);
      },

      copyArr (arr) {
        return JSON.parse(JSON.stringify(arr));
      },

      checkIsLast () {
        let curOptions = JSON.parse(JSON.stringify(this.options));
        for (let i = 0; i < this.indexArr.length; i++) {
          curOptions = curOptions[this.indexArr[i]].children;
        }
        if (curOptions === null || curOptions === undefined || curOptions.length === 0) {
          return true;
        }
        return false;
      },

      setTempIndexArr (listIndex, index, isLast) {
        this.tempIndexArr = this.tempIndexArr.slice(0, listIndex);
        this.tempIndexArr.push(index);
        if (isLast) {
          this.indexArr = this.tempIndexArr;
          this.selectOp = false;
        } else {
          this.tempIndexArr.push(-1);
        }
      },

      toggleOptions () {
        if (this.disabled) {
          return;
        }
        if (this.selectOp) {
          this.selectOp = false;
        } else {
          this.selectOp = true;
          this.tempIndexArr = this.copyArr(this.indexArr);
          if (!this.checkIsLast(this.indexArr)) {
            this.tempIndexArr.push(-1);
          }
        }
      },

      iconClick () {
        if (this.disabled) {
          return;
        }

        if (this.inputIcon === 'close') {
          this.indexArr = [];
        } else {
          this.toggleOptions();
        }
      },

      setHover (state) {
        if (!this.disabled) {
          this.hover = state;
        }
      },

      checkIsInSelect (node) {
        if (!node) {
          return false;
        } else if (node.className && node.className.indexOf('tb-cascader') !== -1) {
          return true;
        }
        return this.checkIsInSelect(node.parentNode);
      }
    },

    components: {
      TbCascaderOptions
    }
  }
</script>