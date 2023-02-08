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
        <Box className="header-order order-time">ORDER TIME</Box>
        <Box className="header-order pair">PAIR</Box>
        <Box className="header-order network">NETWORK</Box>
        <Box className="header-order type">
          <span>TYPE</span>
          <ArrowDownIcon />
        </Box>
        <Box className="header-order side">
          <span>SIDE</span>
          <ArrowDownIcon />
        </Box>
        <Box className="header-order average">AVERAGE</Box>
        <Box className="header-order price">PRICE</Box>
        <Box className="header-order excuted">EXECUTED</Box>
        <Box className="header-order amount">AMOUNT</Box>
        <Box className="header-order total">TOTAL</Box>
        <Box className="header-order condition">TRIGGER CONDITIONS</Box>
        <Box className="header-order all">
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
      <Box className="cell-open-order order-time">
        {`${moment(+orderHistory.date).format('YYYY-MM-DD hh:mm:ss')}`}
      </Box>
      <Box className="cell-open-order pair">{orderHistory.pair}</Box>
      <Box className={`cell-open-order network`}>
        <div className={`${getLogoNetwork(orderHistory.networkId)}`}></div>
        {orderHistory.network}
      </Box>
      <Box className="cell-open-order type">{orderHistory.type}</Box>
      <Box
        className={`cell-open-order side ${getClassNameSideCell(
          orderHistory.side,
        )}`}
      >
        {orderHistory.side}
      </Box>
      <Box className="cell-open-order average">
        <span className="price">{orderHistory.avarage}</span>
      </Box>
      <Box className="cell-open-order price">
        <span className="amount">{orderHistory.price}</span>
      </Box>
      <Box className="cell-open-order excuted">
        {orderHistory.excuted || '--'}
      </Box>
      <Box className="cell-open-order amount">{orderHistory.amount}</Box>
      <Box className="cell-open-order total">{orderHistory.total}</Box>
      <Box className="cell-open-order condition">
        {orderHistory.conditions || '--'}
      </Box>
      <Box className="cell-open-order all">
        {'Canceled'}
        {/* <DeleteIcon cursor={'pointer'} /> */}
      </Box>
    </Flex>
  );
};

export default PartOrderHistory;
