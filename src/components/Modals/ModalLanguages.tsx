import BaseModal from './BaseModal';
import languages from 'src/languages';
import { useTranslate } from 'src/hooks';
import { Box, Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import Storage from 'src/utils/storage';
import { useMemo } from 'react';

interface IModalLanguagesProps {
  open: boolean;
  onClose: () => void;
}

interface ILanguage {
  language: string;
  name: string;
}

const ModalLanguages: React.FC<IModalLanguagesProps> = (props) => {
  const { open, onClose } = props;

  const { t, changeLanguage } = useTranslate();
  const currentLanguage = Storage.getLanguage();

  const getLanguages = (): ILanguage[] => {
    if (!currentLanguage) {
      return Object.keys(languages).map((key) => ({
        language: key,
        name: languages[key]['common.language'],
      }));
    }
    const otherLanguages = Object.keys(languages)
      .filter((key) => key !== currentLanguage)
      .map((key) => ({
        language: key,
        name: languages[key]['common.language'],
      }));
    return [
      {
        language: currentLanguage,
        name: languages[currentLanguage]['common.language'],
      },
      ...otherLanguages,
    ];
  };

  const LANGUAGES = useMemo(() => getLanguages(), [currentLanguage]);

  const onChangeLanguage = (language: string) => {
    changeLanguage(language);
    onClose();
  };

  return (
    <BaseModal
      size="xl"
      title={t('modal.languages.title') || ''}
      isOpen={open}
      onClose={onClose}
      className="modal-languages"
    >
      <Flex alignItems="center">
        {LANGUAGES.map(({ language, name }) => (
          <Flex
            justifyContent="center"
            alignItems="center"
            className={`modal-languages__language-item ${
              currentLanguage === language
                ? 'modal-languages__language-item--active'
                : ''
            }`}
            key={language}
            onClick={() => onChangeLanguage(language)}
          >
            {name}
          </Flex>
        ))}
      </Flex>
    </BaseModal>
  );
};

export default ModalLanguages;
