<template>
  <div class="tb-accordion-item">
    <label @click="accordionOp" :class="{'active': tShow}"><tb-icon :icon="icon" size="14px" class="tb-m-r-10"></tb-icon>{{label}}</label>
    <div class="tb-accordion-item-content">
      <tb-collapse :show="tShow">
        <template slot="collapse"><slot></slot></template>
      </tb-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TbAccordionItem',

    props: {
      label: {
        type: String
      },

      show: {
        type: Boolean,
        default: false
      }
    },

    created () {
      this.tShow = this.show;
      this.$watch('show', (val) => {
        this.tShow = val;
      });
    },

    data () {
      return {
        tShow: true
      }
    },

    computed: {
      icon () {
        return this.tShow ? 'minus' : 'plus';
      }
    },

    methods: {
      accordionOp () {
        this.tShow = !this.tShow;
        this.$emit('switch', this.tShow);
      }
    }
  }
</script>