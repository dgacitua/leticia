<template>
  <b-container>
    <b-row>
      <b-col cols="8" offset="2">
        <b-card>
          <b-row align-h="center">
            <b-col>
              <div class="text-center">
                <b>Para comenzar, inicia sesión con alguna cuenta</b>
              </div>
              <br>
              <div class="text-center">
                LeTiCiA registrará únicamente el correo electrónico de la cuenta utlizada. No se almacenarán otros datos personales.
              </div>
              <br>
            </b-col>
          </b-row>
          <b-row align-h="center">
            <b-col>
              <b-row>
                <b-col>
                  <b-button block variant="danger" @click="googleLogin" v-if="enableGoogleLogin">
                    <font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
                    Registrarse con Google
                  </b-button>
                  <b-button block variant="primary" @click="facebookLogin" v-if="enableFacebookLogin">
                    <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
                    Registrarse con Facebook
                  </b-button>
                </b-col>
              </b-row>
              <br>
              <b-row v-if="enableEmailLogin">
                <b-col>
                  <b-button block variant="info" to="register">
                    <font-awesome-icon :icon="['fas', 'envelope']"></font-awesome-icon>
                    Registrarse con Correo Electrónico
                  </b-button>
                </b-col>
                <b-col>
                  <b-button block variant="info" to="login">
                    <font-awesome-icon :icon="['fas', 'sign-in-alt']"></font-awesome-icon>
                    Ingresar con Correo Electrónico
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
        <b-row class="text-center">
          <b-col>
            <b-button variant="link" to="/">
              Volver
            </b-button>
          </b-col>
        </b-row>
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
      message: '',
      enableGoogleLogin: Constants.enableGoogleLogin,
      enableFacebookLogin: Constants.enableFacebookLogin,
      enableEmailLogin: Constants.enableEmailLogin
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  mounted() {
    if (this.loggedIn) {
      this.$router.replace('/user-hub');
      /*
      if (this.acceptedConsent) {
        this.$router.replace('/user-hub');
      }
      else {
        this.$router.replace('consent');
      }
      */
    }
  },

  methods: {
    googleLogin() {
      window.location.href = `${Constants.backendApiUrl}/auth/google`;
    },
    facebookLogin() {
      window.location.href = `${Constants.backendApiUrl}/auth/facebook`;
    },
    emailLogin() {
      console.log('email login');
    },
    emailRegister() {
      console.log('email register');
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