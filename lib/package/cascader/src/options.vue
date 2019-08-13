<template>
  <div>
    <ul>
      <li 
        v-for="(option, index) in curOptions"
        :class="{'disabled': option.disabled, 'active': index == tempIndexArr[serialNum]}"
        @click="setSelected(option, index)">{{option.label}}<tb-icon icon="chevron-right" class="tb-input-select-icon" size="16px" v-if="option.children != undefined && option.children.length != 0"></tb-icon>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'TbCascaderOption',
    props: {
      serialNum: {
        type: Number,
        default: 0
      },
      options: {
        type: Array,
        default: []
      },
      tempIndexArr: {
        type: Array,
        default: []
      }
    },

    computed: {
      curOptions () {
        let arr = JSON.parse(JSON.stringify(this.options));
        for (let i = 0; i < this.serialNum; i++) {
          arr = arr[this.tempIndexArr[i]].children;
        }
        return arr;
      }
    },

    methods: {
      setSelected (option, index) {
        if (!option.disabled) {
          const isLast = this.curOptions[index].children === undefined || this.curOptions[index].children === null || this.curOptions[index].children.length === 0
          this.$emit('setSelected', this.serialNum, index, isLast);
        }
      }
    }
  }
</script>