import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ArrowDownIcon, ArrowLightIcon } from 'src/assets/icons';
import AppDataTable from 'src/components/AppDataTable';
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
  const getDataFunds = async () => {
    const res = await rf.getRequest('OrderRequest').getFunds();
    return res;
  };

  const _renderHeaderFunds = () => {
    return (
      <Flex justifyContent={'space-between'} className="row-order">
        <Box w={'14.7%'} className="header-order">
          COIN
        </Box>
        <Box w={'16.17%'} className="header-order">
          NETWORK
        </Box>
        <Box w={'17.65%'} className="header-order">
          TOTAL BALANCE
        </Box>
        <Box w={'17.65%'} className="header-order">
          <span>AVAILABLE BALANCE</span>
          <ArrowDownIcon />
        </Box>
        <Box w={'16.17%'} className="header-order">
          <span>IN ORDER</span>
        </Box>
        <Box w={'17.66%'} className="header-order">
          BTC VALUE
        </Box>
      </Flex>
    );
  };

  const _renderContentFunds = (funds: IFund[]) => {
    if (!funds || !funds.length) {
      return <></>;
    } else
      return (
        <>
          {funds.map((fund: IFund, id: number) => {
            return <RowFundsTable fund={fund} key={`${id}order-table`} />;
          })}
        </>
      );
  };

  return (
    <div>
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
    <Flex direction={'column'} className="row-fund">
      <Flex justifyContent={'space-between'} className="row-order">
        <Box w={'14.7%'} className="cell-open-order">
          <span>{fund.coin}</span>
          <span
            onClick={() => setHiddenChildren((pre) => !pre)}
            className={hiddenChildren ? 'arrow-right' : ''}
          >
            <ArrowLightIcon cursor={'pointer'} />
          </span>
        </Box>
        <Box w={'16.17%'} className="cell-open-order">
          <div className={`${getLogoNetwork(fund.networkId)}`}></div>
          <span>{fund.network}</span>
        </Box>
        <Box w={'17.65%'} className="cell-open-order">
          {fund.total_balance}
        </Box>
        <Box w={'17.65%'} className="cell-open-order">
          <span>{fund.available_balance}</span>
          {/* <ArrowDownIcon /> */}
        </Box>
        <Box w={'16.17%'} className="cell-open-order">
          <span>{fund.in_order}</span>
        </Box>
        <Box w={'17.66%'} className="cell-open-order">
          {fund.btc_value}
        </Box>
      </Flex>
      <Flex direction={'column'} display={hiddenChildren ? 'none' : 'flex'}>
        {!!fund?.child &&
          fund?.child.map((child, id) => {
            return (
              <Flex
                justifyContent={'space-between'}
                className="row-order"
                w={'100%'}
                key={id}
              >
                <Box w={'14.7%'} className="cell-open-order"></Box>
                <Box w={'16.17%'} className="cell-open-order">
                  <div className={`${getLogoNetwork(child.networkId)}`}></div>
                  <span>{child.network}</span>
                </Box>
                <Box w={'17.65%'} className="cell-open-order">
                  {child.total_balance}
                </Box>
                <Box w={'17.65%'} className="cell-open-order">
                  <span>{child.available_balance}</span>
                  {/* <ArrowDownIcon /> */}
                </Box>
                <Box w={'16.17%'} className="cell-open-order">
                  <span>{child.in_order}</span>
                </Box>
                <Box w={'17.66%'} className="cell-open-order">
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
