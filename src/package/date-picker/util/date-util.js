export default {
  months: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  getToday () {
    return new Date();
  },

  parseDate (date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
  },

  isLeapYear (year) {
    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
      return true;
    }
    return false;
  },

  getDateWeekNum (curDate) {
    const date = new Date(curDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let durationDays = 0;
    let weekNum = 0;
    for (let cur = 1; cur < month; cur++) {
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

  getCurMonthDayNum (year, month) {
    let monthNum = 30;
    if (month === 2) {
      monthNum = (this.isLeapYear(year) ? 29 : 28);
    } else {
      monthNum = this.months[month - 1];
    }
    return monthNum;
  },

  compare (origin, current, format) {
    return this.formatDate(origin, format) === this.formatDate(current, format);
  },

  formatDate (ts, format) {
    const tsObj = {
      YYYY: ts.year,
      MM: ts.month,
      DD: ts.day,
      hh: ts.hour,
      mm: ts.minute,
      ss: ts.second
    };
    let curDate = format;

    for (const key in tsObj) {
      if (tsObj[key] !== undefined) {
        if (key !== 'YYYY' && parseInt(tsObj[key]) < 10) {
          tsObj[key] = '0' + tsObj[key];
        }
        curDate = curDate.replace(key, tsObj[key]);
      }
    }
    return curDate;
  }
}