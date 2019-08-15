<template>
  <div class="tb-table-header-wrap">
    <table class="tb-table">
      <colgroup>
        <col v-for="(col, index) in headData" :width="getRealWidth(col)">
      </colgroup>
      <thead>
        <tr>
          <th v-for="(col, index) in headData" :class="{'tb-table-header-td': fixedPosition === undefined}">{{col.propsData.label}}</th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'TbTableHeader',

    props: {
      headData: {
        type: Array
      },
      fixedPosition: {
        type: String
      }
    },

    methods: {
      getRealWidth (col) {
        // if (this.fixedPosition === undefined) {
        //   return col.propsData.width + 'px';
        // }
        if (col.propsData.realWidth > col.propsData.width) {
          return col.propsData.realWidth + 'px';
        }
        return col.propsData.width + 'px';
      },

      checkIsShow (index) {
        // if (this.fixedPosition !== undefined) {
        //   if (this.headData[index].propsData.fixed) {
        //     return true;
        //   }
        //   return false;
        // }
        return true;
      }
    }
  }
</script>