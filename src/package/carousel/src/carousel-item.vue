<template>
  <transition :name="transitionWork">
    <div class="tb-carousel-item" v-show="active">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'TbCarouselItem',

    componentName: 'TbCarouselItem',

    data () {
      return {
        direction: 'left',
        active: false
      }
    },

    computed: {
      transitionWork () {
        return 'te-ci' + this.direction;
      }
    },

    methods: {
      setActive (isActive, direction) {
        this.direction = direction;
        this.active = isActive;
      }
    }
  }
</script>