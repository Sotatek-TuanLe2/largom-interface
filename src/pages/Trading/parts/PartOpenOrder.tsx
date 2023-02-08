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
      <Flex justifyContent={'space-between'} className="row-order open-order">
        <Box className="header-order open-order--date">DATE</Box>
        <Box className="header-order open-order--pair">PAIR</Box>
        <Box className="header-order open-order--network">NETWORK</Box>
        <Box className="header-order open-order--type">
          <span>TYPE</span>
          <ArrowDownIcon />
        </Box>
        <Box className="header-order open-order--side">
          <span>SIDE</span>
          <ArrowDownIcon />
        </Box>
        <Box className="header-order open-order--price">PRICE</Box>
        <Box className="header-order open-order--amount">AMOUNT</Box>
        <Box className="header-order open-order--filled">FILLED</Box>
        <Box className="header-order open-order--total">TOTAL</Box>
        <Box className="header-order open-order--condition">
          TRIGGER CONDITIONS
        </Box>
        <Box className="header-order open-order--cancel-all">
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
        <div className="rows-wrap">
          {data.map((openOrder: IOpenOrder, id: number) => {
            return (
              <RowOpenOrderTable
                openOrder={openOrder}
                key={`${id}order-table`}
              />
            );
          })}
        </div>
      );
  };

  useEffect(() => {
    if (tableData.current?.tableData) {
      setCountOpenOrder(+tableData.current?.tableData.length);
    }
  }, [tableData.current]);

  return (
    <div className="table-wrap">
      <AppDataTable
        renderBody={_renderContentOpenOrder}
        renderHeader={_renderHeaderOpenOrder}
        fetchData={getDataOpenOrders}
        ref={tableData}
      />
    </div>
  );
};

const RowOpenOrderTable: React.FC<ICellOpenOrder> = ({ openOrder }) => {
  return (
    <Flex justifyContent={'space-between'} className="row-order open-order">
      <Box className="cell-open-order open-order--date">
        {`${moment(+openOrder.date).format('YYYY-MM-DD')}`}
      </Box>
      <Box className="cell-open-order open-order--pair">{openOrder.pair}</Box>
      <Box className={`cell-open-order open-order--network`}>
        <div className={`${getLogoNetwork(openOrder.networkId)}`}></div>
        {openOrder.network}
      </Box>
      <Box className="cell-open-order open-order--type">{openOrder.type}</Box>
      <Box
        className={`cell-open-order open-order--side ${getClassNameSideCell(
          openOrder.side,
        )}`}
      >
        {openOrder.side}
      </Box>
      <Box className="cell-open-order open-order--price">
        <span className="text-price">{openOrder.price}</span>
        <span>
          <EditIcon cursor={'pointer'} />
        </span>
      </Box>
      <Box className="cell-open-order open-order--amount">
        <span className="text-amount">{openOrder.amount}</span>
        <span>
          <EditIcon cursor={'pointer'} />
        </span>
      </Box>
      <Box className="cell-open-order open-order--filled">
        {openOrder.filled}
      </Box>
      <Box className="cell-open-order open-order--total">{openOrder.total}</Box>
      <Box className="cell-open-order open-order--condition">
        {openOrder.conditions || '--'}
      </Box>
      <Box className="cell-open-order open-order--cancel-all">
        <DeleteIcon cursor={'pointer'} />
      </Box>
    </Flex>
  );
};

export default PartOpenOrder;
