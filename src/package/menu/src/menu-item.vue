<template>
  <li>
    <a v-if="!isRouter" :href="url" class="tb-menu-label" :class="{'active': active}" :style="labelStyle" @click="toggleSubMenu(false)"><tb-icon :icon="icon" v-if="icon" class="tb-menu-icon" size="20px" :style="iconStyle"></tb-icon>{{label}}<tb-icon :icon="typeIcon" v-if="$slots.default && !disabled" size="20px" class="tb-menu-show"></tb-icon></a>
    <router-link v-if="isRouter" :to="{path: url}"  class="tb-menu-label" :class="{'active': active}" :style="labelStyle" @click="toggleSubMenu(false)"><tb-icon :icon="icon" v-if="icon" class="tb-menu-icon" size="20px" :style="iconStyle"></tb-icon>{{label}}<tb-icon :icon="typeIcon" v-if="$slots.default && !disabled" size="20px" class="tb-menu-show"></tb-icon></router-link>
    <tb-collapse :show="tbShow">
      <template slot="collapse"><slot></slot></template>
    </tb-collapse>
  </li>
</template>

<script>
  import Emitter from '../../../mixins/emitter';

  export default {
    name: 'TbMenuItem',

    mixins: [Emitter],

    props: {
      label: String,
      icon: String,
      url: {
        type: String,
        default: 'javascript:void(0)'
      },
      isRouter: {
        type: Boolean,
        default: false
      },
      show: {
        type: Boolean,
        default: true
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: 1
      }
    },

    data () {
      return {
        tbShow: true
      }
    },

    computed: {
      typeIcon () {
        return this.tbShow ? 'minus' : 'plus';
      },
      labelStyle () {
        const s = {};
        if (this.index && !isNaN(this.index)) {
          const indexNum = this.icon ? parseInt(this.index) : parseInt(this.index) - 1;
          s.paddingLeft = indexNum * 20 + 30 + 'px';
        }
        return s;
      },
      iconStyle () {
        const s = {};
        if (this.index) {
          s.left = this.index * 20 + 'px';
        }
        return s;
      }
    },

    created () {
      this.tbShow = this.show;
    },

    mounted () {
      if (!this.tbShow) {
        this.toggleSubMenu(true);
      }
    },

    methods: {
      toggleSubMenu (isFirst) {
        if (this.disabled) {
          return false;
        }
        if (!isFirst) {
          this.tbShow = !this.tbShow;
        }
        let children = null;
        let name = '';
        for (let i = 0; i < this.$children.length; i++) {
          children = this.$children[i];
          name = children.$options.componentName;
          if (children && name === 'TbMenu') {
            children.$emit.apply(children, ['item-click'].concat(this));
          }
        }
        return true;
      }
    }
  }
</script>