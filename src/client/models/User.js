// Adapted from https://bezkoder.com/jwt-vue-vuex-authentication/

export default class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}