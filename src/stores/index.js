import Settings from './Settings';
import RemindMe from './RemindMe';
import UserProfile from './UserProfile';

class RootStore {
  constructor() {
    this.settingsStore = new Settings(this);
    this.remindMeStore = new RemindMe(this);
    this.me = new UserProfile(this);
  }
}

export default new RootStore();