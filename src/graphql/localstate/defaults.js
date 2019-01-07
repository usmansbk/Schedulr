export default {
  me: null,
  options: {
    __typename: 'Options',
    headsUp: false,
    starredAlarm: false,
    eventEnded: false,
    muteReminder: false,
  },
  remindMe: {
    __typename: 'RemindMe',
    fiveMin: true,
    tenMin: false,
    fifteenMin: false,
    thirtyMin: false,
    fortyFiveMin: false,
    oneHour: false,
    oneDay: false
  }
};