<template>
  <div class="tb-table-wrap" :class="classList" :style="conStyleList">

    <!-- <div class="tb-table-con-wrap">
      <div :style="conStyleList"> -->
        <tb-table-header :head-data="headData" :style="innerStyleList">
        </tb-table-header>
        <tb-table-body :head-data="headData" :body-data="bodyData" :style="innerStyleList">
        </tb-table-body>
      <!-- </div>
    </div> -->
    <div class="tb-table-fixedleft-wrap" :style="{width: fixedOption.leftWidth + 'px'}" :class="{'shadow': isShadow}">
      <tb-table-header :head-data="headData" fixed-position="left" :style="innerStyleList">
      </tb-table-header>
      <tb-table-body :head-data="headData" :body-data="bodyData" fixed-position="left" :style="innerStyleList">
      </tb-table-body>
    </div>
    <div class="tb-table-fixedright-wrap" :style="{width: ((fixedOption.rightWidth > 1 ? fixedOption.rightWidth : 1) - 1) + 'px'}" :class="{'shadow': isShadow}">
      <tb-table-header :head-data="headData" fixed-position="right"
        :style="rightInnerStyleList">
      </tb-table-header>
      <tb-table-body :head-data="headData" :body-data="bodyData" fixed-position="right" 
        :style="rightInnerStyleList">
      </tb-table-body>
    </div>
    <!-- <slot></slot> -->
    <!-- <template>
      <slot></slot>
    </template> -->
  </div>
</template>

