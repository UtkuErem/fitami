import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Import translations
import en from './translations/en';
import zh from './translations/zh';
import pt from './translations/pt';
import tr from './translations/tr';

const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  },
  pt: {
    translation: pt
  },
  tr: {
    translation: tr
  }
};

// Get the device language
const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (locales.length === 0) {
    return 'en';
  }

  // Get the first two characters of the locale (language code)
  const languageCode = locales[0].languageCode.slice(0, 2);

  // Check if the language is supported, otherwise use English
  return Object.keys(resources).includes(languageCode) ? languageCode : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    compatibilityJSON: 'v3' // To avoid warnings in React Native
  });

export default i18n;
