import { Box, Flex } from '@chakra-ui/react';
import {
  LogoIcon,
  DownloadIcon,
  LanguageIcon,
  ArrowDownIcon,
} from 'src/assets/icons';
import React, { useState } from 'react';
import 'src/styles/components/Header.scss';
import AppConnectWalletButton from '../AppConnectWalletButton';
import ModalLanguages from '../Modals/ModalLanguages';

const menus: {
  name: string;
  children?: any[];
  link?: string;
}[] = [
  {
    name: 'Buy Crypto',
    children: [],
  },
  {
    name: 'Markets',
    link: '/markets',
  },
  {
    name: 'Trade',
    children: [],
  },
  {
    name: 'Derivatives',
    children: [],
  },
  {
    name: 'Earn',
    children: [],
  },
  {
    name: 'Finance',
    children: [],
  },
  {
    name: 'NFT Institutional',
    children: [],
  },
  {
    name: 'Feed',
    link: '/feed',
  },
];

const Header = () => {
  const [openModalLanguage, setOpenModalLanguage] = useState<boolean>(false);

  const onToggleOpenModalLanguages = () =>
    setOpenModalLanguage((prevState) => !prevState);

  return (
    <Flex className="header">
      <Flex className="header__content">
        <Flex>
          <LogoIcon />
          <Flex className="header__menus">
            {menus.map((menu: any, index) => {
              return (
                <Flex key={index} className="header__menu">
                  {menu.name}
                  {menu.children && <ArrowDownIcon />}
                </Flex>
              );
            })}
          </Flex>
        </Flex>

        <Flex className="header__content--right">
          <AppConnectWalletButton>Connect Wallet</AppConnectWalletButton>
          <Box className="header__icon-download">
            <DownloadIcon />
          </Box>
          <Box className="header__icon-language">
            <Box onClick={onToggleOpenModalLanguages}>
              <LanguageIcon />
            </Box>
          </Box>
        </Flex>
      </Flex>
      <ModalLanguages
        open={openModalLanguage}
        onClose={onToggleOpenModalLanguages}
      />
    </Flex>
  );
};

export default Header;
