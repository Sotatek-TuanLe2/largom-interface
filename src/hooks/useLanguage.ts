import { useTranslation } from 'react-i18next';
import Storage from '../utils/storage';

const useLanguage = () => {
  const { t, i18n } = useTranslation('common');

  const formatMessage = (key: string, options?: any) => {
    return t(key, options);
  };

  const changeLanguage = (language: string) => {
    Storage.setLanguage(language);
    i18n.changeLanguage(language).then();
  };

  return { formatMessage, changeLanguage };
};

export default useLanguage;
