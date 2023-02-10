import 'src/styles/pages/TradingPage.scss';
import React, { FC, useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { AppNetworkIcons, AppTabs } from 'src/components';
import { formatTimestamp } from 'src/utils/format';
import rf from 'src/services/RequestFactory';

interface IDataTrades {
  price: number;
  amount: number;
  time: number;
  networks: string[];
}

interface ITableTrades {
  data: IDataTrades[];
  isLoading: boolean;
}

const TableTrades: FC<ITableTrades> = ({ data, isLoading }) => {
  const _renderLoading = () => (
    <Flex height="full" justifyContent="center" alignItems="center">
      Loading...
    </Flex>
  );

  const _renderContent = () => {
    if (isLoading) {
      return _renderLoading();
    }
    return data.map((item: IDataTrades, index: number) => {
      return (
        <Box className="table-trades__content" key={index}>
          <Box className="table-trades__content__item">
            <span className="trade-price trade-price--up">
              {Number(item.price).toFixed(2)}
            </span>
          </Box>
          <Box className="table-trades__content__item">
            {Number(item.amount).toFixed(5)}
          </Box>
          <Box className="table-trades__content__item">
            {formatTimestamp(item.time, 'HH:mm:ss')}
          </Box>
          <Box className="table-trades__content__item">
            <AppNetworkIcons networkIds={item.networks} showNumber={2} />
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box className="table-trades">
      <Box className="table-trades__header">
        <Box className="table-trades__header__item">Price(USDT)</Box>
        <Box className="table-trades__header__item">Amount(BTC)</Box>
        <Box className="table-trades__header__item">Time</Box>
        <Box className="table-trades__header__item">Network</Box>
      </Box>

      <Box className="table-trades__list">{_renderContent()}</Box>
    </Box>
  );
};

const PartTrades = () => {
  const TABS = {
    MARKET_TRADES: 'MARKET_TRADES',
    MY_TRADES: 'MY_TRADES',
  };

  const [marketTradeData, setMarketTradeData] = useState<IDataTrades[]>([]);
  const [activeTab, setActiveTab] = useState<string>(TABS.MARKET_TRADES);
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
      networks: item.networks,
    }));
    setMarketTradeData(newMarketTradeData);
  };

  const fetchMyTradeData = async () => {
    setIsLoading(true);
    const result: any[] = await rf.getRequest('TradingRequest').getMyTrades();
    setIsLoading(false);
    const newMyTradeData: IDataTrades[] = result.map((item) => ({
      amount: item.quantity,
      price: item.price,
      time: item.createdAt,
      networks: item.networks,
    }));
    setMyTradeData(newMyTradeData);
  };

  const fetchData = async () => {
    switch (activeTab) {
      case TABS.MARKET_TRADES:
        await fetchMarketTradeData();
        break;
      case TABS.MY_TRADES:
        await fetchMyTradeData();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const tabs = [
    {
      id: TABS.MARKET_TRADES,
      name: 'Market Trades',
      content: <TableTrades data={marketTradeData} isLoading={isLoading} />,
    },
    {
      id: TABS.MY_TRADES,
      name: 'My Trades',
      content: <TableTrades data={myTradeData} isLoading={isLoading} />,
    },
  ];

  const onChangeTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <Box className="trades">
      <AppTabs tabs={tabs} onChange={onChangeTab} />
    </Box>
  );
};

export default PartTrades;
