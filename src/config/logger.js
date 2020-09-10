import crashlytics from '@react-native-firebase/crashlytics';

function logError(error) {
  let e = error;
  if (!(error instanceof Error)) {
    if (typeof error === 'object') e = JSON.stringify(error);
    e = new Error(e);
  }
  if (__DEV__) {
    devLog(e.message);
  }
  crashlytics().recordError(e);
}

function log(message) {
  if (__DEV__ && message) {
    crashlytics().log(message);
    devLog(message);
  }
}

function devLog(message) {
  console.log('[Schdlr]', message);
}

export default {
  logError,
  log,
  devLog,
};
