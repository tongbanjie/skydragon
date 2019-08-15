<template>
  <transition :name="msgEffect">
    <div class="tb-message" 
      v-show="show" 
      :class="msgClass" 
      @mouseenter="clearTimer" 
      @mouseleave="startTimer">
      <i class="tb-message-icon tb-icon" :class="newIcon" v-if="newIcon"></i>
      <span>{{message}}</span>
      <ul class="tb-action">
        <li>
          <a href="javascript:void(0)" class="tb-action-one" @click="close"><i class="tb-icon tb-icon-close"></i></a>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
  // primary, warning, danger
  // right-top, right-bottom left-top left-bottom center-top center-bottom

  export default {
    data () {
      return {
        type: 'default',
        message: '',
        icon: '',
        show: false,
        position: 'righttop',
        duration: 3000,
        timer: null,
        onClose: null
      }
    },

    computed: {
      newIcon () {
        const typeIcons = {
          'default': 'alert-triangle',
          'success': 'badge-check',
          'warning': 'alert-triangle',
          'error': 'close-circle'
        };
        if (this.icon === '') {
          return 'tb-icon-' + typeIcons[this.type];
        }
        return this.icon;
      },
      msgClass () {
        const s = [];
        s.push('tb-message-' + this.position);
        s.push('tb-message-' + this.type);
        return s;
      },
      msgEffect () {
        return 'te-msgshow-' + this.position;
      }
    },

    methods: {
      destroyElement () {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },
      close () {
        this.show = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },

      clearTimer () {
        clearTimeout(this.timer);
      },

      startTimer () {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (this.show) {
              this.close();
            }
          }, this.duration);
        }
      }
    },

    mounted () {
      this.startTimer();
    }
  }
</script>