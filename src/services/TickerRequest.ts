import BaseRequest from './BaseRequest';

export default class TickerRequest extends BaseRequest {
  getTicker24h() {
    const url = '/ticker/24h';
    return this.get(url);
  }
}
