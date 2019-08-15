<template>
  <div class="tb-tab-pane" v-if="model === name"><slot></slot></div>
</template>

<script>
  export default {
    name: 'TbTabPane',

    props: {
      label: String,
      name: String
    },

    data () {
      return {
        selfModel: '',
        tabParent: null
      }
    },

    computed: {
      model () {
        return this.store ? this.store : this.selfModel;
      },

      store () {
        let parent = this.$parent;
        
        while (parent) {
          if (parent.$options.componentName === 'TbTabs') {
            this.tabParent = parent;
            return this.tabParent.value;
          }
          parent = parent.$parent;
        }
        return '';
      }
    },

    created () {
      this.$parent.addPane(this);
    },

    beforeDestroy () {
      this.$parent.removePane(this);
    }
  }
</script>