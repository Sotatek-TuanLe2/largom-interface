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
            name: <Box py={'14px'}>{`Open order(${countOpenOrder})`}</Box>,
            content: <PartOpenOrder setCountOpenOrder={setCountOpenOrder} />,
          },
          {
            name: <Box py={'14px'}>Order History</Box>,
            content: <PartOrderHistory />,
          },
          {
            name: <Box py={'14px'}>Trade History</Box>,
            content: 'Trade History',
          },
          { name: <Box py={'14px'}>Funds</Box>, content: 'Funds' },
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
