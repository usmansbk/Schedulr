import PushNotification from 'react-native-push-notification';
import { InteractionManager } from 'react-native';
import moment from 'moment';
import gql from 'graphql-tag';
import client from '../config/client';
import { decapitalize } from '../lib/capitalizr';
import {
  FIVE_MINUTES,
  TEN_MINUTES,
  FIFTEEN_MINUTES,
  THIRTY_MINUTES,
  ONE_HOUR,
  ONE_DAY
} from '../lib/time';
import { userOptions, remindMeBefore as remindMeBeforeQuery } from '../graphql/queries';

const setReminder = (event, before) => {
  const {
    id,
    title,
    startAt,
    eventType,
    repeat,
  } = event;
  const { amount, unit } = before;
  const date = moment(startAt).subtract(amount, unit).toDate();
  const message = `${decapitalize(eventType)} in ${moment(startAt).from(date, true)}`;
  const repeatType = getRepeatType(repeat);
  const repeatTime = {};
  if (repeatType === 'time') {
    repeatTime.repeatTime = getRepeatTime(date.getTime(), repeat);
  }

  const notification = {
    title,
    date,
    message,
    data: JSON.stringify({
      id
    }),
    repeatType,
    ...repeatTime
  };
  PushNotification.localNotificationSchedule(notification);
};

const schdlStart = (event) => {
  const {
    id,
    title,
    startAt,
    eventType,
    repeat,
  } = event;
  const time = moment(startAt).format('hh:mm a');
  const date = moment(startAt).toDate();
  const message = `${decapitalize(eventType)} - ${time}`;
  const repeatType = getRepeatType(repeat);
  const repeatTime = {};
  if (repeatType === 'time') {
    repeatTime.repeatTime = getRepeatTime(date.getTime(), repeat);
  }

  const notification = {
    title,
    date,
    message,
    data: JSON.stringify({
      id
    }),
    repeatType,
    ...repeatTime
  };
  PushNotification.localNotificationSchedule(notification);
};

const schdl = (event, before) => {
  const {
    fiveMin,
    tenMin,
    fifteenMin,
    thirtyMin,
    oneHour,
    oneDay,
  } = before;

  const start = Date.parse(event.startAt);
  const isStarted = (Date.now() > start);
  const isCancelled = event.isCancelled;

  if (!isStarted && !isCancelled) {
    schdlStart(event);
    const distance = start - Date.now();
    if (fiveMin && distance > FIVE_MINUTES) {
      setReminder(event, { amount: 5, unit: 'minutes' });
    }
    
    if (tenMin && distance > TEN_MINUTES) {
      setReminder(event, { amount: 10, unit: 'minutes' });
    }

    if (fifteenMin && distance > FIFTEEN_MINUTES) {
      setReminder(event, { amount: 15, unit: 'minutes' });
    }

    if (thirtyMin && distance > THIRTY_MINUTES) {
      setReminder(event, { amount: 30, unit: 'minutes' });
    }

    if (oneHour && distance > ONE_HOUR) {
      setReminder(event, { amount: 1, unit: 'hour' });
    }

    if (oneDay && distance > ONE_DAY) {
      setReminder(event, { amount: 1, unit: 'day' });
    }
  }
};

const schdlAll = (events) => {
  InteractionManager.runAfterInteractions(() => {
    PushNotification.cancelAllLocalNotifications();
    const { options={} } = client.readQuery({ query: gql(userOptions)}) || {};
    const { remindMeBefore={} } = client.readQuery({ query: gql(remindMeBeforeQuery) }) || {};
    if (!options.muteReminder) {
      events.forEach((event) => {
        schdl(event, remindMeBefore);
      });
    }
  });
};

function getRepeatType(repeat) {
  switch(repeat) {
    case 'DAILY': return 'day';
    case 'WEEKLY': return 'week';
    default: return 'time';
  }
}

function getRepeatTime(milliseconds, repeat) {
  let interval;
  switch(repeat) {
    case 'MONTHLY':
      interval = moment(milliseconds).add(1, 'month');
      break;
    case 'YEARLY':
      interval = moment(milliseconds).add(1, 'year');
      break;
    default:
      interval = moment(milliseconds).add(15, 'minutes');
      break; 
  }
  return interval.toDate().getTime();
}

export default schdlAll;