import { TFunctionDetailedResult } from 'i18next';
import { useTranslation } from 'react-i18next';
import { I18_NAMESPACE } from 'src/utils/constants';
import Storage from '../utils/storage';

type ReturnType = {
  formatMessage: (
    key: string,
    options?: any,
  ) => TFunctionDetailedResult<object>;
  changeLanguage: (language: string) => void;
};

const useLanguage = (): ReturnType => {
  const { t: translate, i18n } = useTranslation(I18_NAMESPACE);

  const formatMessage = (key: string, options?: any) => {
    return translate(key, options);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language).then(() => {
      Storage.setLanguage(language);
    });
  };

  return {
    formatMessage,
    changeLanguage,
  };
};

export default useLanguage;
