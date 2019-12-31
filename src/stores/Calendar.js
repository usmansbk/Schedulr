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
      const events = await RNCalendarEvents.fetchAllEvents(startDate, endDate, this.calendars.map(cal => cal.id));
      this.events = events;
      console.log(events);
    } catch(e) {
      logger.logError(e);
    }
  };
}