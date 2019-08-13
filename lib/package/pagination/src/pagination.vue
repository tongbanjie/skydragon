<template>
  <tb-row class="tb-pagination-div">
    <tb-col :span="24" :sm="24" :md="16"  class="tb-m-b-10">
      <ul class="tb-pagination clearfix">
        <!-- 左侧切换 -->
        <li :class="{'disabled': curPage<=1}">
          <a href="javascript:void(0)" aria-label="Previous" @click="selectPage(curPage-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <!-- 中间 -->
        <li v-for="n in pageShowArray"  :class="{'tb-pagination-one': true, 'active': n == curPage}">
          <a href="javascript:void(0)" @click="selectPage(n)">{{n}}</a>
        </li>

        <li :class="{'disabled': curPage>=totalPage}">
          <a href="javascript:void(0)" aria-label="Next" @click="selectPage(curPage+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </tb-col>
    <tb-col :span="6" :sm="6" :md="4" class="tb-m-b-10">
      <tb-input v-model.number="goNum" type="number">
        <template slot="append"><tb-btn type="link" @click="selectPage(goNum, true)">跳转</tb-btn></template>
      </tb-input>
    </tb-col>
    <tb-col :span="6" :sm="6" :md="4" class="tb-m-b-10">
      <div class="tb-pagination-desc">
        {{curPage}}页/{{totalPage}}页
      </div>
    </tb-col>
  </tb-row>
</template>

<script>
  export default {
    name: 'TbPage',

    props: {
      curPage: {
        type: Number,
        require: true
      },
      totalNum: {
        type: Number
      },
      perNum: {
        type: Number,
        require: true
      }
    },

    computed: {
      totalPage () {
        return Math.ceil(this.totalNum / this.perNum);
      },
      pageShowArray () {
        const self = this
        const s = [];
        if (self.totalPage <= 8 || self.curPage <= 4) {
          const nowTotalPage = self.totalPage > 8 ? 8 : self.totalPage;
          for (let i = 1; i <= nowTotalPage; i++) {
            s.push(i);
          }
        } else {
          if (self.curPage > 4 && self.curPage <= self.totalPage - 4) {
            for (let i = self.curPage - 3; i <= self.curPage + 4; i++) {
              s.push(i);
            }
          } else {
            for (let i = self.totalPage - 7; i <= self.totalPage; i++) {
              s.push(i);
            }
          }
        }
        return s;
      }
    },

    created () {
    },

    data () {
      return {
        goNum: 1
      }
    },

    methods: {
      selectPage (num, type) {
        if (num > 0 && num <= this.totalPage) {
          this.$emit('select', num);
        } else {
          if (type) {
            const msg = num < 0 ? '不允许低于0' : '不允许超出总页面';
            this.$emit('beyondSelect', msg);
          }
        }
      }
    }
  }
</script>