<script>
  import tableHeader from './table-header.vue';
  import tableBody from './table-body.vue';

  import Emitter from '../../../mixins/emitter';

  export default {
    name: 'TbTable',

    mixins: [Emitter],

    props: {
      conWidth: {
        type: Number
      },
      conHeight: {
        type: Number
      },
      innerWidth: {
        type: Number
      },
      data: {
        type: Array
      },
      border: {
        type: Boolean,
        default: false
      },
      stripe: {
        type: Boolean,
        default: false
      },
      hover: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        headData: [],
        fixedOption: {
          leftWidth: 0,
          rightWidth: 0
        },
        isShadow: true,
        fixedRightWidth: 0
      }
    },

    computed: {
      conStyleList () {
        const s = [];
        if (this.conWidth === undefined) {
          s.push({
            'width': '100%'
          });
        } else {
          s.push({
            'width': this.conWidth + 'px'
          });
        }

        if (this.conHeight !== undefined) {
          s.push({
            'max-height': this.conHeight + 'px'
          });
        }

        return s;
      },
      classList () {
        const s = [];
        if (this.border) {
          s.push('tb-table-wrap-border');
        }
        if (this.stripe) {
          s.push('tb-table-wrap-stripe');
        }
        if (this.hover) {
          s.push('tb-table-wrap-hover');
        }
        return s;
      },
      innerStyleList () {
        const s = [];
        if (this.innerWidth !== undefined) {
          s.push({
            'min-width': this.innerWidth + 'px'
          });
        }
        return s;
      },
      rightInnerStyleList () {
        const s = [{
          'margin-left': this.fixedRightWidth + 'px'
        }];
        if (this.innerWidth !== undefined) {
          s.push({
            'min-width': this.innerWidth + 'px'
          });
        }
        return s;
      },
      bodyData () {
        return this.data;
      }
    },

    mounted () {
      // console.log(this.$slots.default);
      this.initHeadData();
      this.addEvent('resize', window, this.buildHeadData, false);
      this.addEvent('scroll', this.$el, this.handleScroll, false);
    },

    beforeDestroy () {
      this.removeEvent('resize', window, this.buildHeadData, false);
      this.removeEvent('scroll', this.$el, this.handleScroll, false);
    },

    methods: {
      handleScroll (e) {
        const scrollTop = this.$el.scrollTop;
        const scrollLeft = this.$el.scrollLeft;
        const leftEle = this.$el.querySelector('.tb-table-fixedleft-wrap');
        const rightEle = this.$el.querySelector('.tb-table-fixedright-wrap');

        const leftHeaderEle = leftEle.querySelector('.tb-table-header-wrap');
        const rightHeaderEle = rightEle.querySelector('.tb-table-header-wrap');

        leftHeaderEle.style.top = scrollTop + 'px';
        rightHeaderEle.style.top = scrollTop + 'px';
        leftEle.style.left = scrollLeft + 'px';
        rightEle.style.right = '-' + scrollLeft + 'px';
      },
      getMarginLeft () {
        // const wrapWidth = this.innerWidth !== undefined ? this.innerWidth : this.$el.offsetWidth;
        // const conWidth = this.conWidth !== undefined ? this.conWidth : this.$el.offsetWidth;
        let conWidth = this.$el.querySelector('.tb-table-header-wrap').offsetWidth;
        conWidth = parseInt(conWidth.toFixed(0));
        console.log(conWidth);
        this.fixedRightWidth = this.fixedOption.rightWidth - conWidth - 1;
      },
      compareWidth (real, setUp) {
        // if (this.isShadow) {
        //   return setUp;
        // }
        if (real > setUp) {
          return real;
        }
        return setUp;
      },
      // eslint-disable-next-line complexity
      setCol (td) {
        let num = 0;
        let count = 0;
        let wrapWidth = this.innerWidth !== undefined ? this.innerWidth : this.$el.offsetWidth;
        const conWidth = this.conWidth !== undefined ? this.conWidth : this.$el.offsetWidth;

        if (conWidth < wrapWidth) {
          this.isShadow = true;
        } else {
          this.isShadow = false;
        }

        // if (this.conWidth !== undefined) {
        //   if (this.conWidth > wrapWidth) {
        //     this.isShadow = true;
        //   }
        //   wrapWidth = this.conWidth;
        // }
        // console.log(wrapWidth);
        const headerTdEle = this.$el.querySelectorAll('.tb-table-header-td');
        let normalWidth = 0;
        const tdLen = td.length;
        const temp1 = [], temp2 = [], temp3 = [];
        for (let i = 0; i < tdLen; i++) {
          if (td[i].propsData.width !== undefined && !isNaN(td[i].propsData.width)) {
            num += td[i].propsData.width;
          } else {
            count++;
          }

          td[i].propsData.realWidth = headerTdEle[i].offsetWidth;
        }
        if (num < wrapWidth && count !== 0) {
          if (this.border) {
            wrapWidth = wrapWidth - 2;
          }
          normalWidth = (wrapWidth - num) / count;
        }

        for (let i = 0; i < tdLen; i++) {
          if (td[i].propsData.width === undefined || isNaN(td[i].propsData.width)) {
            td[i].propsData.width = normalWidth;
          }
          if (this.isShadow) {
            td[i].propsData.realWidth = td[i].propsData.width;
          }
        }

        // this.checkShadow(td);

        for (let i = 0; i < tdLen; i++) {
          if (td[i].propsData.fixed && (td[i].propsData.position === undefined || td[i].propsData.position === 'left')) {
            temp1.push(td[i]);
            this.fixedOption.leftWidth += this.compareWidth(td[i].propsData.realWidth, td[i].propsData.width);
          } else if (td[i].propsData.fixed && td[i].propsData.position === 'right') {
            temp3.push(td[i]);
            this.fixedOption.rightWidth += this.compareWidth(td[i].propsData.realWidth, td[i].propsData.width);
          } else {
            temp2.push(td[i]);
          }
        }
        td = temp1.concat(temp2.concat(temp3));
        return td;
      },
      initHeadData () {
        const td = [];
        for (let i = 0; i < this.$slots.default.length; i++) {
          const curCol = this.$slots.default[i];
          if (curCol.componentOptions && curCol.componentOptions.tag === 'tb-table-col') {
            if (curCol.componentOptions.propsData.prop === undefined) {
              curCol.componentOptions.propsData._tpl = curCol.componentOptions.children;
            }
            td.push(curCol.componentOptions);
          }
        }
        
        // console.log(td);
        this.headData = td;
        this.$nextTick(() => {
          this.buildHeadData();
        });
      },
      buildHeadData () {
        this.fixedOption = {
          leftWidth: 0,
          rightWidth: 0
        };

        let td = this.headData;
        
        this.$nextTick(() => {
          td = this.setCol(td);
          this.headData = td;
          this.$nextTick(() => {
            this.getMarginLeft();
          });
        });
      }
    },

    components: {
      'tb-table-header': tableHeader,
      'tb-table-body': tableBody
    }
  }
</script>