import RNCalendarEvents from 'react-native-calendar-events';
import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';

export default class Calendar {
  @persist('list') @observable calendars = [];
  @persist('list') @observable events = [];

  isAuthorized = async () => {
    try {
      console.log(1);
      const granted = await RNCalendarEvents.authorizationStatus();
      return granted;
    } catch(e) {
      return false;
    }
  };

  @action authorize = async () => {
    try {
      console.log(2);
      const granted = await RNCalendarEvents.authorizeEventStore();
      return granted;
    } catch(e) {
      return false;
    }
  };

  @action findCalendars = async () => {
    try {
      // let isAuth = await this.isAuthorized();
      let isAuth = await this.authorize();
      if (isAuth) {
        console.log(isAuth);
        const cals = await RNCalendarEvents.findCalendars();
        if (cals) this.calendars = cals;
        console.log(cals);
      }
    } catch(e) {
      console.log(e);
    }
  };

  @action reset = () => {
    this.calendars = [];
    this.events = [];
  };
}