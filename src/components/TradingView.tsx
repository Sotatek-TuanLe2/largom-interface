/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef, useState } from 'react';
import {
  HistoryCallback,
  IBasicDataFeed,
  IChartingLibraryWidget,
  LibrarySymbolInfo,
  ResolutionString,
  ResolveCallback,
  SubscribeBarsCallback,
  ThemeName,
  TradingTerminalWidgetOptions,
  widget,
} from 'src/charting_library/charting_library.min';
import {
  createEmptyCandleIfNeeded,
  DEFAULT_TRADING_VIEW_INTERVAL,
  getClientTimezone,
  getResolutionInMinutes,
  getResolutionString,
} from 'src/utils/chart';
// import { SocketEvent } from 'src/socket/SocketEvent';
import { ICandle } from 'src/utils/types';
import { SYMBOL_TYPE, THEME_MODE } from 'src/utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
// import { roundNumberWithBase } from 'src/utils/format';

interface obj {
  [key: string]: boolean | number | string;
}

interface Props {
  containerId: string;
  libraryPath?: string;
  chartsStorageUrl?: string;
  chartsStorageApiVersion?: '1.0' | '1.1';
  clientId?: string;
  userId?: string;
  fullscreen?: boolean;
  autosize?: boolean;
  studiesOverrides?: obj;
  className?: string;
  setFullScreen: (flag: boolean) => void;
  height?: number;
  fetchData: () => any;
}

const configurationData = {
  supports_search: true,
  supports_marks: true,
  intraday_multipliers: [
    '1',
    '3',
    '5',
    '15',
    '30',
    '60',
    '120',
    '240',
    '360',
    '480',
    '720',
  ],
  supported_resolutions: [
    '1',
    '3',
    '5',
    '15',
    '30',
    '60',
    '120',
    '240',
    '360',
    '480',
    '720',
    '1D',
    '3D',
    '1W',
  ],
};

const getBackgroundColor = (theme: string): string => {
  return theme === THEME_MODE.LIGHT ? '#fafafc' : '#1c1c28';
};

