import gql from 'graphql-tag';

export default gql`
  {
    settings @client {
      reminder {
        vibrate
        sound
        endReminder
        before {
          fiveMin
          tenMin
          fifteenMin
          thirtyMin
          fortyFiveMin
          oneHour
          oneDay
        }
      }
      pushNotification {
        vibrate
        sound
        push
      }
    }
  }
`