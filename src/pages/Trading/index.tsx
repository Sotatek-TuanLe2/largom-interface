import { BasePage } from 'src/components';
import 'src/styles/pages/TradingPage.scss';
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import PartStatistics from './parts/PartStatistics';
import PartOrderBook from './parts/PartOrderBook';
import PartChart from 'src/pages/Trading/parts/PartChart';
import PartTrades from './parts/PartTrades';
import PartFormTrade from './parts/PartFormTrade';

const TradingPage = () => {
  return (
    <BasePage>
      <Flex className="trading-page">
        <Box className="trading-page__content-left">
          <PartStatistics />
          <Flex width={'100%'}>
            <PartOrderBook />
            <Flex direction="column" w="full">
              <Box className="trading-page__chart">
                <PartChart containerId="tv_chart_container" />
              </Box>
              <Box className="trading-page__content-center">
                <PartFormTrade />
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Box className="trading-page__content-right">
          <PartTrades />
        </Box>
      </Flex>
    </BasePage>
  );
};

export default TradingPage;
