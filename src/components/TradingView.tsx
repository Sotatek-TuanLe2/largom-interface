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
import { Candle, Instrument } from 'src/common/interfaces';
import {
  createEmptyCandleIfNeeded,
  DEFAULT_TRADING_VIEW_INTERVAL,
  getClientTimezone,
  getInterval,
  getIntervalString,
  round,
} from 'src/helpers/chart';
// import { SocketEvent } from 'src/socket/SocketEvent';
import { SYMBOL_TYPE, THEME_MODE } from 'src/common/constant';
import rf from 'src/services/RequestFactory';

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
  console.log('props', props);
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

  const instrument: Instrument = {
    baseUnderlying: 'null',
    contractSize: '0.00000100',
    createdAt: '1637032860000',
    deleverageable: true,
    expiry: '',
    fundingBaseIndex: '',
    fundingInterval: 0,
    fundingPremiumIndex: '',
    fundingQuoteIndex: '',
    hasLiquidity: true,
    id: 1,
    initMargin: '0.01000000',
    lotSize: '100.00000000',
    maintainMargin: '0.00500000',
    makerFee: '0.00025000',
    maxOrderQty: 1000,
    maxPrice: '10000000.00000000',
    multiplier: '1.00000000',
    optionKoPrice: '',
    optionStrikePrice: '',
    quoteCurrency: 'USD',
    rank: 1,
    referenceIndex: '',
    riskLimit: '100000000.00000000',
    riskStep: '',
    rootSymbol: 'BTC',
    settleCurrency: '',
    settlementFee: '0.00000000',
    settlementIndex: '',
    state: '',
    symbol: 'BTCUSD',
    takerFee: '0.00075000',
    tickSize: '0.01000000',
    type: 0,
    underlyingSymbol: '',
    updatedAt: '1637032860000',
  };
  const interval = getInterval(DEFAULT_TRADING_VIEW_INTERVAL);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tradingViewChart, setTradingViewChart] =
    useState<IChartingLibraryWidget>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isChartReady, setChartReady] = useState(false);

  const intervalInMillisecondsRef = useRef<number>(
    getInterval(DEFAULT_TRADING_VIEW_INTERVAL) * 60 * 1000,
  );
  const lastCandleRef = useRef<Candle>({} as Candle);
  const chartRealtimeCallback = useRef<(candle: Candle) => void>(() => {});

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
    const intervalInSeconds = getInterval(resolution) * 60;
    const startTime = round(from, intervalInSeconds) * 1000;
    const endTime = round(to, intervalInSeconds) * 1000;

    try {
      const params = {
        from: startTime,
        to: endTime,
        resolution: resolution,
      };
      const candleUrl = `candle/${instrument.symbol}/candles`;

      const data = await rf.getRequest('TradingRequest').getCandleChartData();
      console.log('data', data);
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
    console.log('chart', chart);
    setTradingViewChart(chart);
    chart.onChartReady(() => {
      console.log('chart onready');
      setChartReady(true);
      chart.chart().setResolution(getIntervalString(interval), () => {});
      chart.applyOverrides({ 'paneProperties.topMargin': 15 });
      chart
        .chart()
        .onIntervalChanged()
        .subscribe(null, function (interval) {
          intervalInMillisecondsRef.current = getInterval(interval) * 60 * 1000;
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
