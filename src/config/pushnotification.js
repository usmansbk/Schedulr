import OneSignal from 'react-native-onesignal';
import env from 'config/env';

function init() {
    OneSignal.init(env.ONESIGNAL_ID);
    OneSignal.inFocusDisplaying(2);
}

export default {
    init
};