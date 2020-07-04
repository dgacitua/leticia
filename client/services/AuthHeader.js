// Adapted from https://bezkoder.com/jwt-vue-vuex-authentication/

const authHeader = () => {
  let user = JSON.parse(localStorage.getItem('leticia-user'));

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  }
  else {
    return {};
  }
};

export default authHeader;