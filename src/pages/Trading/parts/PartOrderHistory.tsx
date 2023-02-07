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
      <Flex justifyContent={'space-between'} className="row-order">
        <Box w={'14.56%'} className="header-order">
          ORDER TIME
        </Box>
        <Box w={'8.82%'} className="header-order">
          PAIR
        </Box>
        <Box w={'10.29%'} className="header-order">
          NETWORK
        </Box>
        <Box w={'5.89%'} className="header-order">
          <span>TYPE</span>
          <ArrowDownIcon />
        </Box>
        <Box w={'5.89%'} className="header-order">
          <span>SIDE</span>
          <ArrowDownIcon />
        </Box>
        <Box w={'9.56%'} className="header-order">
          AVERAGE
        </Box>
        <Box w={'8.3%'} className="header-order">
          PRICE
        </Box>
        <Box w={'6.1%'} className="header-order">
          EXECUTED
        </Box>
        <Box w={'5.96%'} className="header-order">
          AMOUNT
        </Box>
        <Box w={'5.8%'} className="header-order">
          TOTAL
        </Box>
        <Box w={'11.25%'} className="header-order">
          TRIGGER CONDITIONS
        </Box>
        <Box w={'7.58%'} className="header-order">
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
        <>
          {data.map((orderHistory: IOrderHistory, id: number) => {
            return (
              <RowOrderHistoryTable
                orderHistory={orderHistory}
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
        renderBody={_renderContentOrderHistory}
        renderHeader={_renderHeaderOpenOrder}
        fetchData={getDataOpenOrders}
      />
    </Box>
  );
};

const RowOrderHistoryTable: React.FC<{ orderHistory: IOrderHistory }> = ({
  orderHistory,
}) => {
  return (
    <Flex justifyContent={'space-between'} className="row-order">
      <Box w={'14.56%'} className="cell-open-order">
        {`${moment(+orderHistory.date).format('YYYY-MM-DD hh:mm:ss')}`}
      </Box>
      <Box w={'8.82%'} className="cell-open-order">
        {orderHistory.pair}
      </Box>
      <Box w={'10.29%'} className={`cell-open-order`}>
        <div className={`${getLogoNetwork(orderHistory.networkId)}`}></div>
        {orderHistory.network}
      </Box>
      <Box w={'5.89%'} className="cell-open-order">
        {orderHistory.type}
      </Box>
      <Box
        w={'5.89%'}
        className={`cell-open-order ${getClassNameSideCell(orderHistory.side)}`}
      >
        {orderHistory.side}
      </Box>
      <Box w={'9.56%'} className="cell-open-order">
        <span className="price">{orderHistory.avarage}</span>
      </Box>
      <Box w={'8.3%'} className="cell-open-order">
        <span className="amount">{orderHistory.price}</span>
      </Box>
      <Box w={'6.1%'} className="cell-open-order">
        {orderHistory.excuted || '--'}
      </Box>
      <Box w={'5.96%'} className="cell-open-order">
        {orderHistory.amount}
      </Box>
      <Box w={'5.8%'} className="cell-open-order">
        {orderHistory.total}
      </Box>
      <Box w={'11.25%'} className="cell-open-order">
        {orderHistory.conditions || '--'}
      </Box>
      <Box w={'7.58%'} className="cell-open-order">
        {'Canceled'}
        {/* <DeleteIcon cursor={'pointer'} /> */}
      </Box>
    </Flex>
  );
};

export default PartOrderHistory;
