import {I18nManager} from 'react-native';
import {I18n} from 'aws-amplify';
import * as RNLocalize from 'react-native-localize';
import dicts from 'i18n';
import {setDateLanguage} from 'lib/date';

export default (stores) => {
  const {isRTL, languageCode} = RNLocalize.getLocales()[0];
  stores.settings.userPreference.language = languageCode;
  stores.settings.currentLanguage = languageCode;
  setDateLanguage(languageCode);
  I18n.setLanguage(languageCode);
  const dict = {
    [languageCode]: dicts(languageCode),
  };
  I18n.putVocabularies(dict);
  I18nManager.forceRTL(isRTL);
};
