<template>
  <div class="tb-switch" :class="{'disabled': disabled}" :data-tb-color="bgmcolor">
    <label class="tb-label" v-if="label">{{label}}</label>
    <input type="checkbox" hidden="hidden" v-model="model" :disabled="disabled">
    <label class="tb-helper" @click="setModel"></label>
  </div>
</template>

<script>
  export default {
    name: 'TbSwitch',

    props: {
      value: {},
      label: String,
      disabled: Boolean,
      bgmcolor: String
    },

    data () {
      return {
        selfModel: false
      }
    },

    computed: {
      model: {
        get () {
          return this.value ? this.value : this.selfModel;
        },

        set (val) {
          this.$emit('input', val);
        }
      }
    },

    methods: {
      setModel () {
        // this.value = !this.model;
        if (!this.disabled) {
          this.$emit('input', !this.model);
        }
      }
    }
  }
</script>