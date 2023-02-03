import 'src/styles/pages/TradingPage.scss';
import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { AppTabs } from 'src/components';
import { formatTimestamp } from 'src/utils/format';

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

      <Box>
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
  const data = [
    {
      price: 23232323,
      amount: 23434343,
      time: 234343432343,
    },
    {
      price: 23232323,
      amount: 23434343,
      time: 234343432343,
    },
    {
      price: 23232323,
      amount: 23434343,
      time: 234343432343,
    },
    {
      price: 23232323,
      amount: 23434343,
      time: 234343432343,
    },
  ];

  const _renderMarketTrades = () => {
    return (
      <Box>
        <TableTrades data={data} />
      </Box>
    );
  };

  const _renderMyTrades = () => {
    return (
      <Box>
        <TableTrades data={data} />
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
