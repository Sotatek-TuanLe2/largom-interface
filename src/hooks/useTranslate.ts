import { i18n, TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { I18_NAMESPACE } from 'src/utils/constants';
import Storage from '../utils/storage';

type ReturnType = {
  t: TFunction;
  i18n: i18n;
  changeLanguage: (language: string) => void;
};

const useTranslate = (): ReturnType => {
  const { t, i18n } = useTranslation(I18_NAMESPACE);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language).then(() => {
      Storage.setLanguage(language);
    });
  };

  return {
    t,
    i18n,
    changeLanguage,
  };
};

export default useTranslate;
