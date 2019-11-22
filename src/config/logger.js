import crashlytics from '@react-native-firebase/crashlytics';

export default function logError(error) {
  let e = error;
  if (!(error instanceof Error)) {
    if (typeof error === 'object') e = JSON.stringify(error);
    e = new Error(e);
  }
  console.log(e);
  crashlytics().recordError(e);
}