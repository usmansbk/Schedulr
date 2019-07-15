import moment from 'moment';

const intervals = ["DAILY", "WEEKDAYS", "WEEKLY", "MONTHLY", "MONTHLY_DAY", "YEARLY"];

export const filterEvents = {
  "expression":  "#endAt >= :startOfDay OR ( (#repeat IN (:intervals) AND #untilAt >= :startOfDay) OR #forever = :forever ) AND #isCancelled = :isCancelled",
  "expressionNames": JSON.stringify({
    "#endAt"       : "endAt",
    "#repeat"      : "repeat",
    "#untilAt"     : "untilAt",
    "#forever"     : "forever",
    "#isCancelled" : "isCancelled"
  }),
  "expressionValues" :  JSON.stringify({
    ":startOfDay"    : moment().startOf('D').valueOf(),
    ":intervals"     : `${intervals}`,
    ":forever"       : true,
    ":isCancelled"   : false
  })
};

export const filterPastEvents = (date) => ({
  "expression": "#endAt < :startOfDay OR #isCancelled = :isCancelled",
  "expressionNames": JSON.stringify({
    "endAt"        : "endAt",
    "#isCancelled" : "isCancelled"
  }),
  "expressionValues" : JSON.stringify({
    ":isCancelled"   : true,
    ":startOfDay"    : moment(date).startOf('D').valueOf()
  })
});