import { I18n } from 'aws-amplify';
import moment from 'moment';
import dict from 'i18n';

export default (lang) => {
  I18n.setLanguage(lang || 'en');
  moment.locale(lang);
  I18n.putVocabularies(dict);
};