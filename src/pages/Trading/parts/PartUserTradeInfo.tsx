import { Box, Flex } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { AppConnectWalletButton, AppTabs } from 'src/components';
import AppCheckbox from 'src/components/AppCheckbox';
import PartOpenOrder from './PartOpenOrder';
import PartOrderHistory from './PartOrderHistory';
import { ITabs } from 'src/components/AppTabs';
import { useWallet } from 'src/hooks';

const PartUserTradeInfo = () => {
  const [countOpenOrder, setCountOpenOrder] = useState(0);
  const { wallet } = useWallet();

  const _renderTab = (content: ReactNode) => {
    if (!wallet) {
      return (
        <Flex className="order-wrap__content-tab" justifyContent="center">
          <AppConnectWalletButton>Connect Wallet</AppConnectWalletButton>
        </Flex>
      );
    }
    return <Box>{content}</Box>;
  };

  const tabs: ITabs[] = [
    {
      id: 'Openorder',
      name: `Open order(${countOpenOrder})`,
      content: _renderTab(
        <PartOpenOrder setCountOpenOrder={setCountOpenOrder} />,
      ),
    },
    {
      id: 'OrderHistory',
      name: 'Order History',
      content: _renderTab(<PartOrderHistory />),
    },
    {
      id: 'TradeHistory',
      name: 'Trade History',
      content: _renderTab('Trade History'),
    },
    { id: 'Fund', name: 'Funds', content: _renderTab('Funds') },
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
