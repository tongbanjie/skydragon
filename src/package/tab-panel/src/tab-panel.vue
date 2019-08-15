<template>
  <div class="tb-tab-panel">
    <ul class="tb-tab-nav" :class="align ? 'tb-text-align-' + align : ''">
      <li v-for="(pane, index) in panes" :class="{'active': value === pane.name}" @click="selectPane(pane)">
        <a href="javascript:void(0)">{{pane.label}}</a>
      </li>
    </ul>
    <div class="tb-tab-content" :style="styles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TbTabs',

    componentName: 'TbTabs',

    props: {
      value: {},
      align: String,
      height: ''
    },

    data() {
      return {
        panes: []
      }
    },

    computed: {
      styles () {
        const s = {};
        if (this.height) {
          s.height = (this.height.indexOf('px') === -1 ? (this.height + 'px') : this.height);
        }
        return s;
      }
    },

    methods: {
      addPane (pane) {
        this.panes.push(pane);
      },

      removePane (pane) {
        for (let i = 0; i < this.panes.length; i++) {
          if (this.panes[i]._uid === pane._uid) {
            this.panes.splice(i, 1);
            break;
          }
        }
      },

      selectPane (pane) {
        this.$emit('input', pane.name);
      }
    }
  }
</script>