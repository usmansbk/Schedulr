import { I18n } from 'aws-amplify';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';
import dict from 'i18n';

export default () => {
  const locales = RNLocalize.getLocales();
  const locale = locales[0];
  const language = locale.languageCode;
  I18n.setLanguage(language);
  moment.locale(language);
  I18n.putVocabularies(dict);
};