import config from 'src/config';
import { MOCK_API_PORT } from 'src/utils/constants';
import BaseRequest from './BaseRequest';

export default class UserRequest extends BaseRequest {
  getUrlPrefix() {
    if (process.env.REACT_APP_MOCK_API) {
      return `http://localhost:${MOCK_API_PORT}/api`;
    }
    return config.api.baseUrlApi;
  }

  getCandleChartData() {
    const url = '/candle/BTCUSD';
    return this.get(url);
  }
}
