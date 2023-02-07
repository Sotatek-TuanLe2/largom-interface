import { Box, Flex } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { ArrowDownIcon } from 'src/assets/icons';
import AppDataTable from 'src/components/AppDataTable';
import AppRadioBtn from 'src/components/AppRadioBtn';
import rf from 'src/services/RequestFactory';
import { getLogoNetwork } from 'src/utils/network';
import { OPTIONS_RADIO } from './PartOrderHistory';

interface ITradeHistory {
  date: string;
  pair: string;
  network: string;
  side: string;
  price: number;
  executed: number;
  fee: number;
  role: string;
  total: number;
  networkId: string;
}

const PartTradeHistory = () => {
  const [valueRadio, setValueRadio] = useState('1 Day');

  const getDataTradeHistory = async () => {
    const res = await rf.getRequest('TradingRequest').getTradingHistory();
    return res;
  };

  const _renderHeaderTradeHistory = () => {
    return (
      <Flex justifyContent={'space-between'} className="row-order">
        <Box w={'14.7%'} className="header-order">
          DATE
        </Box>
        <Box w={'11.03%'} className="header-order">
          PAIR
        </Box>
        <Box w={'10.29%'} className="header-order">
          NETWORK
        </Box>
        <Box w={'7.35%'} className="header-order">
          <span>SIDE</span>
          <ArrowDownIcon />
        </Box>
        <Box w={'8.3%'} className="header-order">
          <span>PRICE</span>
        </Box>
        <Box w={'8.3%'} className="header-order">
          EXECUTED
        </Box>
        <Box w={'16.91%'} className="header-order">
          FEE
        </Box>
        <Box w={'8.01%'} className="header-order">
          ROLE
        </Box>

        <Box w={'15.11%'} className="header-order">
          TOTAL
        </Box>
      </Flex>
    );
  };

  const _renderContentTradeHistory = (data: ITradeHistory[]) => {
    if (!data || !data.length) {
      return <></>;
    } else
      return (
        <>
          {data.map((orderHistory: ITradeHistory, id: number) => {
            return (
              <RowTradingHistoryTable
                tradeHistory={orderHistory}
                key={`${id}order-table`}
              />
            );
          })}
        </>
      );
  };

  return (
    <Box className="order-history-wrap">
      <div className="search">
        <AppRadioBtn
          value={valueRadio}
          onChange={setValueRadio}
          options={OPTIONS_RADIO}
        />
      </div>
      <AppDataTable
        renderBody={_renderContentTradeHistory}
        renderHeader={_renderHeaderTradeHistory}
        fetchData={getDataTradeHistory}
      />
    </Box>
  );
};

const RowTradingHistoryTable: React.FC<{ tradeHistory: ITradeHistory }> = ({
  tradeHistory,
}) => {
  return (
    <Flex justifyContent={'space-between'} className="row-order">
      <Box w={'14.7%'} className="cell-open-order">
        {`${moment(+tradeHistory.date).format('YYYY-MM-DD hh:mm:ss')}`}
      </Box>
      <Box w={'11.03%'} className="cell-open-order">
        {tradeHistory.pair}
      </Box>
      <Box w={'10.29%'} className="cell-open-order">
        <div className={`${getLogoNetwork(tradeHistory.networkId)}`}></div>
        <span>{tradeHistory.network}</span>
      </Box>
      <Box w={'7.35%'} className="cell-open-order">
        <span>{tradeHistory.side}</span>
        <ArrowDownIcon />
      </Box>
      <Box w={'8.3%'} className="cell-open-order">
        <span>{tradeHistory.price}</span>
      </Box>
      <Box w={'8.3%'} className="cell-open-order">
        {tradeHistory.executed}
      </Box>
      <Box w={'16.91%'} className="cell-open-order">
        {tradeHistory.fee}
      </Box>
      <Box w={'8.01%'} className="cell-open-order">
        {tradeHistory.role}
      </Box>

      <Box w={'15.11%'} className="cell-open-order">
        {tradeHistory.total}
      </Box>
    </Flex>
  );
};

export default PartTradeHistory;
