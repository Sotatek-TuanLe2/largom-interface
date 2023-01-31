import i18next from 'i18next';
import common_en from '../translations/en.json';
import common_vn from '../translations/vn.json';
import Storage from './storage';
const language = Storage.getLanguage();

export const initI18n = () => {
  return i18next
    .init({
      interpolation: { escapeValue: false }, // React already does escaping
      lng: language, // language to use
      resources: {
        en: {
          common: common_en, // 'common' is our custom namespace
        },
        vn: {
          common: common_vn,
        },
      },
    });
};
