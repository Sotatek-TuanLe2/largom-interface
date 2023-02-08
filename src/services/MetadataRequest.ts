import BaseRequest from './BaseRequest';

export default class MetadataRequest extends BaseRequest {
  getTicker24h() {
    const url = '/ticker/24h';
    return this.get(url);
  }

  getSymbols() {
    const url = '/ticker/symbols';
    return this.get(url);
  }

  getInstruments() {
    const url = '/instruments';
    return this.get(url);
  }
}
