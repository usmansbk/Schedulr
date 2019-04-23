import PushNotification from 'react-native-push-notification';
import { InteractionManager } from 'react-native';
import moment from 'moment';
import 'moment-recur';
import 'twix';
import business from 'moment-business';
import { decapitalize } from 'lib/capitalizr';
import {
  FIVE_MINUTES,
  TEN_MINUTES,
  FIFTEEN_MINUTES,
  THIRTY_MINUTES,
  ONE_HOUR,
  ONE_DAY
} from 'lib/time';
import { weekdays } from 'lib/calendr';
import stores from 'stores';
import colors from 'config/colors';

const color = colors.primary_light;

const setReminder = (event, before, settings) => {
  const {
    id,
    title,
    startAt,
    eventType,
    repeat,
  } = event;
  const { amount, unit } = before;
  const { sound, vibrate } = settings;
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
    color,
    playSound: sound,
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
    color,
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
    const settings = stores.settingsStore;
    const remindMeBefore = stores.remindMeStore;
    if (!settings.disableReminders) {
      events.forEach((event) => {
        if (settings.starredEventsOnly && !event.isStarred) return;
        switch (event.repeat) {
          case 'MONTH_DAY':
            break;
          case 'WEEKDAYS':
            schdlWeekdaysEvent(event, remindMeBefore, settings);
            break;
          default:
            schdl(event, remindMeBefore, settings);
            break;
        }
        return;
      });
    }
  });
};

function schdlWeekdaysEvent(event, remindMeBefore, settings) {
  const start = moment(event.startAt);
  const end = moment(event.endAt);
  // const duration = Math.abs(moment.duration(start.diff(end)));
  const recurrence = start.recur(end).every(weekdays).daysOfWeek(); // Exclusive operation
  const days = recurrence.next(5);
  days.forEach(nextDay => {
    const nextEvent = Object.assign({}, event, {
      startAt: nextDay.toISOString(),
      // endAt: day.add(duration).toISOString()
    });
    schdl(nextEvent, remindMeBefore, settings);
  });

  // 
  const isWeekday = business.isWeekDay(start);
  const isToday = start.isSame(moment(), 'day');
  const isPending = start.twix(end).isFuture();

  if (isWeekday && isToday && isPending) {
    const todayEvent = Object.assign({}, event, {
      repeat: 'NEVER'
    });
    schdl(todayEvent, remindMeBefore, settings);
  }
}

function getRepeatType(repeat) {
  switch(repeat) {
    case 'NEVER': return null;
    case 'DAILY': return 'day';
    case 'WEEKLY': case 'WEEKDAYS':  return 'week';
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