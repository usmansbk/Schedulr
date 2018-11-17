export default {
  settings: {
    __typename: 'Settings',
    reminder: {
      __typename: 'Reminder',
      vibrate: true,
      sound: true,
      endReminder: false,
      before: {
        __typename: 'Before',
        fiveMin: false,
        tenMin: true,
        fifteenMin: false,
        thirtyMin: false,
        fortyFiveMin: false,
        oneHour: true,
        oneDay: false,
      }
    },
    pushNotification: {
      __typename: 'PushNotification',
      push: true,
      vibrate: true,
      sound: true,
    },
  },
}