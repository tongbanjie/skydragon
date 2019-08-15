<template>
  <li :class="{active: active}">
    <router-link :to="{path: curUrl}" v-if="isRouter && !active" v-html="label"></router-link>
    <a :href="curUrl" v-if="!isRouter && !active" v-html="label"></a>
    <span v-if="active" v-html="label"></span>
  </li>
</template>

<script>
  export default {
    name: 'TbBreadcrumbOne',

    props: {
      label: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      },
      isRouter: {
        type: Boolean,
        default: false
      },
      active: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      curUrl () {
        if (this.url === '') {
          return 'javascript:void(0)';
        }
        return this.url;
      }
    }
  }
</script>