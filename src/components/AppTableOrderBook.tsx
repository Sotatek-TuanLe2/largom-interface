import React, { useState, FC } from 'react';
import 'src/styles/components/AppTableOrderBook.scss';
import { Box, Flex } from '@chakra-ui/react';
import { TYPE_TRADE } from 'src/utils/constants';

interface IAppTableOrderBook {
  type: string;
}

interface IOrderBook {
  price: number;
  amount: number;
  total: number;
}

const data = [
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
  {
    price: 23093.23,
    amount: 0.10906,
    total: 251854766,
  },
];

const AppTableOrderBook: FC<IAppTableOrderBook> = (props) => {
  const { type = TYPE_TRADE.SELL } = props;
  const [orderActive, setOrderActive] = useState<number | null>(null);

  const isOrderActive = (orderIndex: number) => {
    if (orderActive === null) return false;
    if (type === TYPE_TRADE.SELL) {
      return orderActive <= orderIndex;
    }
    return orderActive >= orderIndex;
  };

  return (
    <Box
      className={`orderbook-list ${type === TYPE_TRADE.SELL ? 'sell' : 'buy'}`}
    >
      {data.map((item: IOrderBook, index) => {
        return (
          <Box
            className={`orderbook-progress ${
              isOrderActive(index) ? 'active' : ''
            }
            `}
            key={index}
            onMouseEnter={() => setOrderActive(index)}
            onMouseLeave={() => setOrderActive(null)}
          >
            <Box className="row-content">
              <Box textAlign="left">{item.price}</Box>
              <Box textAlign="left">{item.amount}</Box>
              <Box textAlign="right">{item.total}</Box>
            </Box>
            <Box className="progress-bar" width={'20%'} />

            {orderActive === index && (
              <Box className="orderbook-popover">
                <Flex>
                  <Box>Avg.Price:</Box>
                  <Box>≈ {item.price}</Box>
                </Flex>
                <Flex>
                  <Box>Sum BTC:</Box>
                  <Box>87.67309</Box>
                </Flex>
                <Flex>
                  <Box>Sum USDT:</Box>
                  <Box>67309</Box>
                </Flex>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default AppTableOrderBook;
