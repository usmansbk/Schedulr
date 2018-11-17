import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';
import moment from 'moment';

import momentFr from '../languages/fr';

import en from '../languages/en.json';
import fr from '../languages/fr.json';

const language = RNLanguages.language;

i18n.defaultLocale = 'en';
i18n.locale = language;
i18n.fallbacks = true;
i18n.translations = { en, fr };

moment.locale('fr', momentFr);
moment.locale(language)

export default i18n;