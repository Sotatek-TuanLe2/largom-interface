import { ReactNode, FC } from 'react';
import { Header } from 'src/components';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

interface IBasePage {
  children?: ReactNode;
}

const BasePage: FC<IBasePage> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Flex className="container-page">{children}</Flex>
    </Box>
  );
};

export default BasePage;