const TradingView: React.FC<Props> = (props) => {
  const listDisable = [
    'header_symbol_search',
    'header_undo_redo',
    'display_market_status',
    'timeframes_toolbar',
    'edit_buttons_in_legend',
    'volume_force_overlay',
    'legend_context_menu',
    'left_toolbar',
  ];

  const theme = 'dark';
  const tradingViewTheme = (theme.charAt(0).toUpperCase() +
    theme.slice(1)) as ThemeName;
  const interval = getResolutionInMinutes(DEFAULT_TRADING_VIEW_INTERVAL);

  const { instrument } = useSelector(
    (state: RootState) => state.metadata.trading,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tradingViewChart, setTradingViewChart] =
    useState<IChartingLibraryWidget>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isChartReady, setChartReady] = useState(false);

  const intervalInMillisecondsRef = useRef<number>(
    getResolutionInMinutes(DEFAULT_TRADING_VIEW_INTERVAL) * 60 * 1000,
  );
  const lastCandleRef = useRef<ICandle>({} as ICandle);
  const chartRealtimeCallback = useRef<(candle: ICandle) => void>(() => {});

  const onReady = (callback: any) => {
    setTimeout(() => callback(configurationData));
  };

  const getBars = async (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    from: number,
    to: number,
    onResult: HistoryCallback,
  ) => {
    // const intervalInSeconds = getResolutionInMinutes(resolution) * 60;
    // const startTime = roundNumberWithBase(from, intervalInSeconds) * 1000;
    // const endTime = roundNumberWithBase(to, intervalInSeconds) * 1000;

    try {
      // const params = {
      //   from: startTime,
      //   to: endTime,
      //   resolution: resolution,
      // };
      // const candleUrl = `candle/${instrument.symbol}/candles`;

      const data: any = await props.fetchData();
      if (data.length === 0) {
        onResult([], {
          noData: true,
        });
        return;
      } else {
        if (data[data.length - 1].time > Date.now()) {
          data.pop();
        }
      }
      const bars: any = data.map((bar: any) => ({
        time: bar.time,
        close: bar.close,
        open: bar.open,
        high: bar.high,
        low: bar.low,
        volume: bar.volume,
      }));

      lastCandleRef.current = bars[bars.length - 1];
      onResult(bars, { noData: false });
    } catch (error) {
      onResult([], { noData: true });
    }
  };

  const resolveSymbol = async (
    symbolName: string,
    onSymbolResolvedCallback: ResolveCallback,
  ) => {
    const symbol = instrument.symbol;
    const symbolInfo: LibrarySymbolInfo = {
      ticker: symbol,
      name: symbol,
      description: symbol,
      pricescale: 1 / Number(instrument.tickSize),
      volume_precision: -Math.ceil(
        Math.log10(
          Number(instrument.contractSize) * Number(instrument.lotSize),
        ),
      ),
      minmov: 1,
      exchange: '',
      full_name: '',
      listed_exchange: '',
      session: '24x7',
      has_intraday: true,
      has_daily: true,
      has_weekly_and_monthly: false,
      intraday_multipliers: configurationData.intraday_multipliers,
      timezone: getClientTimezone(),
      type: SYMBOL_TYPE.bitcoin,
      supported_resolutions: configurationData.supported_resolutions,
    };
    onSymbolResolvedCallback(symbolInfo);
  };

  const subscribeBars = (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onRealtimeCallback: SubscribeBarsCallback,
  ) => {
    // chartRealtimeCallback.current = onRealtimeCallback;
    // AppBroadcast.remove(SocketEvent.TradesCreated);
    // AppBroadcast.on(SocketEvent.TradesCreated, (trades: ITrade[]) => {
    //   const intervalInMilliseconds = intervalInMillisecondsRef.current;
    //   trades.forEach((trade: any) => {
    //     lastCandleRef.current = addTradeToLastCandle(
    //       trade,
    //       lastCandleRef.current,
    //       intervalInMilliseconds,
    //       chartRealtimeCallback.current,
    //     );
    //   });
    // });
  };

  const datafeed: IBasicDataFeed = {
    onReady,
    searchSymbols: () => {},
    resolveSymbol,
    getBars,
    subscribeBars,
    unsubscribeBars: () => {},
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      const lastCandle = lastCandleRef.current;
      const intervalInMilliseconds = intervalInMillisecondsRef.current;
      lastCandleRef.current = createEmptyCandleIfNeeded(
        lastCandle,
        intervalInMilliseconds,
        chartRealtimeCallback.current,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // tradingViewChart?.changeTheme(tradingViewTheme);
    // tradingViewChart?.applyOverrides({
    //   'paneProperties.background': getBackgroundColor(theme),
    // });
  }, [theme]);

  useEffect(() => {
    const widgetOptions: TradingTerminalWidgetOptions = {
      locale: 'en',
      theme: tradingViewTheme,
      autosize: true,
      fullscreen: false,
      datafeed: datafeed,
      disabled_features: listDisable,
      interval: DEFAULT_TRADING_VIEW_INTERVAL,
      enabled_features: [],
      overrides: {
        volumePaneSize: 'medium',
        'paneProperties.background': getBackgroundColor(theme),
      },
      symbol: instrument.symbol,
      timezone: getClientTimezone(),
      library_path: props.libraryPath,
      charts_storage_api_version: props.chartsStorageApiVersion,
      charts_storage_url: props.chartsStorageUrl,
      user_id: props.userId,
      client_id: props.clientId,
      studies_overrides: {
        'volume.show ma': true,
      },
      container_id: props.containerId,
    };
    const chart = new widget(widgetOptions);
    setTradingViewChart(chart);
    chart.onChartReady(() => {
      setChartReady(true);
      chart.chart().setResolution(getResolutionString(interval), () => {});
      chart.applyOverrides({ 'paneProperties.topMargin': 15 });
      chart
        .chart()
        .onIntervalChanged()
        .subscribe(null, function (interval) {
          intervalInMillisecondsRef.current =
            getResolutionInMinutes(interval) * 60 * 1000;
        });
    });
  }, [instrument.symbol]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div
        style={{
          height: '100%',
          borderRadius: '4px',
          overflow: 'hidden',
          marginLeft: '-6px',
          marginRight: '-6px',
        }}
        id={props.containerId}
      />
    </div>
  );
};

TradingView.defaultProps = {
  containerId: 'tv_chart_container',
  libraryPath: '/charting_library/',
  chartsStorageApiVersion: '1.1',
  clientId: 'tradingview.com',
  userId: 'public_user_id',
  fullscreen: true,
  height: 500,
  autosize: true,
  studiesOverrides: {
    'volume.volume.color.0': 'rgba(247, 73, 64, 0.19)',
    'volume.volume.color.1': 'rgba(41, 155, 130, 0.2)',
    'volume.volume.transparency': 15,
    'volume.volume ma.color': '#f74940',
    'volume.volume ma.transparency': 0,
    'volume.volume ma.linewidth': 1,
    'volume.volume ma.plottype': 'line',
    'volume.show ma': true,
  },
};
export default TradingView;
