function logError(error) {
  let e = error;
  if (!(error instanceof Error)) {
    if (typeof error === 'object') e = JSON.stringify(error);
    e = new Error(e);
  }
  if (__DEV__) {
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
