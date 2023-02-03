import 'src/styles/pages/TradingPage.scss';
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

interface IStatics {
  label: string;
  value: number;
}

const statics: {
  label: string;
  value: number;
}[] = [
  {
    label: '24h High',
    value: 2143959,
  },
  {
    label: '24h Low',
    value: 2143959,
  },
  {
    label: '24h Volume(BTC)',
    value: 2143959,
  },
  {
    label: '24h Volume(USDT)',
    value: 2143959,
  },
];

const PartStatistics = () => {
  return (
    <Flex className="statistics">
      <Box className="statistics__currency">BTC/USDT</Box>

      <Flex>
        <Box className="statistics__price">
          <Box className="price up">20,854.85</Box>
          <Box className="value">$20,854.85</Box>
        </Box>
        <Box className="statistics__static change">
          <Box className="label">24h Change</Box>
          <Box className="value up">124.34 + 0.60%</Box>
        </Box>

        {statics.map((item: IStatics, index) => {
          return (
            <Box className="statistics__static" key={index}>
              <Box className="label">{item.label}</Box>
              <Box className="value">{item.value}</Box>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default PartStatistics;
