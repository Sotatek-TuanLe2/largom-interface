import React, { useState } from 'react';
import { ThemeName } from 'src/charting_library/charting_library.min';
import TradingView from 'src/components/TradingView';
import 'src/styles/components/Chart.scss';
import { isMobile } from 'react-device-detect';

interface Props {
  theme?: ThemeName;
  containerId: string;
  symbol?: string;
  className?: string;
}

const CandlestickChart: React.FC<Props> = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const fullScreen = (flag: boolean) => {
    setIsFullScreen(flag);
  };

  return (
    <div
      className={isFullScreen ? 'parent' : ''}
      style={{ height: isMobile ? '334px' : '100% ', width: '100%' }}
    >
      <TradingView
        containerId={'tv_chart_container'}
        setFullScreen={fullScreen}
        fullscreen={false}
      />
    </div>
  );
};
export default CandlestickChart;
