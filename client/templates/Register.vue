<template>
  <b-row align-v="center" class="justify-content-md-center">
    <b-col class="login-card" cols="6">
      <b-card
        border-variant="primary"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <template v-slot:header>
          <div>
            LeTiCiA <sub>PILOT</sub>
          </div>
        </template>
        <b-form @submit.stop.prevent="register">
          <b-input-group class="mb-3">
            <template v-slot:prepend>
              <b-input-group-text>
                <font-awesome-icon icon="user" />
              </b-input-group-text>
            </template>
            <b-form-input type="text" v-model="user.name" :state="isValid" placeholder="Nombre de Usuario"></b-form-input>
            <template v-slot:append>
              <b-button variant="outline-info" @click="setRandomUsername">
                <font-awesome-icon icon="random" />
              </b-button>
            </template>
          </b-input-group>
          <b-input-group class="mb-3">
            <template v-slot:prepend>
              <b-input-group-text>
                <font-awesome-icon icon="lock" />
              </b-input-group-text>
            </template>
            <b-form-input :type="showPassword ? 'text' : 'password'" v-model="user.password" :state="isValid" placeholder="Contraseña"></b-form-input>
            <template v-slot:append>
              <b-button variant="outline-info" @click="showPassword = !showPassword">
                <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye' " />
              </b-button>
            </template>
          </b-input-group>
          <b-input-group class="mb-3">
            <small class="status-msg">{{ status }}</small>
          </b-input-group>
          <b-input-group>
            <b-button type="submit" variant="primary" block :disabled="loading">
              <b-spinner v-if="loading" small type="grow"></b-spinner>
              <span v-if="loading">Cargando...</span>
              <span v-if="!loading">Registrarse</span>
              <font-awesome-icon icon="sign-in-alt" />
            </b-button>
          </b-input-group>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import rug from 'random-username-generator';

import { string2hash } from '../services/Utils';

rug.setSeperator('');

export default {
  name: 'register',

  data() {
    return {
      showPassword: false,
      user: {
        name: '',
        password: ''
      },
      status: '',
      isValid: null,
      loading: false
    }
  },

  methods: {
    register() {
      this.isValid = null;
      this.loading = true;

      this.$auth.register({
        data: this.user,
        redirect: { path: 'login' },
        staySignedIn: true,
        autoLogin: true,
        fetchUser: true
      })
        .then((res) => {
          console.log(res);
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
          this.loading = false;
        });
    },

    setRandomUsername() {
      this.user.name = rug.generate();
    }
  }
}
</script>

<style scoped>
.zero-margin {
  margin: 0px 0px 0px 0px;
}
</style>