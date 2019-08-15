<template>
  <div class="checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TbCheckboxGroup',

    componentName: 'TbCheckboxGroup',

    props: {
      value: {}
    }
  }
</script>