import RNCalendarEvents from 'react-native-calendar-events';
import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';

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
}