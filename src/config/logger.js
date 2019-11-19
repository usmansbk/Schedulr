import crashlytics from '@react-native-firebase/crashlytics';

export default function logError(error) {
  let e = error;
  if (typeof error === 'string') {
    e = new Error(error);
  }
  console.log(e);
  crashlytics().recordError(e);
}