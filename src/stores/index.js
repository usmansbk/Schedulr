import {action} from 'mobx';
import {create} from 'mobx-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Settings from './Settings';
import RemindMe from './RemindMe';
import Theme from './Theme';
import Styles from './Styles';
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
    const reminder = new RemindMe();
    const notifications = new Notifications();
    const location = new Location();
    const calendar = new Calendar();

    hydrate('settings', settings);
    hydrate('remindMe', reminder);
    hydrate('notifications', notifications);
    // Create theme store after hydrating the settings store
    const appState = new AppState(settings);
    hydrate('appState', appState);
    hydrate('calendar', calendar);
    hydrate('location', location);

    const theme = new Theme(settings);
    const styles = new Styles(settings);

    this.settings = settings;
    this.reminder = reminder;
    this.theme = theme;
    this.styles = styles;
    this.appState = appState;
    this.notifications = notifications;
    this.location = location;
    this.calendar = calendar;
  }

  @action reset = () => {
    this.settings.reset();
    this.reminder.reset();
    this.appState.reset();
    this.notifications.reset();
    this.location.reset();
    this.calendar.reset();
  };

  @action init = () => {
    this.appState.setDefaults();
  };
}

export default new RootStore();
