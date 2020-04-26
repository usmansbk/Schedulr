import crashlytics from '@react-native-firebase/crashlytics';

function logError(error) {
  let e = error;
  if (!(error instanceof Error)) {
    if (typeof error === 'object') e = JSON.stringify(error);
    e = new Error(e);
  }
  if (__DEV__) {
    console.log('[Schdlr]', e.message);
  }
  crashlytics().recordError(e);
}

function log(message) {
  if (__DEV__ && message) {
    console.log('[Schdlr]', message);
    crashlytics().log(message);
  }
}

export default {
  logError,
  log
};