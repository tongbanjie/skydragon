<template>
  <div class="radio-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TbRadioGroup',

    componentName: 'TbRadioGroup',
    
    props: {
      value: {}
    }
  }
</script>