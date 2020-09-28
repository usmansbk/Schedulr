import {observable, action} from 'mobx';
import {persist} from 'mobx-persist';
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
import colors from 'config/colors';
const color = colors.primary;

const CHANNEL_ID = 'default-channel-id';

export default class RemindMe {
  @persist @observable fiveMin = true;
  @persist @observable tenMin = false;
  @persist @observable fifteenMin = false;
  @persist @observable thirtyMin = false;
  @persist @observable oneHour = false;
  @persist @observable oneDay = false;
  @observable extraData = 0;

  @action toggle(key) {
    this[key] = !this[key];
    this.extraData += 1;
  }

  @action reset() {
    this.fiveMin = true;
    this.tenMin = false;
    this.fifteenMin = false;
    this.thirtyMin = false;
    this.thirtyMin = false;
    this.oneHour = false;
    this.oneDay = false;
  }

  constructor(settings, appState) {
    this.settings = settings;
    this.appState = appState;

    PushNotification.createChannel(
      {
        channelId: CHANNEL_ID,
        channelName: 'Default channel',
        channelDescription: 'A default channel',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      // (created) => console.log('default-channel-id', created),
    );
  }

  setReminder = (event, before) => {
    const {id, title, startAt, endAt, category, recurrence} = event;
    const {amount, unit} = before;
    const {sound, vibrate} = this.settings;
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
      channelId: CHANNEL_ID,
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

  setStartOnly = (event) => {
    const {id, title, startAt, endAt, category, recurrence, __typename} = event;
    const {sound, vibrate} = this.settings;
    const time = format(startAt, 'hh:mm a');
    const date = toDate(startAt);
    const message = decapitalize(`${category ? category + ' - ' : ''}${time}`);
    const repeatType = getRepeatType(recurrence);
    const repeatTime = {};
    if (repeatType === 'time') {
      repeatTime.repeatTime = getRepeatTime(date.getTime(), recurrence);
    }
    const notification = {
      channelId: CHANNEL_ID,
      title,
      date,
      color,
      message,
      playSound: sound,
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

  setReminders = (event) => {
    const start = event.startAt;
    const isStarted = greaterThan(date(), start);

    if (!isStarted) {
      this.setStartOnly(event);
      const distance = valueOf(start) - now();
      if (this.fiveMin && distance > FIVE_MINUTES) {
        this.setReminder(event, {amount: 5, unit: 'minutes'});
      }

      if (this.tenMin && distance > TEN_MINUTES) {
        this.setReminder(event, {amount: 10, unit: 'minutes'});
      }

      if (this.fifteenMin && distance > FIFTEEN_MINUTES) {
        this.setReminder(event, {amount: 15, unit: 'minutes'});
      }

      if (this.thirtyMin && distance > THIRTY_MINUTES) {
        this.setReminder(event, {amount: 30, unit: 'minutes'});
      }

      if (this.oneHour && distance > ONE_HOUR) {
        this.setReminder(event, {amount: 1, unit: 'hour'});
      }

      if (this.oneDay && distance > ONE_DAY) {
        this.setReminder(event, {amount: 1, unit: 'day'});
      }
    }
  };

  setMultiple = (events) => {
    const {mutedEvents = [], allowedEvents = []} = this.appState;
    InteractionManager.runAfterInteractions(() => {
      PushNotification.cancelAllLocalNotifications();
      const settings = this.settings;
      if (!settings.disableReminders) {
        events.forEach((event) => {
          const id = event.id;
          const scheduleId = event.schedule && event.schedule.id;
          const isMuted =
            mutedEvents.includes(id) ||
            (scheduleId && mutedEvents.includes(scheduleId));
          const isAllowed = allowedEvents.includes(id);
          if (
            (!isAllowed && isMuted) ||
            (settings.bookmarkedEventsOnly && !event.isBookmarked)
          )
            return;
          switch (event.recurrence) {
            case 'WEEKDAYS':
              this.setWeekdays(event);
              break;
            default:
              this.setReminders(event);
              break;
          }
          return;
        });
      }
    });
  };

  setWeekdays = (event) => {
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
      this.setReminders(nextEvent);
    });
  };
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

function getReminderMessage({category, startAt, date}) {
  const validCategory = category ? category + ' ' : '';
  return decapitalize(`${validCategory}${from(startAt, date)}`);
}
