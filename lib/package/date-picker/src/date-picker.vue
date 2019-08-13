<template>
  <div class="tb-dt-con">
    <tb-input v-model="model" 
      :placeholder="placeholder"
      :readonly="true"
      :disabled="disabled"
      :name="name" 
      left-icon="calendar" 
      :icon="icon"
      @click="handleDt(true)"
      @left-icon-click="handleDt(true)"
      @icon-click="model = ''">
      <template slot="prepend" v-if="$slots.prepend"><slot name="prepend"></slot></template>
      <template slot="append" v-if="$slots.append"><slot name="append"></slot></template>
    </tb-input>
    <div class="tb-dt-panel z-depth-2-top" v-if="dtStatus.isOpen">
      
      <!-- 日期选择 -->
      <div class="tb-dt-div" v-if="dtStatus.panelType == 1">
        <div class="tb-dt-s tb-bgm-teal clearfix">
          <div class="tb-dt-s-prev" @click="scrollMonth('prev')">
            <i class="tb-icon tb-icon-arrow-left"></i>
          </div>
          <div class="tb-dt-s-cur">
            <span style="cursor: pointer" @click="changePanel(2)">{{lanMonth}}</span>&nbsp;&nbsp;<span style="cursor: pointer" @click="changePanel(3)">{{curDate.year}}</span>
          </div>
          <div class="tb-dt-s-next" @click="scrollMonth('next')">
            <i class="tb-icon tb-icon-arrow-right"></i>
          </div>
        </div>
        <div class="tb-dt-week tb-bgm-teal">
          <ul class="clearfix">
            <li v-for="(week, index) in lan.week">{{week}}</li>
          </ul>
        </div>
        <div class="tb-dt-day">
          <ul class="clearfix">
            <li v-for="(day, index) in days" 
              :class="{'disabled': day.disabled, 'today': day.today, 'curSelectd': day.curDay}"
              @click="selectDay(day.num, day.disabled)">{{day.num}}</li>
          </ul>
        </div>
        <div class="tb-dt-b" v-if="type === 'datetime'">
          <span @click="changePanel(4)"><i class="tb-icon tb-icon-time"></i>&nbsp;{{curDate.hour | fmtNum}}&nbsp;:&nbsp;{{curDate.minute | fmtNum}}<span v-if="hasSecond">&nbsp;:&nbsp;{{curDate.second | fmtNum}}</span></span>
        </div>
      </div>

      <!-- 月份选择 -->
      <div class="tb-dt-m-div" v-if="dtStatus.panelType == 2">
        <div class="tb-dt-s tb-bgm-teal clearfix">
          <div class="tb-dt-s-cur tb-m-l-50">
            选择月份
          </div>
        </div>
        <div class="tb-dt-month">
          <ul class="clearfix">
            <li v-for="(month, index) in months" 
              :class="{'disabled': month.disabled, 'curSelectd': month.curMonth}"
              @click="selectMonth(month.num, month.disabled)">{{month.value}}</li>
          </ul>
        </div>
      </div>

      <!-- 年份选择 -->
      <div class="tb-dt-y-div" v-if="dtStatus.panelType == 3">
        <div class="tb-dt-s tb-bgm-teal clearfix">
          <div class="tb-dt-s-prev" @click="scrollYear('prev')">
            <i class="tb-icon tb-icon-arrow-left"></i>
          </div>
          <div class="tb-dt-s-cur">
            {{curDate.year}}-{{curDate.year+14}}
          </div>
          <div class="tb-dt-s-next" @click="scrollYear('next')">
            <i class="tb-icon tb-icon-arrow-right"></i>
          </div>
        </div>
        <div class="tb-dt-year">
          <ul class="clearfix">
            <li v-for="(year, index) in years" 
              :class="{'disabled': year.disabled, 'curSelectd': year.curYear}"
              @click="selectYear(year.num, year.disabled)">{{year.num}}</li>
          </ul>
        </div>
      </div>

      <!-- 时间选择 -->
      <div class="tb-dt-t-div" v-if="dtStatus.panelType == 4">
        <div class="tb-dt-s tb-bgm-teal">
          <div class="tb-dt-s-prev" @click="changePanel(1)" v-if="type === 'datetime'">
            <i class="tb-icon tb-icon-arrow-left"></i>
          </div>
          <div class="tb-dt-s-cur" :class="{'tb-m-l-50': type !== 'datetime'}">
            {{curDate.hour | fmtNum}}:{{curDate.minute | fmtNum}}
          </div>
        </div>
        <div class="tb-dt-time">
          <div class="tb-dt-time-li clearfix" :class="{'tb-dt-time-li-second': hasSecond}">
            <a href="javascript:void(0)" @click="selectHour(curDate.hour+1)" :class="{'disabled': curDate.hour === 23}">+</a>
            <span></span>
            <a href="javascript:void(0)" @click="selectMinute(curDate.minute+1)" :class="{'disabled': curDate.minute === 59}">+</a>
            <span v-if="hasSecond"></span>
            <a href="javascript:void(0)" v-if="hasSecond" @click="selectSecond(curDate.second+1)" :class="{'disabled': curDate.second === 59}">+</a>
          </div>
          <div class="tb-dt-time-li" :class="{'tb-dt-time-li-second': hasSecond}">
            <a href="javascript:void(0)" @click="changePanel(5)">{{curDate.hour | fmtNum}}</a>
            <span>:</span>
            <a href="javascript:void(0)" @click="changePanel(6)">{{curDate.minute | fmtNum}}</a>
            <span v-if="hasSecond">:</span>
            <a href="javascript:void(0)" v-if="hasSecond" @click="changePanel(7)">{{curDate.second | fmtNum}}</a>
          </div>
          <div class="tb-dt-time-li clearfix" :class="{'tb-dt-time-li-second': hasSecond}">
            <a href="javascript:void(0)" @click="selectHour(curDate.hour-1)" :class="{'disabled': curDate.hour === 0}">-</a>
            <span></span>
            <a href="javascript:void(0)" @click="selectMinute(curDate.minute-1)" :class="{'disabled': curDate.minute === 0}">-</a>
            <span v-if="hasSecond"></span>
            <a href="javascript:void(0)" v-if="hasSecond" @click="selectSecond(curDate.second-1)" :class="{'disabled': curDate.second === 0}">-</a>
          </div>
        </div>
      </div>

      <!-- 时钟选择 -->
      <div class="tb-dt-h-div" v-if="dtStatus.panelType == 5">
        <div class="tb-dt-s tb-bgm-teal">
          <div class="tb-dt-s-cur tb-m-l-50">
            选择时钟
          </div>
        </div>
        <div class="tb-dt-hour">
          <ul class="clearfix">
            <li v-for="hour in 24" 
              :class="{'curSelectd': hour - 1 == curDate.hour}"
              @click="selectHour(hour - 1, true)">{{hour-1}}</li>
          </ul>
        </div>
      </div>

      <!-- 选择分钟 -->
      <div class="tb-dt-mm-div" v-if="dtStatus.panelType == 6">
        <div class="tb-dt-s tb-bgm-teal">
          <div class="tb-dt-s-cur tb-m-l-50">
            选择分钟
          </div>
        </div>
        <div class="tb-dt-minute">
          <ul class="clearfix">
            <li v-for="minuteOne in 12" 
              :class="{'curSelectd': (minuteOne-1)*5 == curDate.minute}"
              @click="selectMinute((minuteOne-1) * 5, true)">{{(minuteOne-1) * 5}}</li>
          </ul>
        </div>
      </div>

      <!-- 选择秒钟 -->
      <div class="tb-dt-mm-div" v-if="dtStatus.panelType == 7">
        <div class="tb-dt-s tb-bgm-teal">
          <div class="tb-dt-s-cur tb-m-l-50">
            选择秒钟
          </div>
        </div>
        <div class="tb-dt-second">
          <ul class="clearfix">
            <li v-for="secondOne in 12" 
              :class="{'curSelectd': (secondOne-1)*5 == curDate.second}"
              @click="selectSecond((secondOne-1) * 5, true)">{{(secondOne-1) * 5}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  import Emitter from '../../../mixins/emitter';
  // import Input from '../../input';
  import Lan from '../language/zh';
  import DateUtil from '../util/date-util';

  const dtMap = {
    date: 1,
    datetime: 1,
    time: 4
  };

  export default {
    name: 'TbDateTime',

    mixins: [Emitter],

    data() {
      return {
        icon: '',
        selfFormat: 'YYYY-MM-DD hh:mm:ss',
        lan: Lan,
        days: [],
        years: [],
        months: [],
        hours: [],
        today: '',
        curDate: {
          year: 2017,
          month: 4,
          day: 17,
          hour: 12,
          minute: 12,
          second: 12
        },
        dtStatus: {
          isOpen: false,
          panelType: 1,
          canClose: true
        },
        timeCp: null
      }
    },

    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      name: String,
      placeholder: String,
      value: {},
      type: {
        type: String,
        default: 'date'
      },
      startDate: '',
      endDate: '',
      format: {
        type: String,
        default: 'YYYY/MM/DD hh:mm:ss'
      },
      hasSecond: {
        type: Boolean,
        default: false
      }
    },

    filters: {
      fmtNum (num) {
        return num < 10 ? '0' + num : num;
      }
    },

    computed: {
      lanMonth () {
        return Lan.month[this.curDate.month - 1];
      },
      curFormat () {
        if (this.type === 'date') {
          return 'YYYY/MM/DD';
        }
        if (this.type === 'datetime') {
          return this.hasSecond ? 'YYYY/MM/DD hh:mm:ss' : 'YYYY/MM/DD hh:mm'
        }
        if (this.type === 'time') {
          return this.hasSecond ? 'hh:mm:ss' : 'hh:mm';
        }
        return this.hasSecond ? 'YYYY/MM/DD hh:mm:ss' : 'YYYY/MM/DD hh:mm';
      },
      model: {
        get () {
          this.icon = (this.value !== '' ? 'close' : '');
          return this.value;
        },

        set (val) {
          this.icon = (this.value !== '' ? 'close' : '');
          this.$emit('input', val);
        }
      }
    },

    created () {
      const self = this;
      self.today = DateUtil.getToday();
      self.initDt();

      const bd = document.getElementsByTagName('body')[0];

      self.addEvent('click', bd, function(ev) {
        if (self.dtStatus.isOpen && self.dtStatus.canClose) {
          if (!self.checkIsInSelect(ev.target)) {
            self.handleDt(false);
          }
        }
      });
    },

    methods: {
      checkIsInSelect (node) {
        if (!node) {
          return false;
        } else if (node.className && (node.className.indexOf('tb-dt-con') !== -1)) {
          return true;
        }
        return this.checkIsInSelect(node.parentNode);
      },

      initDt () {
        if (!this.model) {
          this.setCurDays(this.today);
        } else {
          try {
            let cDate = this.model;
            if (this.type === 'time') {
              cDate = this.curDate.year + '/' + this.curDate.month + '/' + this.curDate.day + ' ' + cDate;
            }
            this.setCurDays(new Date(cDate));
          } catch (e) {
            console.error('时间格式错误');
          }
        }
        this.changePanel(dtMap[this.type]);
      },
      handleDt (status) {
        this.dtStatus.isOpen = status;
        if (status) {
          this.initDt();
        }
      },
      changePanel (panelType) {
        clearTimeout(this.timeCp);
        this.$set(this.dtStatus, 'canClose', false);
        switch (panelType) {
          case 1:
            this.renerMonthDays(this.curDate.year, this.curDate.month);
            break;
          case 2:
            this.renderMonths(this.curDate.month);
            break;
          case 3:
            this.renderDurationYears(this.curDate.year);
            break;
          case 4:
            break;
        };
        this.dtStatus.panelType = panelType;
        this.timeCp = setTimeout(() => {
          this.$set(this.dtStatus, 'canClose', true);
        }, 500);
      },
      setCurDays (ts) {
        const tsObj = {
          year: ts.getFullYear(),
          month: ts.getMonth() + 1,
          day: ts.getDate(),
          hour: ts.getHours(),
          minute: ts.getMinutes(),
          second: ts.getSeconds()
        };
        this.curDate = tsObj;
      },

      selectDay (num, isDisabled) {
        if (!isDisabled) {
          this.$set(this.curDate, 'day', num);
          this.model = DateUtil.formatDate(this.curDate, this.curFormat);
          this.handleDt(false);
          this.$nextTick(() => {
            this.renerMonthDays(this.curDate.year, this.curDate.month);
          });
        }
      },

      selectYear (num, isDisabled) {
        if (!isDisabled) {
          this.$set(this.curDate, 'year', num);
          this.model = DateUtil.formatDate(this.curDate, this.curFormat);
          this.changePanel(1);
          this.$nextTick(() => {
            this.renerMonthDays(this.curDate.year, this.curDate.month);
          });
        }
      },

      selectMonth (num, isDisabled) {
        if (!isDisabled) {
          this.$set(this.curDate, 'month', num);
          this.model = DateUtil.formatDate(this.curDate, this.curFormat);
          this.changePanel(1);
          this.$nextTick(() => {
            this.renerMonthDays(this.curDate.year, this.curDate.month);
          });
        }
      },

      scrollMonth (type) {
        let nowYear, nowMonth;
        if (type === 'prev') {
          nowYear = this.curDate.month - 1 === 0 ? (this.curDate.year - 1) : this.curDate.year;
          nowMonth = this.curDate.month - 1 === 0 ? 12 : (this.curDate.month - 1);
        }
        if (type === 'next') {
          nowYear = this.curDate.month + 1 > 12 ? (this.curDate.year + 1) : this.curDate.year;
          nowMonth = this.curDate.month + 1 > 12 ? 1 : (this.curDate.month + 1);
        }
        this.$set(this.curDate, 'year', nowYear);
        this.$set(this.curDate, 'month', nowMonth);
        this.renerMonthDays(this.curDate.year, this.curDate.month);
      },

      scrollYear (type) {
        let nowYear = this.curDate.year;
        if (type === 'prev') {
          nowYear = nowYear - 15;
        } else {
          nowYear = nowYear + 15;
        }
        this.$set(this.curDate, 'year', nowYear);
        this.renderDurationYears(this.curDate.year);
      },

      selectHour (hour, isBack) {
        if (hour < 24 && hour >= 0) {
          this.$set(this.curDate, 'hour', hour);
          this.model = DateUtil.formatDate(this.curDate, this.curFormat);
          if (isBack) {
            this.changePanel(4);
          }
        }
      },

      selectMinute (minute, isBack) {
        if (minute < 60 && minute >= 0) {
          this.$set(this.curDate, 'minute', minute);
          this.model = DateUtil.formatDate(this.curDate, this.curFormat);
          if (isBack) {
            this.changePanel(4);
          }
        }
      },

      selectSecond (second, isBack) {
        if (second < 60 && second >= 0) {
          this.$set(this.curDate, 'second', second);
          this.model = DateUtil.formatDate(this.curDate, this.curFormat);
          if (isBack) {
            this.changePanel(4);
          }
        }
      },

      renerMonthDays (year, month) {
        const dayArray = [];
        
        const curMonthNum = DateUtil.getCurMonthDayNum(year, month);
        const prevMonthNum = DateUtil.getCurMonthDayNum((month - 1 === 0 ? year - 1 : year), (month - 1 === 0 ? 12 : month - 1));

        const firstDayWeekNum = DateUtil.getDateWeekNum(year + '/' + month + '/01');
        const lastDayWeekNum = DateUtil.getDateWeekNum(year + '/' + month + '/' + curMonthNum);

        if (firstDayWeekNum !== 0) {
          // for (let i = prevMonthNum; i > prevMonthNum - firstDayWeekNum; i--) {
          //   dayArray.push({
          //     num: i,
          //     disabled: true
          //   });
          // }
          for (let i = prevMonthNum - firstDayWeekNum + 1; i <= prevMonthNum; i++) {
            dayArray.push({
              num: i,
              disabled: true
            });
          }
        }

        for (let i = 1; i <= curMonthNum; i++) {
          const isToday = DateUtil.compare(DateUtil.parseDate(this.today), {
            year: year,
            month: month,
            day: i
          }, 'YYYY-MM-DD');
          const isCurDay = DateUtil.compare(DateUtil.parseDate(new Date(this.model)), {
            year: year,
            month: month,
            day: i
          }, 'YYYY-MM-DD');
          dayArray.push({
            num: i,
            disabled: false,
            today: isToday,
            curDay: isCurDay
          });
        }

        if (lastDayWeekNum !== 6) {
          for (let i = 1; i <= (6 - lastDayWeekNum); i++) {
            dayArray.push({
              num: i,
              disabled: true
            });
          }
        }
        this.days = dayArray;
      },

      renderMonths () {
        const monthArray = [];
        for (let i = 0; i < Lan.month.length; i++) {
          monthArray.push({
            value: Lan.month[i],
            num: i + 1,
            curMonth: (i + 1) === parseInt(DateUtil.parseDate(new Date(this.model)).month)
          });
        }
        this.months = monthArray;
      },

      renderDurationYears (firstYear) {
        const yearArray = [];
        for (let i = firstYear; i <= firstYear + 14; i++) {
          yearArray.push({
            num: i,
            curYear: i === parseInt(DateUtil.parseDate(new Date(this.model)).year)
          });
        }
        this.years = yearArray;
      }
    }
  }
</script>