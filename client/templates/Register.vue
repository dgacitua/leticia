<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>

  <!--
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
  -->
</template>

<script>
import User from '../models/User';

export default {
  name: 'Register',
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
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};

/*
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
*/
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