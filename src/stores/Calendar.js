import RNCalendarEvents from 'react-native-calendar-events';
import {observable, action} from 'mobx';
import {persist} from 'mobx-persist';
import {startOf, endOf, toISOString, date, getMonth} from 'lib/date';
import logger from 'config/logger';

export default class Calendar {
  @persist('list') @observable calendars = [];
  @persist('list') @observable events = [];
  @persist('list') @observable allCalendars = [];

  @action sync = async () => {
    const isAuthorized = await this.isAuthorized();
    if (isAuthorized) {
      await this.fetchEvents();
    }
  };

  @action removeEvent = async (id) => {
    try {
      await RNCalendarEvents.removeEvent(id, {futureEvents: true});
    } catch (e) {
      logger.logError(e);
    }
    this.events = this.events.filter((e) => e.id !== id);
  };

  isAuthorized = async () => {
    try {
      const granted = await RNCalendarEvents.checkPermissions();
      return granted === 'authorized';
    } catch (e) {
      return false;
    }
  };

  includes = (id) => {
    const cal = this.calendars.find((cal) => cal.id === id);
    return Boolean(cal);
  };

  @action toggleCalendar = (calendar) => {
    const cal = this.calendars.find((cal) => cal.id === calendar.id);
    if (cal) {
      this.calendars = this.calendars.filter((cal) => cal.id !== calendar.id);
    } else {
      this.calendars = [...this.calendars, calendar];
    }
  };

  @action authorize = async () => {
    const granted = await RNCalendarEvents.requestPermissions();
    if (granted === 'authorized') {
      this.allCalendars = await RNCalendarEvents.findCalendars();
    }
  };

  transformEvent = (event) => {
    const startAt = toISOString(event.startDate);
    let endAt;
    if (event.allDay) {
      endAt = toISOString(endOf(event.startDate, 'day'));
    } else {
      endAt = toISOString(event.endDate);
    }
    const recurrenceRule = event.recurrenceRule;
    const recurrence = getRecurrence(recurrenceRule);
    return {
      id: event.id,
      schedule: {
        id: event.calendar.id,
        name: event.calendar.title,
      },
      startAt,
      endAt,
      allDay: event.allDay,
      title: event.title,
      recurrence,
      forever: recurrence !== 'NEVER',
      category: '',
      description: event.description,
      venue: event.location,
      __typename: 'Calendar',
      author: {
        id: event.calendar.source,
        name: event.calendar.source,
      },
    };
  };

  @action findEventById = (id) => {
    const event = this.events.find((e) => e.id === id);
    if (!event) return null;
    return this.transformEvent(event);
  };

  @action reset = () => {
    this.calendars = [];
    this.events = [];
  };

  @action fetchEvents = async () => {
    try {
      if (this.calendars.length) {
        const m = startOf(date(), 'day');
        const month = getMonth(m);
        const startDate = toISOString(m);
        let endDate;
        if (month === 11) {
          endDate = toISOString(add(m, 1, 'year'));
        } else {
          endDate = toISOString(endOf(m, 'year'));
        }
        let all = await RNCalendarEvents.fetchAllEvents(
          startDate,
          endDate,
          this.calendars.map((cal) => cal.id),
        );
        const map = {};
        // calendar returns individual recurring event
        // which may lead to perf issue
        all.forEach((e) => (map[e.id] = e)); // remove duplicates
        this.events = Object.values(map);
        // this.events = all.slice(0, 100);
      } else {
        this.reset();
      }
    } catch (e) {
      logger.logError(e);
    }
  };

  get transform() {
    return this.events.map(this.transformEvent);
  }
}

function getRecurrence(rule = {}) {
  const frequency = rule.frequency;
  switch (frequency) {
    case 'daily':
    case 'day':
      return 'DAILY';
    case 'weekly':
    case 'week':
      return 'WEEKLY';
    case 'weekday':
    case 'workday':
      return 'WEEKDAYS';
    case 'monthly':
    case 'month':
      return 'MONTHLY';
    case 'yearly':
    case 'year':
      return 'YEARLY';
    default:
      return 'NEVER';
  }
}
