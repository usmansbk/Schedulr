export default {
  me: null,
  options: {
    __typename: 'AppOptions',
    headsUp: false,
    starredAlarm: false,
    muteReminder: false,
  },
  remindMeBefore: {
    __typename: 'RemindMeBefore',
    fiveMin: true,
    tenMin: false,
    fifteenMin: false,
    thirtyMin: false,
    oneHour: false,
    oneDay: false
  }
};