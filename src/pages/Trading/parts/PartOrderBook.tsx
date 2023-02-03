import 'src/styles/pages/TradingPage.scss';
import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { AppTableOrderBook } from 'src/components';
import {
  ArrowPriceIcon,
  DefaultTypeIcon,
  BuyTypeIcon,
  SellTypeIcon,
} from 'src/assets/icons';
import { TYPE_TRADE } from 'src/utils/constants';

const PartOrderBook = () => {
  const [type, setType] = useState<string>('');

  const _renderCurrentPrice = () => {
    return (
      <Flex
        className="order-book__current-price"
        mt={type === TYPE_TRADE.BUY ? 0 : 4}
        mb={type === TYPE_TRADE.SELL ? 0 : 4}
      >
        <Flex alignItems={'center'}>
          <Flex className="price down">
            21,195.28 <ArrowPriceIcon />
          </Flex>
          <Box className="value">$21,195.28</Box>
        </Flex>

        <Box className="view-more">More</Box>
      </Flex>
    );
  };

  const _renderOrderBook = () => {
    if (type === TYPE_TRADE.SELL) {
      return (
        <Box>
          <AppTableOrderBook type={TYPE_TRADE.SELL} />
          {_renderCurrentPrice()}
        </Box>
      );
    }

    if (type === TYPE_TRADE.BUY) {
      return (
        <Box>
          {_renderCurrentPrice()}
          <AppTableOrderBook type={TYPE_TRADE.BUY} />
        </Box>
      );
    }

    return (
      <Box>
        <AppTableOrderBook type={TYPE_TRADE.SELL} />
        {_renderCurrentPrice()}
        <AppTableOrderBook type={TYPE_TRADE.BUY} />
      </Box>
    );
  };

  return (
    <Box zIndex={999}>
      <Box className="order-book">
        <Box className="order-book__title">Order Book</Box>

        <Flex className="order-book__filter">
          <Flex>
            <Box
              className={`order-book__filter-type ${
                type === '' ? 'active' : ''
              }`}
              onClick={() => setType('')}
            >
              <DefaultTypeIcon />
            </Box>
            <Box
              className={`order-book__filter-type ${
                type === TYPE_TRADE.BUY ? 'active' : ''
              }`}
              onClick={() => setType(TYPE_TRADE.BUY)}
            >
              <BuyTypeIcon />
            </Box>
            <Box
              className={`order-book__filter-type ${
                type === TYPE_TRADE.SELL ? 'active' : ''
              }`}
              onClick={() => setType(TYPE_TRADE.SELL)}
            >
              <SellTypeIcon />
            </Box>
          </Flex>
        </Flex>

        <Box className="orderbook-tbheader">
          <Box textAlign="left">Price(USDT)</Box>
          <Box textAlign="left">Amount(BTC)</Box>
          <Box textAlign="right">Total</Box>
        </Box>
        {_renderOrderBook()}
      </Box>
    </Box>
  );
};

export default PartOrderBook;
