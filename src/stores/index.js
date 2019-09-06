import { action } from 'mobx';
import { create } from 'mobx-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Settings from './Settings';
import RemindMe from './RemindMe';
import Theme from './Theme';
import AppStyles from './Styles';
import AppState from './AppState';
import Notifications from './Notifications';

class RootStore {
  constructor() {
    
    const hydrate = create({
      storage: AsyncStorage
    });

    const settingsStore = new Settings;
    const remindMeStore = new RemindMe;
    const notificationsStore = new Notifications;
    
    hydrate('settings', settingsStore);
    hydrate('remindMe', remindMeStore);
    hydrate('notificationsStore', notificationsStore);
    // Create theme store after hydrating the settings store
    const appState = new AppState(settingsStore);
    hydrate('appState', appState);
    
    const themeStore = new Theme(settingsStore);
    const appStyles = new AppStyles(settingsStore);

    this.settingsStore = settingsStore;
    this.remindMeStore = remindMeStore;
    this.themeStore = themeStore;
    this.appStyles = appStyles;
    this.appState = appState;
    this.notificationsStore = notificationsStore;
  }

  @action reset = () => {
    this.settingsStore.reset();
    this.remindMeStore.reset();
    this.appState.reset();
    this.notificationsStore.reset();
  }
}

export default new RootStore();