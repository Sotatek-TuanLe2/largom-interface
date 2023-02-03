import { Box, Flex } from '@chakra-ui/react';
import {
  LogoIcon,
  DownloadIcon,
  LanguageIcon,
  ArrowDownIcon,
} from 'src/assets/icons';
import React from 'react';
import { AppButton } from 'src/components';
import 'src/styles/components/Header.scss';

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
          <AppButton>Connect Wallet</AppButton>
          <Box className="header__icon-download">
            <DownloadIcon />
          </Box>
          <Box className="header__icon-language">
            <LanguageIcon />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
