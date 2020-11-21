// Adapted from https://bezkoder.com/jwt-vue-vuex-authentication/
import axios from 'axios';

import * as Constants from './Constants';

const API_URL = `${Constants.backendApiUrl}/auth`;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('leticia-user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  simulatedLogin() {
    let simulatedUser = '{"id":"test1234","username":"test1234","email":"test@test.org","roles":["ROLE_USER"],"accessToken":"test1234"}';
    localStorage.setItem('leticia-user', simulatedUser);
    return Promise.resolve(JSON.parse(simulatedUser));
  }

  logout() {
    localStorage.removeItem('leticia-user');
    localStorage.removeItem('leticia-vuex');
  }

  register(user) {
    return axios.post(API_URL + '/register', {
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
