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
import { Settings, RemindMeBefore } from '../graphql/queries';

const setReminder = (event, before, settings) => {
  const {
    id,
    title,
    startAt,
    eventType,
    repeat,
  } = event;
  const { amount, unit } = before;
  const { playSound, vibrate } = settings;
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
    playSound,
    vibrate,
    data: JSON.stringify({
      id
    }),
    repeatType,
    ...repeatTime
  };
  PushNotification.localNotificationSchedule(notification);
};

const schdlStart = (event, settings) => {
  const {
    id,
    title,
    startAt,
    eventType,
    repeat,
  } = event;
  const { playSound, vibrate } = settings;
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
    playSound,
    vibrate,
    data: JSON.stringify({
      id
    }),
    repeatType,
    ...repeatTime
  };
  PushNotification.localNotificationSchedule(notification);
};

const schdl = (event, before, settings) => {
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
    schdlStart(event, settings);
    const distance = start - Date.now();
    if (fiveMin && distance > FIVE_MINUTES) {
      setReminder(event, { amount: 5, unit: 'minutes' }, settings);
    }
    
    if (tenMin && distance > TEN_MINUTES) {
      setReminder(event, { amount: 10, unit: 'minutes' }, settings);
    }

    if (fifteenMin && distance > FIFTEEN_MINUTES) {
      setReminder(event, { amount: 15, unit: 'minutes' }, settings);
    }

    if (thirtyMin && distance > THIRTY_MINUTES) {
      setReminder(event, { amount: 30, unit: 'minutes' }, settings);
    }

    if (oneHour && distance > ONE_HOUR) {
      setReminder(event, { amount: 1, unit: 'hour' }, settings);
    }

    if (oneDay && distance > ONE_DAY) {
      setReminder(event, { amount: 1, unit: 'day' }, settings);
    }
  }
};

const schdlAll = (events) => {
  InteractionManager.runAfterInteractions(() => {
    PushNotification.cancelAllLocalNotifications();
    const { settings={} } = client.readQuery({ query: gql(Settings)}) || {};
    const { remindMeBefore={} } = client.readQuery({ query: gql(RemindMeBefore) }) || {};
    if (!settings.muteReminder) {
      events.forEach((event) => {
        schdl(event, remindMeBefore, settings);
      });
    }
  });
};

function getRepeatType(repeat) {
  switch(repeat) {
    case 'DAILY': case 'WEEKDAY': return 'day';
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