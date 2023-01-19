import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class AuthRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  signUp(params: any) {
    const url = ``;
    return this.post(url, params);
  }

  login(params: any) {
    const url = ``;
    return this.post(url, params);
  }

  changePassword(params: { newPassword: string; oldPassword: string }) {
    const url = '';
    return this.put(url, params);
  }

  forgotPassword(data: any) {
    const url = '';
    return this.post(url, data);
  }

  resetPassword(data: any) {
    const url = '';
    return this.put(url, data);
  }
}
