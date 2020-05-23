import RNCalendarEvents from 'react-native-calendar-events';
import { observable, action } from 'mobx';
import moment from 'moment';
import { persist } from 'mobx-persist';
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

  @action removeEvent = async id => {
    try {
      await RNCalendarEvents.removeEvent(id, { futureEvents: true });
    } catch (e) {
      logger.logError(e);
    }
    this.events = this.events.filter(e => e.id !== id);
  };

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
    const granted = await RNCalendarEvents.authorizeEventStore();
    if (granted === 'authorized') {
      this.allCalendars = await RNCalendarEvents.findCalendars();
    }
  };

  transformEvent = event => {
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
      __typename: 'Calendar',
      author: {
        id: event.calendar.source,
        name: event.calendar.source
      }
    });
  }

  @action findEventById = id => {
    const event = this.events.find(e => e.id === id);
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
        const m = moment().startOf('D');
        const month = m.month();
        const startDate = m.toDate().toISOString();
        let endDate;
        if (month === 11) {
          endDate = m.clone().add(1, 'year').toDate().toISOString();
        } else {
          endDate = m.clone().endOf('year').toDate().toISOString();
        }
        this.events = await RNCalendarEvents.fetchAllEvents(startDate, endDate, this.calendars.map(cal => cal.id));
      } else {
        this.reset();
      }
    } catch(e) {
      logger.logError(e);
    }
  };

  get transform() {
    return this.events.map(this.transformEvent);
  }
}