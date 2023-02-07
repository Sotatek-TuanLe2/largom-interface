import BaseRequest from './BaseRequest';

export default class TradingRequest extends BaseRequest {
  getCandleChartData() {
    const url = '/candle/BTCUSD';
    return this.get(url);
  }

  getTradingHistory() {
    const url = '/trade/history';
    return this.get(url);
  }

  getMarketTrades() {
    const url = '/trade';
    return this.get(url);
  }

  getMyTrades() {
    const url = '/trade/get-user-trades';
    return this.get(url);
  }
}
