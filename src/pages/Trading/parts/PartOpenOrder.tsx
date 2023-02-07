import { Box, Flex } from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon, DeleteIcon, EditIcon } from 'src/assets/icons';
import AppDataTable from 'src/components/AppDataTable';
import rf from 'src/services/RequestFactory';
import { getLogoNetwork } from 'src/utils/network';

interface IOpenOrder {
  amount: number;
  conditions: string;
  date: string;
  filled: number;
  network: string;
  pair: string;
  price: number;
  side: string;
  total: number;
  type: string;
  networkId: string;
}

interface ICellOpenOrder {
  openOrder: IOpenOrder;
}

interface IPartOpenOrder {
  setCountOpenOrder: (params: number) => void;
}

export const getClassNameSideCell = (side: string) => {
  switch (side) {
    case 'Sell':
      return 'sell';
    case 'Buy':
      return 'buy';
    default:
      return 'buy';
  }
};

const PartOpenOrder: React.FC<IPartOpenOrder> = ({ setCountOpenOrder }) => {
  const tableData = useRef<any>();
  const getDataOpenOrders = async () => {
    const res = await rf.getRequest('OrderRequest').getOpenOrders();
    return res;
  };

  const _renderHeaderOpenOrder = () => {
    return (
      <Flex justifyContent={'space-between'} className="row-order">
        <Box w={'13.23%'} className="header-order">
          DATE
        </Box>
        <Box w={'8.09%'} className="header-order">
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
          PRICE
        </Box>
        <Box w={'8.82%'} className="header-order">
          AMOUNT
        </Box>
        <Box w={'5.89%'} className="header-order">
          FILLED
        </Box>
        <Box w={'10.29%'} className="header-order">
          TOTAL
        </Box>
        <Box w={'12.57%'} className="header-order">
          TRIGGER CONDITIONS
        </Box>
        <Box w={'9.48%'} className="header-order">
          <span>CANCEL ALL</span>
          <ArrowDownIcon />
        </Box>
      </Flex>
    );
  };

  const _renderContentOpenOrder = (data: IOpenOrder[]) => {
    if (!data || !data.length) {
      return <></>;
    } else
      return (
        <>
          {data.map((openOrder: IOpenOrder, id: number) => {
            return (
              <RowOpenOrderTable
                openOrder={openOrder}
                key={`${id}order-table`}
              />
            );
          })}
        </>
      );
  };

  useEffect(() => {
    if (tableData.current?.tableData) {
      setCountOpenOrder(+tableData.current?.tableData.length);
    }
  }, [tableData.current]);

  return (
    <AppDataTable
      renderBody={_renderContentOpenOrder}
      renderHeader={_renderHeaderOpenOrder}
      fetchData={getDataOpenOrders}
      ref={tableData}
    />
  );
};

const RowOpenOrderTable: React.FC<ICellOpenOrder> = ({ openOrder }) => {
  return (
    <Flex justifyContent={'space-between'} className="row-order">
      <Box w={'13.23%'} className="cell-open-order">
        {`${moment(+openOrder.date).format('YYYY-MM-DD')}`}
      </Box>
      <Box w={'8.09%'} className="cell-open-order">
        {openOrder.pair}
      </Box>
      <Box w={'10.29%'} className={`cell-open-order`}>
        <div className={`${getLogoNetwork(openOrder.networkId)}`}></div>
        {openOrder.network}
      </Box>
      <Box w={'5.89%'} className="cell-open-order">
        {openOrder.type}
      </Box>
      <Box
        w={'5.89%'}
        className={`cell-open-order ${getClassNameSideCell(openOrder.side)}`}
      >
        {openOrder.side}
      </Box>
      <Box w={'9.56%'} className="cell-open-order">
        <span className="price">{openOrder.price}</span>
        <span>
          <EditIcon cursor={'pointer'} />
        </span>
      </Box>
      <Box w={'8.82%'} className="cell-open-order">
        <span className="amount">{openOrder.amount}</span>
        <span>
          <EditIcon cursor={'pointer'} />
        </span>
      </Box>
      <Box w={'5.89%'} className="cell-open-order">
        {openOrder.filled}
      </Box>
      <Box w={'10.29%'} className="cell-open-order">
        {openOrder.total}
      </Box>
      <Box w={'12.57%'} className="cell-open-order">
        {openOrder.conditions || '--'}
      </Box>
      <Box w={'9.48%'} className="cell-open-order">
        <DeleteIcon cursor={'pointer'} />
      </Box>
    </Flex>
  );
};

export default PartOpenOrder;
