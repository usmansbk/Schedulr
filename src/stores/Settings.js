import { Appearance } from 'react-native';
import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import OneSignal from 'react-native-onesignal';
import { updatePreference } from 'api/mutations';
import { I18n } from 'aws-amplify';
import { dark, light } from 'config/colors';
import logger from 'config/logger';
import snackbar from '../helpers/snackbar';

function isDark() {
  const scheme = Appearance.getColorScheme();
  return (scheme === 'dark' || scheme === null);
}

function updateUserPreference(optimisticResponse) {
  try {
    let input = Object.assign({}, optimisticResponse);
    delete input.__typename;
    client.mutate({
      mutation: gql(updatePreference),
      variables: {
        input
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateUserPreference: optimisticResponse
      }
    });
    return optimisticResponse;
  } catch (error) {
    logger.logError(error);
  }
  return null;
}

export default class SettingsState {

  @observable currentLanguage = 'en';
  @persist @observable dark = false && isDark();
  @persist @observable sound = true;
  @persist @observable vibrate = true;
  @persist @observable disableReminders = false;
  @persist @observable headsUp = false;
  @persist @observable bookmarkedEventsOnly = false;
  @persist('object') @observable userPreference = {
    language: this.currentLanguage
  };
  @observable extraData = 0;

  @action toggle (value) {
    this[value] = !this[value];
    console.log('toggle', value);
    if (value === 'dark') this.toggleTheme();
    this.extraData += 1;
  }

  @action async toggleTheme () {
    const colors = this.dark ? dark : light;
    try {
      snackbar(I18n.get('TOAST_justAmoment'));
      await changeNavigationBarColor(this.dark ? colors.light_gray_2 : colors.bg, !this.dark);
    } catch (error) {
      logger.logError(error);
    }
    this.extraData += 1;
  }

  @action reset() {
    this.dark = false;
    this.sound = true;
    this.vibrate = true;
    this.disableReminders = false;
    this.headsUp = false;
    this.bookmarkedEventsOnly = false;
    this.userPreference = {
      language: this.currentLanguage
    };
  }

  @action async togglePref(key) {
    const prev = this.userPreference;
    let optimisticResponse = {};
    if (prev && prev.id) {
      const toggled = !prev[key];
      optimisticResponse = Object.assign({}, prev, {
        [key]: toggled
      });
      this.setUserPreference(optimisticResponse);
    }
    const updatedPreference = await updateUserPreference(optimisticResponse);
    if (updatedPreference) this.setUserPreference(updatedPreference);
    if (key === 'disablePush') {
      OneSignal.setSubscription(!optimisticResponse.disablePush);
    }
    this.extraData += 1;
  }

  @action setUserPreference = async (pref) => {
    if (pref) {
      OneSignal.setSubscription(!pref.disablePush);
      pref.language = this.currentLanguage;
      this.userPreference = pref;
    }
  };

  @action updateLanguage = async () => {
    if (this.userPreference) {
      const pref = this.userPreference;
      pref.language = this.currentLanguage;
      await updateUserPreference(pref);
    }
  }
}