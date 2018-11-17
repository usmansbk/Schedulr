import { InteractionManager } from 'react-native';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import { decapitalize } from './capitalizr';
import resetNotifications from './notifications';
import client from '../config/apolloClient';
import getRepeatType, {
  getRepeatTime,
  FIVE_MINUTES,
  TEN_MINUTES,
  FIFTEEN_MINUTES,
  THIRTY_MINUTES,
  FORTY_FIVE_MINUTES,
  ONE_HOUR,
  ONE_DAY
} from './time';
import SETTINGS from '../graphql/localState/query/Settings';

const setReminder = (event, amount, unit, { sound, vibrate }) => {
  const start = Date.parse(event.start);
  const date = moment(start).subtract(amount, unit).toDate();
  const repeatType = getRepeatType(event);
  const recur = {};
  if (repeatType === 'time') {
    recur.repeatTime = getRepeatTime(date.getTime(), event.repeat);
  }
  const notificationObject = {
    title: `${event.name}`,
    message: `${decapitalize(event.eventType)} in ${moment(start).from(date, true)}`,
    data: JSON.stringify(event),
    playSound: sound,
    vibrate,
    tag: event.id,
    date,
    repeatType,
    ...recur, 
  };
  PushNotification.localNotificationSchedule(notificationObject);
}

const schdlStart = (event, { sound, vibrate }) => {
  const repeatType = getRepeatType(event);
  const recur = {};
  if (repeatType === 'time') {
    recur.repeatTime = getRepeatTime(Date.parse(event.start), event.repeat);
  }
  const time = moment(event.start).format('hh:mm a');
  const message =  `${decapitalize(event.eventType)}${event.eventType === 'HAPPENING' ? '' : ' started'} ${time}`
  const notificationObject = {
    title: `${event.name}`,
    message,
    data: JSON.stringify(event),
    date: new Date(Date.parse(event.start)),
    playSound: sound,
    vibrate,
    tag: event.id,
    repeatType,
    ...recur
  };
  PushNotification.localNotificationSchedule(notificationObject);
};

const schdlEnd = (event, { sound, vibrate }) => {
  const repeatType = getRepeatType(event);
  const recur = {};
  if (repeatType === 'time') {
    recur.repeatTime = getRepeatTime(Date.parse(event.end), event.repeat);
  }
  const notificationObject = {
    title: `${event.name}`,
    message: `${event.eventType === 'HAPPENING' ? '' : decapitalize(event.eventType)} ending now.`,
    data: JSON.stringify(event),
    date: new Date(Date.parse(event.end)),
    group: event.id,
    vibrate,
    tag: event.id,
    playSound: sound,
    repeatType,
    ...recur
  };
  PushNotification.localNotificationSchedule(notificationObject);
}

export const schdl = (event, options, before) => {
  const {
    fiveMin,
    tenMin,
    fifteenMin,
    thirtyMin,
    fortyFiveMin,
    oneHour,
    oneDay,
  } = before;
  const endReminder = options.endReminder;

  const start = Date.parse(event.start);
  const end = Date.parse(event.end);
  const isEnded = (Date.now() - end) > 0;
  const isStarted = (Date.now() - start) > 0;
  const isCancelled = event.isCancelled;

  if (event.isMember && !isStarted && !isCancelled) {
    schdlStart(event, {...options, type: 'start' });
    const distance = start - Date.now();
    if (fiveMin && distance > FIVE_MINUTES) {
      setReminder(event, 5, 'minutes', { ...options, type: 'fiveMin' });
    }
    
    if (tenMin && distance > TEN_MINUTES) {
      setReminder(event, 10, 'minutes', { ...options, type: 'tenMin' });
    }

    if (fifteenMin && distance > FIFTEEN_MINUTES) {
      setReminder(event, 15, 'minutes', { ...options, type: 'fifteenMin' });
    }

    if (thirtyMin && distance > THIRTY_MINUTES) {
      setReminder(event, 30, 'minutes', { ...options, type: 'thirtyMin' });
    }

    if (fortyFiveMin && distance > FORTY_FIVE_MINUTES) {
      setReminder(event, 45, 'minutes', { ...options, type: 'fortyFiveMin' });
    }

    if (oneHour && distance > ONE_HOUR) {
      setReminder(event, 1, 'hour', { ...options, type: 'oneHour' });
    }

    if (oneDay && distance > ONE_DAY) {
      setReminder(event, 1, 'day', { ...options, type: 'oneDay' });
    }
  }
  if (endReminder && !isEnded && !isCancelled) {
    schdlEnd(event, { ...options, type: 'end' });
  }
}

const schdlAll = (edges) => {
  InteractionManager.runAfterInteractions(() => {
    resetNotifications();
    const data = client.readQuery({ query: SETTINGS });
    const { settings: { reminder } } = data;
    const { before } = reminder;

    edges.forEach((edge) => {
      const event = edge.node;
      schdl(event, reminder, before);
    })
  })
}

export default schdlAll;