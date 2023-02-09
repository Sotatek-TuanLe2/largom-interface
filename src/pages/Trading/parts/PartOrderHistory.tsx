import { Box, Flex } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { ArrowDownIcon, DeleteIcon, EditIcon } from 'src/assets/icons';
import AppDataTable from 'src/components/AppDataTable';
import AppRadioBtn from 'src/components/AppRadioBtn';
import rf from 'src/services/RequestFactory';
import { getLogoNetwork } from 'src/utils/network';
import { getClassNameSideCell } from './PartOpenOrder';

export const OPTIONS_RADIO: {
  value: string;
  label: string;
}[] = [
  { value: '1 Day', label: '1 Day' },
  { value: '1 Week', label: '1 Week' },
  { value: '1 Month', label: '1 Month' },
  { value: '3 Months', label: '3 Months' },
  { value: 'Time', label: 'Time' },
];

interface IOrderHistory {
  date: string;
  pair: string;
  network: string;
  networkId: string;
  type: string;
  side: string;
  price: number;
  excuted: number;
  amount: number;
  filled: number;
  total: number;
  conditions: string;
  avarage: number;
}

const PartOrderHistory = () => {
  const [valueRadio, setValueRadio] = useState('1 Day');

  const getDataOpenOrders = async () => {
    const res = await rf.getRequest('OrderRequest').getHistoryOrders();
    return res;
  };

  const _renderHeaderOpenOrder = () => {
    return (
      <Flex
        justifyContent={'space-between'}
        className="row-order order-history"
      >
        <Box className="header-order order-history--order-time">ORDER TIME</Box>
        <Box className="header-order order-history--pair">PAIR</Box>
        <Box className="header-order order-history--network">NETWORK</Box>
        <Box className="header-order order-history--type">
          <span>TYPE</span>
          <ArrowDownIcon />
        </Box>
        <Box className="header-order order-history--side">
          <span>SIDE</span>
          <ArrowDownIcon />
        </Box>
        <Box className="header-order order-history--average">AVERAGE</Box>
        <Box className="header-order order-history--price">PRICE</Box>
        <Box className="header-order order-history--excuted">EXECUTED</Box>
        <Box className="header-order order-history--amount">AMOUNT</Box>
        <Box className="header-order order-history--total">TOTAL</Box>
        <Box className="header-order order-history--condition">
          TRIGGER CONDITIONS
        </Box>
        <Box className="header-order order-history--all">
          <span>ALL</span>
          <ArrowDownIcon />
        </Box>
      </Flex>
    );
  };

  const _renderContentOrderHistory = (data: IOrderHistory[]) => {
    if (!data || !data.length) {
      return <></>;
    } else
      return (
        <div className="rows-wrap">
          {data.map((orderHistory: IOrderHistory, id: number) => {
            return (
              <RowOrderHistoryTable
                orderHistory={orderHistory}
                key={`${id}order-table`}
              />
            );
          })}
        </div>
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
      <div className="table-wrap">
        <AppDataTable
          renderBody={_renderContentOrderHistory}
          renderHeader={_renderHeaderOpenOrder}
          fetchData={getDataOpenOrders}
        />
      </div>
    </Box>
  );
};

const RowOrderHistoryTable: React.FC<{ orderHistory: IOrderHistory }> = ({
  orderHistory,
}) => {
  return (
    <Flex justifyContent={'space-between'} className="row-order order-history">
      <Box className="cell-open-order order-history--order-time">
        {`${moment(+orderHistory.date).format('YYYY-MM-DD hh:mm:ss')}`}
      </Box>
      <Box className="cell-open-order order-history--pair">
        {orderHistory.pair}
      </Box>
      <Box className={`cell-open-order order-history--network`}>
        <div className={`${getLogoNetwork(orderHistory.networkId)}`}></div>
        {orderHistory.network}
      </Box>
      <Box className="cell-open-order order-history--type">
        {orderHistory.type}
      </Box>
      <Box
        className={`cell-open-order order-history--side ${getClassNameSideCell(
          orderHistory.side,
        )}`}
      >
        {orderHistory.side}
      </Box>
      <Box className="cell-open-order order-history--average">
        <span className="price">{orderHistory.avarage}</span>
      </Box>
      <Box className="cell-open-order order-history--price">
        <span className="amount">{orderHistory.price}</span>
      </Box>
      <Box className="cell-open-order order-history--excuted">
        {orderHistory.excuted || '--'}
      </Box>
      <Box className="cell-open-order order-history--amount">
        {orderHistory.amount}
      </Box>
      <Box className="cell-open-order order-history--total">
        {orderHistory.total}
      </Box>
      <Box className="cell-open-order order-history--condition">
        {orderHistory.conditions || '--'}
      </Box>
      <Box className="cell-open-order order-history--all">
        {'Canceled'}
        {/* <DeleteIcon cursor={'pointer'} /> */}
      </Box>
    </Flex>
  );
};

export default PartOrderHistory;
