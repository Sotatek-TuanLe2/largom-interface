import BaseRequest from './BaseRequest';

export default class OrderRequest extends BaseRequest {
  getOpenOrders() {
    const url = '/orders/open';
    return this.get(url);
  }

  getHistoryOrders() {
    const url = '/orders/history';
    return this.get(url);
  }

  getFunds() {
    const url = '/funds';
    return this.get(url);
  }

  getOrderBook(params: { instrumentSymbol: string }) {
    const url = `/orders/orderbook/${params.instrumentSymbol}`;
    return this.get(url);
  }
}
