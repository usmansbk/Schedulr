import SETTINGS from '../../query/Settings';

export default {
  togglePushSound: (_obj, _args, { cache }) => {
    const previous = cache.readQuery({ query: SETTINGS });
    const data = Object.assign({}, {
      settings: Object.assign({}, previous.settings, {
        pushNotification: Object.assign({}, previous.settings.pushNotification, {
          sound: !previous.settings.pushNotification.sound,
        }),
      })
    });
    cache.writeData({ data });
    return data.settings.pushNotification.sound;
  },
  togglePushVibration: (_obj, _args, { cache }) => {
    const previous = cache.readQuery({ query: SETTINGS });
    const data = Object.assign({}, {
      settings: Object.assign({}, previous.settings, {
        pushNotification: Object.assign({}, previous.settings.pushNotification, {
          vibrate: !previous.settings.pushNotification.vibrate,
        }),
      })
    });
    cache.writeData({ data });
    return data.settings.pushNotification.vibrate;
  },
  togglePush: (_obj, _args, { cache }) => {
    const previous = cache.readQuery({ query: SETTINGS });
    const data = Object.assign({}, {
      settings: Object.assign({}, previous.settings, {
        pushNotification: Object.assign({}, previous.settings.pushNotification, {
          push: !previous.settings.pushNotification.push,
        }),
      })
    });
    cache.writeData({ data });
    return data.settings.pushNotification.push;
  },
  toggleReminderSound: (_obj, _args, { cache }) => {
    const previous = cache.readQuery({ query: SETTINGS });
    const data = Object.assign({}, {
      settings: Object.assign({}, previous.settings, {
        reminder: Object.assign({}, previous.settings.reminder, {
          sound: !previous.settings.reminder.sound,
        }),
      })
    });
    cache.writeData({ data });
    return data.settings.reminder.sound;
  },
  toggleEndReminder: (_obj, _args, { cache }) => {
    const previous = cache.readQuery({ query: SETTINGS });
    const data = Object.assign({}, {
      settings: Object.assign({}, previous.settings, {
        reminder: Object.assign({}, previous.settings.reminder, {
          endReminder: !previous.settings.reminder.endReminder,
        }),
      })
    });
    cache.writeData({ data });
    return data.settings.reminder.sound;
  },
  toggleReminderVibration: (_obj, _args, { cache }) => {
    const previous = cache.readQuery({ query: SETTINGS });
    const data = Object.assign({}, {
      settings: Object.assign({}, previous.settings, {
        reminder: Object.assign({}, previous.settings.reminder, {
          vibrate: !previous.settings.reminder.vibrate,
        }),
      })
    });
    cache.writeData({ data });
    return data.settings.reminder.vibrate;
  },
  toggleReminder: (_obj, { key }, { cache }) => {
    const previous = cache.readQuery({ query: SETTINGS });
    const data = Object.assign({}, {
      settings: Object.assign({}, previous.settings, {
        reminder: Object.assign({}, previous.settings.reminder, {
          before: Object.assign({}, previous.settings.reminder.before, {
            [key]: !previous.settings.reminder.before[key],
          })
        })
      })
    });
    cache.writeData({ data });
    return data.settings.reminder.before[key];
  },
}