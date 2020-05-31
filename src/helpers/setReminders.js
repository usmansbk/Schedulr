import PushNotification from 'react-native-push-notification';
import { InteractionManager } from 'react-native';
import moment from 'moment';
import 'twix';
import { decapitalize } from 'lib/utils';
import {
  FIVE_MINUTES,
  TEN_MINUTES,
  FIFTEEN_MINUTES,
  THIRTY_MINUTES,
  ONE_HOUR,
  ONE_DAY,
  getWeekdays,
} from 'lib/time';
import stores from 'stores';
import colors from 'config/colors';

const color = colors.primary;

function getReminderMessage({ category, startAt, date }) {
  const validCategory = category ? category + ' ' : '';
  return decapitalize(`${validCategory}${moment(startAt).from(date)}`);
}

const setReminder = (event, before, settings) => {
  const {
    id,
    title,
    startAt,
    endAt,
    category,
    recurrence,
  } = event;
  const { amount, unit } = before;
  const { sound, vibrate } = settings;
  const date = moment(startAt).subtract(amount, unit).toDate();
  const message = getReminderMessage({
    category,
    startAt,
    date
  });
  const repeatType = getRepeatType(recurrence);
  const repeatTime = {};
  if (repeatType === 'time') {
    repeatTime.repeatTime = getRepeatTime(date.getTime(), recurrence);
  }

  const notification = {
    title,
    date,
    message,
    color,
    playSound: sound,
    vibrate,
    tag: 'local',
    group: id,
    data: JSON.stringify({
      id,
      startAt,
      endAt,
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
    endAt,
    category,
    recurrence,
    __typename
  } = event;
  const { sound, vibrate } = settings;
  const time = moment(startAt).format('hh:mm a');
  const date = moment(startAt).toDate();
  const message = decapitalize(`${category ? category + ' - ' : ''}${time}`);
  const repeatType = getRepeatType(recurrence);
  const repeatTime = {};
  if (repeatType === 'time') {
    repeatTime.repeatTime = getRepeatTime(date.getTime(), recurrence);
  }
  const notification = {
    title,
    date,
    color,
    message,
    playSound: sound,
    soundName: 'notification_sound.mp3',
    vibrate,
    tag: 'local',
    group: id,
    data: JSON.stringify({
      id,
      startAt,
      endAt,
      __typename
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

  const start = event.startAt;
  const isStarted = (moment() > moment(start));

  if (!isStarted) {
    schdlStart(event, settings);
    const distance = moment(start).valueOf() - moment.now();
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

const schdlAll = (events, mutedList, allowedList) => {
  InteractionManager.runAfterInteractions(() => {
    PushNotification.cancelAllLocalNotifications();
    const settings = stores.settingsStore;
    const remindMeBefore = stores.remindMeStore;
    if (!settings.disableReminders) {
      events.forEach((event) => {
        const id = event.id;
        const scheduleId = event.schedule && event.schedule.id;
        const isMuted = mutedList.includes(id) || (scheduleId && mutedList.includes(scheduleId));
        const isAllowed = allowedList.includes(id);
        if (!isAllowed && isMuted || (settings.bookmarkedEventsOnly && !event.isBookmarked)) return;
        switch (event.recurrence) {
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
  const duration = Math.abs(moment.duration(start.diff(end, null, true)));
  
  const hour = start.hour();
  const minute = start.minute();
  const second = start.second();

  const days = getWeekdays();
  days.forEach(date=> {
    const startAt = date.clone().hour(hour).minute(minute).second(second);
    const endAt = startAt.clone().add(duration);

    const nextEvent = Object.assign({}, event, {
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString()
    });
    schdl(nextEvent, remindMeBefore, settings);
  });
}

function getRepeatType(recurrence) {
  switch(recurrence) {
    case 'NEVER': return null;
    case 'DAILY': return 'day';
    case 'WEEKLY': case 'WEEKDAYS':  return 'week';
    default: return 'time';
  }
}

function getRepeatTime(ms, recurrence) {
  let interval;
  switch(recurrence) {
    case 'MONTHLY':
      interval = moment(ms).add(1, 'month');
      break;
    case 'YEARLY':
      interval = moment(ms).add(1, 'year');
      break;
    default:
      interval = moment(ms).add(15, 'minutes');
      break; 
  }
  return interval.toDate().getTime();
}

export default schdlAll;