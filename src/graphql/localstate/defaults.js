const defaults = {
  me: null,
  settings: {
    __typename: 'Settings',
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

export default defaults;