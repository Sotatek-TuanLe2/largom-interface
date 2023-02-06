import 'src/styles/pages/TradingPage.scss';
import React, { FC, useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { AppTabs } from 'src/components';
import { formatTimestamp } from 'src/utils/format';
import rf from 'src/services/RequestFactory';

interface IDataTrades {
  price: number;
  amount: number;
  time: number;
}

interface ITableTrades {
  data: IDataTrades[];
}

const TableTrades: FC<ITableTrades> = ({ data }) => {
  return (
    <Box className="table-trades">
      <Box className="table-trades__header">
        <Box textAlign="left">Price(USDT)</Box>
        <Box textAlign="right">Amount(BTC)</Box>
        <Box textAlign="right">Time</Box>
      </Box>

      <Box className="table-trades__list">
        {data.map((item: IDataTrades, index: number) => {
          return (
            <Box className="table-trades__content" key={index}>
              <Box textAlign="left" className="price up">
                {item.price}
              </Box>
              <Box textAlign="right">{item.amount}</Box>
              <Box textAlign="right">
                {formatTimestamp(item.time, 'HH:mm:ss')}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const PartTrades = () => {
  const [marketTradeData, setMarketTradeData] = useState<IDataTrades[]>([]);
  const [myTradeData, setMyTradeData] = useState<IDataTrades[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMarketTradeData = async () => {
    setIsLoading(true);
    const result: any[] = await rf
      .getRequest('TradingRequest')
      .getMarketTrades();
    setIsLoading(false);
    const newMarketTradeData: IDataTrades[] = result.map((item) => ({
      amount: item.quantity,
      price: item.price,
      time: item.createdAt,
    }));
    setMarketTradeData(newMarketTradeData);
  };

  useEffect(() => {
    fetchMarketTradeData();
  }, []);

  const _renderLoading = () => (
    <Box>
      <Flex justifyContent="center" alignItems="center">
        Loading...
      </Flex>
    </Box>
  );

  const _renderMarketTrades = () => {
    if (isLoading) {
      return _renderLoading();
    }
    return (
      <Box>
        <TableTrades data={marketTradeData} />
      </Box>
    );
  };

  const _renderMyTrades = () => {
    if (isLoading) {
      return _renderLoading();
    }
    return (
      <Box>
        <TableTrades data={myTradeData} />
      </Box>
    );
  };

  const tabs = [
    {
      id: 'marketTrades',
      name: 'Market Trades',
      content: <Box>{_renderMarketTrades()}</Box>,
    },
    {
      id: 'myTrades',
      name: 'My Trades',
      content: <Box>{_renderMyTrades()}</Box>,
    },
  ];

  return (
    <Box className="trades">
      <AppTabs tabs={tabs} />
    </Box>
  );
};

export default PartTrades;
