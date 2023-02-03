import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AppTabs } from 'src/components';
import AppDataTable from 'src/components/AppDataTable';
import rf from 'src/services/RequestFactory';

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
}

const PartOrderHistory = () => {
  const [dataOpenOrders, setDataOpenOrders] = useState<IOpenOrder[]>([]);

  const getDataOpenOrders = async () => {
    const res = await rf.getRequest('OrderRequest').getOpenOrders();
    return res;
  };

  useEffect(() => {
    getDataOpenOrders();
  }, []);

  const _renderContentOpenOrder = (data: IOpenOrder[]) => {
    if (!data || !data.length) {
      return <></>;
    } else
      return (
        <>
          {data.map((openOrder: IOpenOrder, id: number) => {
            return <Box key={`${id}`}>{openOrder.amount}</Box>;
          })}
        </>
      );
  };

  return (
    <Box>
      <AppTabs
        tabs={[
          {
            name: 'Open order',
            content: (
              <AppDataTable
                renderBody={_renderContentOpenOrder}
                renderHeader={() => <div>header</div>}
                fetchData={getDataOpenOrders}
              />
            ),
          },
          { name: 'Order History', content: 'order history' },
          { name: 'Trade History', content: 'Trade History' },
          { name: 'Funds', content: 'Funds' },
        ]}
      />
    </Box>
  );
};

export default PartOrderHistory;
