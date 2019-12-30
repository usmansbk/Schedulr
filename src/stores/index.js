import { action } from 'mobx';
import { create } from 'mobx-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Settings from './Settings';
import RemindMe from './RemindMe';
import Theme from './Theme';
import AppStyles from './Styles';
import AppState from './AppState';
import Notifications from './Notifications';
import Location from './Location';
import Admob from './AdMob';
import Snackbar from './Snackbar';
import Calendar from './Calendar';

class RootStore {
  constructor() {
    
    const hydrate = create({
      storage: AsyncStorage
    });

    const settingsStore = new Settings;
    const remindMeStore = new RemindMe;
    const notificationsStore = new Notifications;
    const locationStore = new Location;
    const adsStore = new Admob;
    const snackbarStore = new Snackbar;
    const calendarStore = new Calendar;
    
    hydrate('settings', settingsStore);
    hydrate('remindMe', remindMeStore);
    hydrate('notificationsStore', notificationsStore);
    // Create theme store after hydrating the settings store
    const appState = new AppState(settingsStore);
    hydrate('appState', appState);
    hydrate('calendarStore', calendarStore)
    hydrate('locationStore', locationStore);
    
    const themeStore = new Theme(settingsStore);
    const appStyles = new AppStyles(settingsStore);

    this.settingsStore = settingsStore;
    this.remindMeStore = remindMeStore;
    this.themeStore = themeStore;
    this.appStyles = appStyles;
    this.appState = appState;
    this.notificationsStore = notificationsStore;
    this.locationStore = locationStore;
    this.adsStore = adsStore;
    this.snackbar = snackbarStore;
    this.calendar = calendarStore;
  }

  @action reset = () => {
    this.settingsStore.reset();
    this.remindMeStore.reset();
    this.appState.reset();
    this.notificationsStore.reset();
    this.locationStore.reset();
    this.adsStore.reset();
    this.calendarStore.reset();
  }

  @action init = () => {
    this.appState.setDefaults();
  }
}

export default new RootStore();