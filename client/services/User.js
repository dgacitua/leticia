// Adapted from https://bezkoder.com/jwt-vue-vuex-authentication/

import axios from 'axios';

import authHeader from './auth-header';
import * as Constants from './Constants';

const API_URL = `${Constants.backendApiUrl}/user/test`;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + '/all');
  }

  getUserBoard() {
    return axios.get(API_URL + '/user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + '/admin', { headers: authHeader() });
  }
}

export default new UserService();
