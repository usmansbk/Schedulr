import { create } from 'mobx-persist';
import { AsyncStorage  } from 'react-native';
import Settings from './Settings';
import RemindMe from './RemindMe';
import UserProfile from './UserProfile';

const hydrate = create({
  storage: AsyncStorage
});

const settingsStore = new Settings;
const remindMeStore = new RemindMe;
const meStore = new UserProfile;

hydrate('settings', settingsStore);
hydrate('remindMe', remindMeStore);
hydrate('me', meStore);

class RootStore {
  constructor() {
    this.settingsStore = settingsStore;
    this.remindMeStore = remindMeStore;
    this.me = meStore;
  }
}


export default new RootStore();