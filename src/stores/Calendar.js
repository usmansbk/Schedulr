import RNCalendarEvents from 'react-native-calendar-events';
import { observable, action } from 'mobx';
import moment from 'moment';
import { persist } from 'mobx-persist';
import logger from 'config/logger';

export default class Calendar {
  @persist('list') @observable calendars = [];
  @persist('list') @observable events = [];

  isAuthorized = async () => {
    try {
      const granted = await RNCalendarEvents.authorizationStatus();
      return granted === 'authorized';
    } catch(e) {
      return false;
    }
  };

  includes = id => {
    const cal = this.calendars.find(cal => cal.id === id);
    return Boolean(cal);
  };

  @action toggleCalendar = (calendar) => {
    const cal = this.calendars.find(cal => cal.id === calendar.id);
    if (cal) {
      this.calendars = this.calendars.filter(cal => cal.id !== calendar.id);
    } else {
      this.calendars = [...this.calendars, calendar];
    }
  };

  @action authorize = async () => {
    try {
      const granted = await RNCalendarEvents.authorizeEventStore();
      return granted === 'authorized';
    } catch(e) {
      return false;
    }
  };

  @action findEventById = id => {
    const event = this.events.find(e => e.id === id);
    return event;
  };

  @action findCalendars = async () => {
    try {
      let isAuth = await this.authorize();
      if (isAuth) {
        const cals = await RNCalendarEvents.findCalendars();
        return cals;
      }
    } catch(e) {
      return [];
    }
  };

  @action reset = () => {
    this.calendars = [];
    this.events = [];
  };

  @action fetchEvents = async () => {
    try {
      const m = moment();
      const startDate = m.toDate().toISOString();
      const endDate = m.clone().add(1, 'year').toDate().toISOString();
      this.events = await RNCalendarEvents.fetchAllEvents(startDate, endDate, this.calendars.map(cal => cal.id));
    } catch(e) {
      logger.logError(e);
    }
  };

  get transform() {
    return this.events.map(event => {
      const startAt = moment(event.startDate).toISOString();
      let endAt;
      if (event.allDay) {
        endAt = moment(event.startDate).endOf('D').toISOString();
      } else {
        endAt = moment(event.endDate).toISOString();
      }
      return ({
        id: event.id,
        schedule: {
          id: event.calendar.id,
          name: event.calendar.title,
        },
        startAt,
        endAt,
        allDay: event.allDay,
        title: event.title,
        recurrence: 'NEVER',
        category: '',
        description: event.description,
        venue: event.location,
        author: {
          id: event.calendar.source,
          name: event.calendar.source
        }
      });
    })
  }
}