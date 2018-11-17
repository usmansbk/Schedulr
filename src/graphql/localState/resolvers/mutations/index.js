import login from './login';
import settings from './settings';
import calendar from './calendar';
import groups from './groups';
import events from './events';

export default {
  ...login,
  ...settings,
  ...calendar,
  ...groups,
  ...events
};