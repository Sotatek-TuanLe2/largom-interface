import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ArrowLightIcon } from 'src/assets/icons';
import { AppTableSorting } from 'src/components';
import AppDataTable from 'src/components/AppDataTable';
import { ISorter } from 'src/components/AppTableSorting';
import rf from 'src/services/RequestFactory';
import { getLogoNetwork } from 'src/utils/network';

interface IFund {
  coin: string;
  network: string;
  networkId: string;
  total_balance: number;
  available_balance: number;
  in_order: number;
  btc_value: number;
  child?: IFund[];
}

const PartFunds = () => {
  const [sorter, setSorter] = useState<ISorter>({ sortBy: '', order: '' });
  const onSort = (sorter: ISorter) => {
    setSorter({ ...sorter });
  };
  const getDataFunds = async () => {
    const res = await rf.getRequest('OrderRequest').getFunds();
    return res;
  };

  const _renderHeaderFunds = () => {
    return (
      <Flex justifyContent={'space-between'} className="row-order funds">
        <Box className="header-order funds--coin">
          <AppTableSorting
            sortBy="coin"
            activeSort={sorter.sortBy}
            title="COIN"
            onSort={onSort}
          />
        </Box>
        <Box className="header-order funds--network">
          <AppTableSorting
            sortBy="network"
            activeSort={sorter.sortBy}
            title="NETWORK"
            onSort={onSort}
          />
        </Box>
        <Box className="header-order funds--total-balance">
          <AppTableSorting
            sortBy="total-balance"
            activeSort={sorter.sortBy}
            title="TOTAL BALANCE"
            onSort={onSort}
          />
        </Box>
        <Box className="header-order funds--avail-balance">
          <AppTableSorting
            sortBy="avail-balance"
            activeSort={sorter.sortBy}
            title="AVAILABLE BALANCE"
            onSort={onSort}
          />
        </Box>
        <Box className="header-order funds--in-order">
          <AppTableSorting
            sortBy="in-order"
            activeSort={sorter.sortBy}
            title="IN ORDER"
            onSort={onSort}
          />
        </Box>
        <Box className="header-order funds--btc-value">
          <AppTableSorting
            sortBy="btc-value"
            activeSort={sorter.sortBy}
            title="BTC VALUE"
            onSort={onSort}
          />
        </Box>
      </Flex>
    );
  };

  const _renderContentFunds = (funds: IFund[]) => {
    if (!funds || !funds.length) {
      return <></>;
    } else
      return (
        <div className="rows-wrap funds">
          {funds.map((fund: IFund, id: number) => {
            return <RowFundsTable fund={fund} key={`${id}order-table`} />;
          })}
        </div>
      );
  };

  return (
    <div className="table-wrap">
      <AppDataTable
        renderBody={_renderContentFunds}
        renderHeader={_renderHeaderFunds}
        fetchData={getDataFunds}
      />
    </div>
  );
};

const RowFundsTable: React.FC<{ fund: IFund }> = ({ fund }) => {
  const [hiddenChildren, setHiddenChildren] = useState(true);
  return (
    <Flex direction={'column'} className="row-fund" cursor={'pointer'}>
      <Flex
        justifyContent={'space-between'}
        className="row-order funds"
        onClick={() => setHiddenChildren((pre) => !pre)}
      >
        <Box className="cell-open-order funds--coin">
          <span>{fund.coin}</span>
          <span className={hiddenChildren ? 'arrow-right' : ''}>
            <ArrowLightIcon />
          </span>
        </Box>
        <Box className="cell-open-order funds--network">
          <div className={`${getLogoNetwork(fund.networkId)}`}></div>
          <span>{fund.network}</span>
        </Box>
        <Box className="cell-open-order funds--total-balance">
          {fund.total_balance}
        </Box>
        <Box className="cell-open-order funds--avail-balance">
          <span>{fund.available_balance}</span>
          {/* <ArrowDownIcon /> */}
        </Box>
        <Box className="cell-open-order funds--in-order">
          <span>{fund.in_order}</span>
        </Box>
        <Box className="cell-open-order funds--btc-value">{fund.btc_value}</Box>
      </Flex>
      <Flex direction={'column'} display={hiddenChildren ? 'none' : 'flex'}>
        {!!fund?.child &&
          fund?.child.map((child, id) => {
            return (
              <Flex
                justifyContent={'space-between'}
                className="row-order funds"
                w={'100%'}
                key={id}
              >
                <Box className="cell-open-order funds--coin"></Box>
                <Box className="cell-open-order funds--network">
                  <div className={`${getLogoNetwork(child.networkId)}`}></div>
                  <span>{child.network}</span>
                </Box>
                <Box className="cell-open-order funds--total-balance">
                  {child.total_balance}
                </Box>
                <Box className="cell-open-order funds--avail-balance">
                  <span>{child.available_balance}</span>
                  {/* <ArrowDownIcon /> */}
                </Box>
                <Box className="cell-open-order  funds--in-order">
                  <span>{child.in_order}</span>
                </Box>
                <Box className="cell-open-order funds--btc-value">
                  {child.btc_value}
                </Box>
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
};

export default PartFunds;
