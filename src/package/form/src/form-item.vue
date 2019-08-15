<template>
  <tb-col 
    :span="span" 
    :offset="offset"
    :pull="pull"
    :push="push"
    :xs="xs"
    :sm="sm"
    :md="md"
    :lg="lg">
    <div class="tb-form-group clearfix" >
      <label class="tb-form-label" v-if="label" :style="labelStyle" v-html="label"></label>
      <div class="tb-form-input" :style="style">
        <slot></slot>
      </div>
    </div>
  </tb-col>
</template>

<script>
  export default {
    name: 'TbFormItem',

    props: {
      label: String,
      align: {
        type: String,
        default: 'right'
      },
      position: {
        type: String,
        default: 'left'
      },
      span: Number,
      offset: Number,
      pull: Number,
      push: Number,
      xs: [Number, Object],
      sm: [Number, Object],
      md: [Number, Object],
      lg: [Number, Object]
    },

    computed: {
      labelStyle () {
        const ret = {
          textAlign: 'right'
        };
        ret.textAlign = this.align;
        if (this.position === 'top') {
          ret.width = '100%';
          ret.padding = '11px 0 11px 0';
        } else if (this.position === 'right') {
          ret.float = 'right';
          ret.padding = '11px 0 11px 12px';
        }
        return ret;
      },
      style () {
        const ret = {
          marginRight: 0,
          marginLeft: 0
        };
        if (this.label) {
          switch (this.position) {
            case 'left':
              ret.marginLeft = '80px';
              break;
            case 'right':
              ret.marginRight = '80px';
              break;
            default:
              break;
          }
        }
        return ret;
      }
    }
  }
</script>