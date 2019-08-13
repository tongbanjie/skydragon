'use strict';

exports.__esModule = true;
exports.default = {
  months: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  getToday: function getToday() {
    return new Date();
  },
  parseDate: function parseDate(date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
  },
  isLeapYear: function isLeapYear(year) {
    if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {
      return true;
    }
    return false;
  },
  getDateWeekNum: function getDateWeekNum(curDate) {
    var date = new Date(curDate);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var durationDays = 0;
    var weekNum = 0;
    for (var cur = 1; cur < month; cur++) {
      if (cur === 2) {
        durationDays += this.isLeapYear(year) ? 29 : 28;
      } else {
        durationDays += this.months[cur - 1];
      }
    }
    durationDays += day;
    weekNum = (parseInt(year - 1) + parseInt((year - 1) / 4) - parseInt((year - 1) / 100) + parseInt((year - 1) / 400) + durationDays) % 7;
    return weekNum;
  },
  getCurMonthDayNum: function getCurMonthDayNum(year, month) {
    var monthNum = 30;
    if (month === 2) {
      monthNum = this.isLeapYear(year) ? 29 : 28;
    } else {
      monthNum = this.months[month - 1];
    }
    return monthNum;
  },
  compare: function compare(origin, current, format) {
    return this.formatDate(origin, format) === this.formatDate(current, format);
  },
  formatDate: function formatDate(ts, format) {
    var tsObj = {
      YYYY: ts.year,
      MM: ts.month,
      DD: ts.day,
      hh: ts.hour,
      mm: ts.minute,
      ss: ts.second
    };
    var curDate = format;

    for (var key in tsObj) {
      if (tsObj[key] !== undefined) {
        if (key !== 'YYYY' && parseInt(tsObj[key]) < 10) {
          tsObj[key] = '0' + tsObj[key];
        }
        curDate = curDate.replace(key, tsObj[key]);
      }
    }
    return curDate;
  }
};