function logError(error) {
  if (__DEV__) {
    let e = error;
    if (!(error instanceof Error)) {
      if (typeof error === 'object') e = JSON.stringify(error);
      e = new Error(e);
    }
    devLog(e.message);
  }
}

function log(message) {
  if (__DEV__ && message) {
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
