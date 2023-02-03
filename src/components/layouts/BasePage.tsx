import { ReactNode, FC, useState, useEffect } from 'react';
import { Header } from 'src/components';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

interface IBasePage {
  className?: string;
  onInitPage?: () => void;
  children: ReactNode;
}

const BasePage: FC<IBasePage> = (props) => {
  const { className = '', children, onInitPage } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onInit = async () => {
    try {
      setIsLoading(true);
      onInitPage && (await onInitPage());
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onInit().then();
  }, []);

  const _renderLoading = () => (
    <Flex justifyContent={'center'}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );

  const _renderChildren = () => (
    <Flex className="container-page">{children}</Flex>
  );

  return (
    <Box className={className}>
      <Header />
      {isLoading ? _renderLoading() : _renderChildren()}
    </Box>
  );
};

export default BasePage;
