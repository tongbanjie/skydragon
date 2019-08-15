<template>
  <transition name="te-fade">
    <div class="tb-modal" v-show="show">
      <div class="tb-dialog tb-modal-dialog">
        <div class="tb-card">
          <div class="tb-card-body tb-card-padding tb-p-b-0">
            <div class="tb-dialog-title">
              <i :class="iconClass"></i>
            </div>
            <div class="tb-dialog-info">
              <p v-if="title != ''">{{title}}</p>
              <span v-if="info != ''">{{info}}</span>
            </div>
          </div>
          <div class="tb-card-footer tb-dialog-footer">
            <button class="tb-btn tb-btn-primary" :class="{'tb-m-r-20': confirmText != '' && cancelText != ''}" @click="confirm" v-if="confirmText != ''">{{confirmText}}</button>
            <button class="tb-btn tb-btn-default" @click="cancel" v-if="cancelText != ''">{{cancelText}}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        type: 'success',
        title: '',
        info: '',
        confirmText: '确定',
        cancelText: '取消',
        show: false,
        onCancel: () => {},
        onConfirm: () => {}
      }
    },

    computed: {
      iconClass () {
        let ic = 'tb-icon ';
        switch (this.type) {
          case 'success':
            ic += 'tb-icon-check-circle';
            break;
          case 'confirm':
            ic += 'tb-icon-help';
            break;
          case 'warning':
            ic += 'tb-icon-info';
            break;
          default:
            ic += 'tb-icon-check-circle';
            break;
        }
        return ic;
      }
    },

    methods: {
      destroyElement () {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },
      cancel() {
        this.show = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
        if (typeof this.onCancel === 'function') {
          this.onCancel(this);
        }
      },
      confirm() {
        this.show = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
        if (typeof this.onConfirm === 'function') {
          this.onConfirm(this);
        }
      }
    }
  }
</script>