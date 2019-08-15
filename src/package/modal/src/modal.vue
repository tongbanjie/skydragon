<template>
  <transition :name="effectClassName">
    <div class="tb-modal" v-show="show" @click="modalHideByBg">
      <div class="tb-modal-dialog" :class="tbClass">
        <div class="tb-modal-header">
          <h2>{{title}}</h2>
          <ul class="tb-action" v-if="hasClose">
            <li>
              <a class="tb-action-one" href="javascript:void(0);" @click="modalHandle(false)"><tb-icon icon="close" size="14px"></tb-icon></a>
            </li>
          </ul>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  // 暂时支持三个尺寸
  const modalSize = ['lg', 'md', 'xs'];
  const bodyStyle = document.querySelector('body').style.overflow;
  let timer;

  export default {
    name: 'TbModal',

    props: {
      effect: {
        type: String,
        default: 'fade'
      },
      size: {
        type: String,
        default: 'md'
      },
      value: {},
      title: {
        type: String,
        default: '提示'
      },
      hasClose: {
        type: Boolean,
        default: true
      },
      bgClose: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      show: {
        get () {
          return this.value;
        },

        set (val) {
          this.$emit('input', val);
        }
      },
      tbClass () {
        if (modalSize.indexOf(this.size) !== -1) {
          return 'tb-modal-' + this.size;
        }
        return '';
      },
      effectClassName () {
        return 'te-' + this.effect;
      }
    },

    watch: {
      show (to, from) {
        clearTimeout(timer);
        const ele = document.querySelector('body');
        if (to) {
          this.$emit('open');
          ele.style.overflow = 'hidden';
        } else {
          this.$emit('close');
          timer = setTimeout(() => {
            ele.style.overflow = bodyStyle;
          }, 250);
        }
      }
    },

    methods: {
      checkHasClass (classNames, curClassName) {
        const classNameList = classNames.split(' ');
        for (let i = 0; i < classNameList.length; i++) {
          if (classNameList[i] === curClassName) {
            return true;
          }
        }
        return false;
      },
      checkIsModalBg (node) {
        if (!node) {
          return true;
        } else if (node.className && this.checkHasClass(node.className, 'tb-modal-dialog')) {
          return false;
        } else if (node.className && this.checkHasClass(node.className, 'tb-modal')) {
          return true;
        }
        return this.checkIsModalBg(node.parentNode);
      },
      modalHideByBg (e) {
        if (this.checkIsModalBg(e.target) && this.bgClose) {
          this.modalHandle(false);
        }
      },
      modalHandle (type) {
        this.show = type;
      }
    }
  }
</script>