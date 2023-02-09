import { Box, Flex } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { AppConnectWalletButton, AppTabs } from 'src/components';
import AppCheckbox from 'src/components/AppCheckbox';
import PartOpenOrder from './PartOpenOrder';
import PartOrderHistory from './PartOrderHistory';
import { ITabs } from 'src/components/AppTabs';
import { useWallet } from 'src/hooks';
import PartTradeHistory from './PartTradeHistory';
import PartFunds from './PartFunds';

const PartUserTradeInfo = () => {
  const [countOpenOrder, setCountOpenOrder] = useState(0);
  const [currentTab, setCurrentTab] = useState<string>('OpenOrder');
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
      id: 'OpenOrder',
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
      content: _renderTab(<PartTradeHistory />),
    },
    { id: 'Fund', name: 'Funds', content: _renderTab(<PartFunds />) },
  ];

  const onChange = (indexTab: string) => {
    setCurrentTab(indexTab);
  };

  const getRightElement = () => {
    if (currentTab === 'OpenOrder' || currentTab === 'OrderHistory') {
      return (
        <div className="hide-pair">
          <AppCheckbox label="Hide   pair" />
        </div>
      );
    } else if (currentTab === 'TradeHistory' || currentTab === 'Fund') {
      return (
        <div className="hide-pair">
          <AppCheckbox label="Hide low balance assets" />
        </div>
      );
    }
  };
  return (
    <Box className="order-wrap">
      <AppTabs tabs={tabs} rightElement={getRightElement} onChange={onChange} />
    </Box>
  );
};

export default PartUserTradeInfo;
