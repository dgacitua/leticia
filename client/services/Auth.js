// Adapted from https://bezkoder.com/jwt-vue-vuex-authentication/

import axios from 'axios';

import * as Constants from './Constants';

const API_URL = `${Constants.backendApiUrl}/auth`;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('leticia-user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('leticia-user');
  }

  register(user) {
    return axios.post(API_URL + '/register', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
