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
      <Flex
        justifyContent={'space-between'}
        className="row-order trade-history"
      >
        <Box w={'14.7%'} className="header-order trade-history--date">
          DATE
        </Box>
        <Box w={'11.03%'} className="header-order trade-history--pair">
          PAIR
        </Box>
        <Box w={'10.29%'} className="header-order trade-history--network">
          NETWORK
        </Box>
        <Box w={'7.35%'} className="header-order trade-history--side">
          <span>SIDE</span>
          <ArrowDownIcon />
        </Box>
        <Box w={'8.3%'} className="header-order trade-history--price">
          <span>PRICE</span>
        </Box>
        <Box w={'8.3%'} className="header-order trade-history--excuted">
          EXECUTED
        </Box>
        <Box w={'16.91%'} className="header-order trade-history--fee">
          FEE
        </Box>
        <Box w={'8.01%'} className="header-order trade-history--role">
          ROLE
        </Box>

        <Box w={'15.11%'} className="header-order trade-history--total">
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
        <div className="rows-wrap">
          {data.map((orderHistory: ITradeHistory, id: number) => {
            return (
              <RowTradingHistoryTable
                tradeHistory={orderHistory}
                key={`${id}order-table`}
              />
            );
          })}
        </div>
      );
  };

  return (
    <Box className="trade-history-wrap">
      <div className="search">
        <AppRadioBtn
          value={valueRadio}
          onChange={setValueRadio}
          options={OPTIONS_RADIO}
        />
      </div>
      <div className="table-wrap">
        <AppDataTable
          renderBody={_renderContentTradeHistory}
          renderHeader={_renderHeaderTradeHistory}
          fetchData={getDataTradeHistory}
        />
      </div>
    </Box>
  );
};

const RowTradingHistoryTable: React.FC<{ tradeHistory: ITradeHistory }> = ({
  tradeHistory,
}) => {
  return (
    <Flex justifyContent={'space-between'} className="row-order trade-history">
      <Box w={'14.7%'} className="cell-open-order trade-history--date">
        {`${moment(+tradeHistory.date).format('YYYY-MM-DD hh:mm:ss')}`}
      </Box>
      <Box w={'11.03%'} className="cell-open-order trade-history--pair">
        {tradeHistory.pair}
      </Box>
      <Box w={'10.29%'} className="cell-open-order trade-history--network">
        <div className={`${getLogoNetwork(tradeHistory.networkId)}`}></div>
        <span>{tradeHistory.network}</span>
      </Box>
      <Box w={'7.35%'} className="cell-open-order trade-history--side">
        <span>{tradeHistory.side}</span>
        <ArrowDownIcon />
      </Box>
      <Box w={'8.3%'} className="cell-open-order trade-history--price">
        <span>{tradeHistory.price}</span>
      </Box>
      <Box w={'8.3%'} className="cell-open-order trade-history--excuted">
        {tradeHistory.executed}
      </Box>
      <Box w={'16.91%'} className="cell-open-order trade-history--fee">
        {tradeHistory.fee}
      </Box>
      <Box w={'8.01%'} className="cell-open-order trade-history--role">
        {tradeHistory.role}
      </Box>

      <Box w={'15.11%'} className="cell-open-order trade-history--total">
        {tradeHistory.total}
      </Box>
    </Flex>
  );
};

export default PartTradeHistory;
