import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { AppTabs } from 'src/components';
import AppCheckbox from 'src/components/AppCheckbox';
import PartOpenOrder from './PartOpenOrder';
import PartOrderHistory from './PartOrderHistory';

const PartUserInfoTransaction = () => {
  const [countOpenOrder, setCountOpenOrder] = useState(0);
  return (
    <Box className="order-wrap">
      <AppTabs
        tabs={[
          {
            id: 'Openorder',
            name: `Open order(${countOpenOrder})`,
            content: <PartOpenOrder setCountOpenOrder={setCountOpenOrder} />,
          },
          {
            id: 'OrderHistory',
            name: 'Order History',
            content: <PartOrderHistory />,
          },
          {
            id: 'TradeHistory',
            name: 'Trade History',
            content: 'Trade History',
          },
          { id: 'Fund', name: 'Funds', content: 'Funds' },
        ]}
        rightElement={
          <div className="hide-pair">
            <AppCheckbox label="Hide other pair" />
          </div>
        }
      />
    </Box>
  );
};

export default PartUserInfoTransaction;
