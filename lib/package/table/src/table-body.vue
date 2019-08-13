<template>
  <div class="tb-table-body-wrap">
    <table class="tb-table">
      <colgroup>
        <col v-for="(col, index) in headData" :width="getRealWidth(col)">
      </colgroup>
      <tbody>
        <tr v-for="(data, index) in bodyData">
          <td v-for="(col, index2) in headData">
            <span v-if="col.propsData.prop !== undefined">{{data[col.propsData.prop]}}</span>
            <span v-if="col.propsData.prop === undefined">
              <tpl-render :data="col.propsData._tpl" :row="index"></tpl-render>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import TplRender from './tplrender.js';

  export default {
    name: 'TbTableBody',

    props: {
      headData: {
        type: Array
      },
      bodyData: {
        type: Array
      },
      fixedPosition: {
        type: String
      }
    },

    mounted () {

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
      }
    },

    components: {
      TplRender
    }
  }
</script>