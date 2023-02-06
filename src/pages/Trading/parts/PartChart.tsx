import React, { useState } from 'react';
import { ThemeName } from 'src/charting_library/charting_library.min';
import TradingView from 'src/components/TradingView';
import 'src/styles/components/Chart.scss';
import { isMobile } from 'react-device-detect';
import { AppTabs } from 'src/components';
import { Box, Flex } from '@chakra-ui/react';
import rf from 'src/services/RequestFactory';

interface Props {
  theme?: ThemeName;
  containerId: string;
  symbol?: string;
  className?: string;
}

const PartChart: React.FC<Props> = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const fetchDataTradingView = async () => {
    const data = await rf.getRequest('TradingRequest').getCandleChartData();
    return data;
  };

  const fullScreen = (flag: boolean) => {
    setIsFullScreen(flag);
  };

  const _renderTradingViewChart = () => {
    return (
      <div
        className={isFullScreen ? 'parent' : ''}
        style={{ height: isMobile ? '334px' : '100% ', width: '100%' }}
      >
        <TradingView
          fetchData={fetchDataTradingView}
          containerId={'tv_chart_container'}
          setFullScreen={fullScreen}
          fullscreen={false}
        />
      </div>
    );
  };

  return (
    <Box height={'100%'}>
      <AppTabs
        tabs={[
          {
            id: 'trading-view',
            name: 'Trading View',
            content: _renderTradingViewChart(),
          },
          {
            id: 'depth',
            name: 'Depth',
            content: '',
          },
        ]}
      />
    </Box>
  );
};
export default PartChart;