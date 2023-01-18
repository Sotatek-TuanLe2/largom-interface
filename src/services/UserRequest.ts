import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class UserRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  getInfoUser() {
    const url = ``;
    return this.get(url);
  }
}
