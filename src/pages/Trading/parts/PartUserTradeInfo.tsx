import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { AppTabs } from 'src/components';
import AppCheckbox from 'src/components/AppCheckbox';
import PartOpenOrder from './PartOpenOrder';
import PartOrderHistory from './PartOrderHistory';

const PartUserTradeInfo = () => {
  const [countOpenOrder, setCountOpenOrder] = useState(0);
  const tabs = [
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
  ];

  const rightElement = () => (
    <div className="hide-pair">
      <AppCheckbox label="Hide other pair" />
    </div>
  );
  return (
    <Box className="order-wrap">
      <AppTabs tabs={tabs} rightElement={rightElement()} />
    </Box>
  );
};

export default PartUserTradeInfo;
