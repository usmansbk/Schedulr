import PushNotification from 'react-native-push-notification';
import {InteractionManager} from 'react-native';
import {decapitalize} from 'lib/utils';
import {
  from,
  subtract,
  toDate,
  format,
  now,
  valueOf,
  greaterThan,
  date,
  add,
  addDuration,
  diffDuration,
  getDuration,
  getTime,
  setTime,
  toISOString,
} from 'lib/date';
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

function getReminderMessage({category, startAt, date}) {
  const validCategory = category ? category + ' ' : '';
  return decapitalize(`${validCategory}${from(startAt, date)}`);
}

const setReminder = (event, before, settings) => {
  const {id, title, startAt, endAt, category, recurrence} = event;
  const {amount, unit} = before;
  const {sound, vibrate} = settings;
  const date = toDate(subtract(startAt, amount, unit));
  const message = getReminderMessage({
    category,
    startAt,
    date,
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
    allowWhileIdle: true,
    ...repeatTime,
  };
  PushNotification.localNotificationSchedule(notification);
};

const schdlStart = (event, settings) => {
  const {id, title, startAt, endAt, category, recurrence, __typename} = event;
  const {sound, vibrate} = settings;
  const time = format(startAt, 'hh:mm a');
  const date = toDate(startAt);
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
      __typename,
    }),
    repeatType,
    allowWhileIdle: true,
    ...repeatTime,
  };
  PushNotification.localNotificationSchedule(notification);
};

const schdl = (event, before, settings) => {
  const {fiveMin, tenMin, fifteenMin, thirtyMin, oneHour, oneDay} = before;

  const start = event.startAt;
  const isStarted = greaterThan(date(), start);

  if (!isStarted) {
    schdlStart(event, settings);
    const distance = valueOf(start) - now();
    if (fiveMin && distance > FIVE_MINUTES) {
      setReminder(event, {amount: 5, unit: 'minutes'}, settings);
    }

    if (tenMin && distance > TEN_MINUTES) {
      setReminder(event, {amount: 10, unit: 'minutes'}, settings);
    }

    if (fifteenMin && distance > FIFTEEN_MINUTES) {
      setReminder(event, {amount: 15, unit: 'minutes'}, settings);
    }

    if (thirtyMin && distance > THIRTY_MINUTES) {
      setReminder(event, {amount: 30, unit: 'minutes'}, settings);
    }

    if (oneHour && distance > ONE_HOUR) {
      setReminder(event, {amount: 1, unit: 'hour'}, settings);
    }

    if (oneDay && distance > ONE_DAY) {
      setReminder(event, {amount: 1, unit: 'day'}, settings);
    }
  }
};

const schdlAll = (events, mutedList, allowedList) => {
  InteractionManager.runAfterInteractions(() => {
    PushNotification.cancelAllLocalNotifications();
    const settings = stores.settings;
    const remindMeBefore = stores.reminder;
    if (!settings.disableReminders) {
      events.forEach((event) => {
        const id = event.id;
        const scheduleId = event.schedule && event.schedule.id;
        const isMuted =
          mutedList.includes(id) ||
          (scheduleId && mutedList.includes(scheduleId));
        const isAllowed = allowedList.includes(id);
        if (
          (!isAllowed && isMuted) ||
          (settings.bookmarkedEventsOnly && !event.isBookmarked)
        )
          return;
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
  const duration = Math.abs(
    getDuration(diffDuration(event.startAt, event.endAt)),
  );

  const {hour, minute, second} = getTime(event.startAt);

  const days = getWeekdays();
  days.forEach((date) => {
    const startAt = setTime(date, {hour, minute, second});
    const endAt = addDuration(startAt, duration);

    const nextEvent = Object.assign({}, event, {
      startAt: toISOString(startAt),
      endAt: toISOString(endAt),
    });
    schdl(nextEvent, remindMeBefore, settings);
  });
}

function getRepeatType(recurrence) {
  switch (recurrence) {
    case 'NEVER':
      return null;
    case 'DAILY':
      return 'day';
    case 'WEEKLY':
    case 'WEEKDAYS':
      return 'week';
    default:
      return 'time';
  }
}

function getRepeatTime(ms, recurrence) {
  let interval;
  switch (recurrence) {
    case 'MONTHLY':
      interval = add(ms, 1, 'month');
      break;
    case 'YEARLY':
      interval = add(ms, 1, 'year');
      break;
    default:
      interval = add(ms, 15, 'minutes');
      break;
  }
  return toDate(interval).getTime();
}

export default schdlAll;
