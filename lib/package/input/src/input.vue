<template>
  <div class="tb-input-group" :class="{
    'tb-input-group-icon': hasIcon, 
    'tb-input-group-icon-left': hasLeftIcon,  
    'tb-input-group-prepend': hasPrepend, 
    'tb-input-group-append': hasAppend
    }">
    <div class="tb-input-prepend" v-if="hasPrepend"><slot name="prepend"></slot></div>
    <div style="position: relative">
      <input ref="input" v-if="!textarea" class="tb-input" 
      v-model="model" 
      :disabled="disabled" 
      :readonly="readonly" 
      :name="name" 
      :placeholder="placeholder" 
      :maxlength="maxlength" 
      @focus="handleFocus"
      @blur="handleBlur"
      @click="handleClick">
      <textarea v-if="textarea" class="tb-input-textarea" 
      v-model="model" 
      :disabled="disabled" 
      :readonly="readonly" 
      :name="name" 
      :placeholder="placeholder" 
      :maxlength="maxlength" 
      :rows="rows" 
      :style="style"
      @focus="handleFocus"
      @blur="handleBlur"
      @click="handleClick">
      </textarea>
      <tb-icon class="tb-input-icon-left" 
        :icon="leftIcon" 
        v-if="hasLeftIcon" 
        @click="handleLeftIcon" 
        size="16px" 
        :style="{cursor: isLeftIconClick ? 'pointer' : 'default'}"></tb-icon>
      <tb-icon class="tb-input-icon" 
        :icon="icon" 
        v-if="hasIcon" 
        @click="handleIcon" 
        size="16px"
        :style="{cursor: isIconClick ? 'pointer' : 'default'}"></tb-icon>
    </div>
    <div class="tb-input-append" v-if="hasAppend"><slot name="append"></slot></div>
  </div>
</template>

<script>
  import Emitter from '../../../mixins/emitter';

  export default {
    name: 'TbInput',

    mixins: [Emitter],

    data () {
      return {
        selfModel: ''
      }
    },

    props: {
      disabled: Boolean,
      readonly: Boolean,
      name: String,
      placeholder: String,
      value: {},
      icon: String,
      leftIcon: String,
      maxlength: {
        type: Number
      },
      type: {
        type: String,
        default: 'text'
      },
      textarea: {
        type: Boolean,
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      resize: {
        type: String,
        default: 'none'
      }
    },

    mounted () {
      if (!this.textarea) {
        this.$refs.input.type = this.type;
      }
    },

    computed: {
      model: {
        get () {
          if (this.maxlength !== undefined) {
            return this.value !== undefined ? this.value.slice(0, this.maxlength) : this.selfModel.slice(0, this.maxlength);
          }
          return this.value !== undefined ? this.value : this.selfModel;
        },

        set (val) {
          this.$emit('input', val);
        }
      },

      hasIcon () {
        if (this.icon) {
          return true;
        }
        return false;
      },

      hasLeftIcon () {
        if (this.leftIcon) {
          return true;
        }
        return false;
      },

      isIconClick () {
        if (this._events['icon-click']) {
          return true;
        }
        return false;
      },

      isLeftIconClick () {
        if (this._events['left-icon-click']) {
          return true;
        }
        return false;
      },

      hasPrepend () {
        if (this.$slots.prepend) {
          return true;
        }
        return false;
      },
      hasAppend () {
        if (this.$slots.append) {
          return true;
        }
        return false;
      },
      style () {
        const s = [];
        s.push({
          resize: this.resize
        });
        return s;
      }
    },

    methods: {
      handleFocus (ev) {
        this.$emit('focus', ev);
      },

      handleBlur (ev) {
        this.$emit('blur', ev);
      },

      handleClick (ev) {
        this.$emit('click', ev);
      },

      handleIcon (ev) {
        if (this.isIconClick) {
          this.$emit('icon-click', ev);
        }
      },

      handleLeftIcon (ev) {
        if (this.isLeftIconClick) {
          this.$emit('left-icon-click', ev);
        }
      }
    }
  }
</script>