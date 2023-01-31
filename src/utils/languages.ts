import i18next from 'i18next';
import languages from 'src/languages';
import { I18_NAMESPACE } from './constants';
import Storage from './storage';

export const initMultiLanguages = () => {
  const language = Storage.getLanguage();

  return i18next.init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: language, // language to use
    resources: {
      en: {
        [I18_NAMESPACE]: languages.en,
      },
      vn: {
        [I18_NAMESPACE]: languages.vn,
      },
    },
  });
};
