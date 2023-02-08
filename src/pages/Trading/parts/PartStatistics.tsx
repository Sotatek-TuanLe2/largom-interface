import 'src/styles/pages/TradingPage.scss';
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { formatTickerNumber } from 'src/utils/format';

interface IStatics {
  label: string;
  value: number | string;
}

const PartStatistics = () => {
  const { instrument } = useSelector(
    (state: RootState) => state.metadata.trading,
  );
  const ticker = useSelector((state: RootState) =>
    state.metadata.trading.tickers.find(
      (ticker) => ticker.symbol === instrument.symbol,
    ),
  );

  const statics: IStatics[] = [
    {
      label: '24h High',
      value: '-',
    },
    {
      label: '24h Low',
      value: '-',
    },
    {
      label: `24h Volume(${instrument.rootSymbol})`,
      value: ticker?.volume || '--',
    },
    {
      label: `24h Volume(${instrument.quoteCurrency})`,
      value: formatTickerNumber(ticker?.quoteVolume, instrument),
    },
  ];

  return (
    <Flex className="statistics">
      <Box className="statistics__currency">
        {`${instrument.rootSymbol}/${instrument.quoteCurrency}`}
      </Box>

      <Flex>
        <Box className="statistics__price">
          <Box className="price up">
            {formatTickerNumber(ticker?.lastPrice, instrument)}
          </Box>
          <Box className="value">
            ${formatTickerNumber(ticker?.lastPrice, instrument)}
          </Box>
        </Box>
        <Box className="statistics__static change">
          <Box className="label">24h Change</Box>
          <Box className="value up">
            {formatTickerNumber(ticker?.priceChange, instrument)} + (
            {Number(ticker?.priceChangePercent || 0).toFixed(2)}%)
          </Box>
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
