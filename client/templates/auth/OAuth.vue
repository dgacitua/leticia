<template>
  <b-container>
    <b-row>
      <b-col cols="6" offset="3">
        <b-card>
          <b-row align-h="center">
            <b-button-group block vertical>
              <b-button block variant="danger" @click="googleLogin">
                <font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
                Registrarse con Google
              </b-button>
              <b-button block variant="primary" @click="facebookLogin">
                <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
                Registrarse con Facebook
              </b-button>
            </b-button-group>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Axios from 'axios';

import User from '../../models/User';

import * as Constants from '../../services/Constants';
import ActionSender from '../../services/ActionSender';

export default {
  name: 'OAuth',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  mounted() {
    if (this.loggedIn) {
      if (this.acceptedConsent) {
        this.$router.replace('/user-hub');
      }
      else {
        this.$router.replace('consent');
      }
    }
  },

  methods: {
    googleLogin() {
      window.location.href = `${Constants.backendApiUrl}/auth/google`;
    },

    facebookLogin() {
      window.location.href = `${Constants.backendApiUrl}/auth/facebook`;
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.zero-margin {
  margin: 0px 0px 0px 0px;
}
</style>