import { BasePage } from 'src/components';
import 'src/styles/pages/TradingPage.scss';
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import PartStatistics from './parts/PartStatistics';
import PartOrderBook from './parts/PartOrderBook';
import PartUserInfoTransaction from './parts/PartUserInfoTransaction';

const TradingPage = () => {
  return (
    <BasePage>
      <>
        <Flex className="trading-page" direction={'column'}>
          <Flex>
            <Box className="trading-page__content-left">
              <PartStatistics />
              <Flex width={'100%'}>
                <PartOrderBook />
                <Box className="trading-page__chart" />
              </Flex>
            </Box>
            <Box className="trading-page__content-right" />
          </Flex>
          <Box>
            <PartUserInfoTransaction />
          </Box>
        </Flex>
      </>
    </BasePage>
  );
};

export default TradingPage;
