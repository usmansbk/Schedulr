import moment from 'moment';

const intervals = ["DAILY", "WEEKDAYS", "WEEKLY", "MONTHLY", "MONTHLY_DAY", "YEARLY"];

export const filterEvents = {
  "expression":  "#endAt >= :startOfDay OR ( #repeat IN (:intervals) AND (#untilAt >= :startOfDay OR #forever = :forever) AND #startAt >= :startOfDay )",
  "expressionNames": JSON.stringify({
    "#endAt"       : "endAt",
    "#startAt"     : "startAt",
    "#repeat"      : "repeat",
    "#untilAt"     : "until",
    "#forever"     : "forever"
  }),
  "expressionValues" :  JSON.stringify({
    ":startOfDay"    : moment().startOf('day').valueOf(),
    ":intervals"     : `${intervals}`,
    ":forever"       : true
  })
};

export const filterPastEvents = (date) => ({
  "expression": "#startAt < :startOfDay",
  "expressionNames": JSON.stringify({
    "#startAt"        : "startAt"
  }),
  "expressionValues" : JSON.stringify({
    ":startOfDay"    : moment(date).startOf('day').valueOf()
  })
});