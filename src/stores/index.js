import {action} from 'mobx';
import {create} from 'mobx-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Settings from './Settings';
import RemindMe from './RemindMe';
import Theme from './Theme';
import styles from './Styles';
import AppState from './AppState';
import Notifications from './Notifications';
import Location from './Location';
import Calendar from './Calendar';

class RootStore {
  constructor() {
    const hydrate = create({
      storage: AsyncStorage,
    });

    const settings = new Settings();
    const remindMeStore = new RemindMe();
    const notificationsStore = new Notifications();
    const locationStore = new Location();
    const calendarStore = new Calendar();

    hydrate('settings', settings);
    hydrate('remindMe', remindMeStore);
    hydrate('notificationsStore', notificationsStore);
    // Create theme store after hydrating the settings store
    const appState = new AppState(settings);
    hydrate('appState', appState);
    hydrate('calendarStore', calendarStore);
    hydrate('locationStore', locationStore);

    const theme = new Theme(settings);
    const styles = new styles(settings);

    this.settings = settings;
    this.remindMeStore = remindMeStore;
    this.theme = theme;
    this.styles = styles;
    this.appState = appState;
    this.notificationsStore = notificationsStore;
    this.locationStore = locationStore;
    this.calendar = calendarStore;
  }

  @action reset = () => {
    this.settings.reset();
    this.remindMeStore.reset();
    this.appState.reset();
    this.notificationsStore.reset();
    this.locationStore.reset();
    this.calendar.reset();
  };

  @action init = () => {
    this.appState.setDefaults();
  };
}

export default new RootStore();
