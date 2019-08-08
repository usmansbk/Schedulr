import { I18n } from 'aws-amplify';
import dict from 'i18n';

export default (lang) => {
  I18n.setLanguage(lang || 'en');
  I18n.putVocabularies(dict);
};