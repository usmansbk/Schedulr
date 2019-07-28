import moment from 'moment';

export const filterEvents = {
  "expression":  "#endAt >= :startOfDay OR ( #repeat IN (:daily, :weekdays, :weekly, :monthly, :yearly) AND (#untilAt >= :startOfDay OR #forever = :forever))",
  "expressionNames": JSON.stringify({
    "#endAt"       : "endAt",
    "#repeat"      : "repeat",
    "#untilAt"     : "until",
    "#forever"     : "forever"
  }),
  "expressionValues" :  JSON.stringify({
    ":startOfDay"    : moment().startOf('day').valueOf(),
    ":forever"       : true,
    ":daily": "DAILY",
    ":weekdays": "WEEKDAYS",
    ":weekly": "WEEKLY",
    ":monthly": "MONTHLY",
    ":yearly": "YEARLY"
  })
};

export const filterPastEvents = (date) => ({
  "expression": "#endAt < :startOfDay AND (#repeat = :never OR (#repeat IN (:daily, :weekdays, :weekly, :monthly, :yearly) AND #untilAt < :startOfDay ) )",
  "expressionNames": JSON.stringify({
    "#endAt"        : "endAt",
    "#repeat"       : "repeat",
    "#untilAt"      : "until"
  }),
  "expressionValues" : JSON.stringify({
    ":startOfDay"    : moment(date).startOf('day').valueOf(),
    ":never": "NEVER",
    ":daily": "DAILY",
    ":weekdays": "WEEKDAYS",
    ":weekly": "WEEKLY",
    ":monthly": "MONTHLY",
    ":yearly": "YEARLY"
  })
});