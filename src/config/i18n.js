import { I18n } from 'aws-amplify';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';
import dicts from 'i18n';

export default () => {
  const { isRTL, languageTag } = RNLocalize.getLocales()[0];
  I18n.setLanguage(languageTag);
  moment.locale(languageTag);
  I18n.putVocabularies(dicts(languageTag));
};