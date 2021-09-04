<template>
    <b-container>
    <b-row>
      <b-col cols="8" offset="2">
        <b-card>
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />
          <div class="text-center">
            <h3>Inicar sesión en LETICIA</h3>
          </div>
          <br>
          <b-form name="login-form" @submit.prevent="handleLogin">
            <div>
              <!-- Email -->
              <div id="login-email">
                <div>
                  <b>Correo Electrónico</b>
                  <span class="form-asterisk">*</span>
                </div>
                <div>
                  <b-form-input
                    id="login-email"
                    v-model="form.email"
                    type="email"
                    required>
                  </b-form-input>
                </div>
                <br>
              </div>
              <!-- Password -->
              <div id="login-password">
                <div>
                  <b>Contraseña</b>
                  <span class="form-asterisk">*</span>
                </div>
                <div>
                  <b-form-input
                    id="input-password"
                    v-model="form.password"
                    type="password"
                    required>
                  </b-form-input>
                </div>
                <br>
              </div>
              <!-- Message -->
              <div id="register-message" class="text-center" v-if="!!message">
                {{ message }}
              </div>
              <!-- Submit -->
              <div class="form-group">
                <b-button block type="submit" variant="success">Registrarse</b-button>
              </div>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
  <!--
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleLogin">
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
            v-if="errors.has('email')"
            class="alert alert-danger"
            role="alert"
          >Email is required!</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Password is required!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-info btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
  </div>
  -->
</template>

<script>
import Axios from 'axios';

import User from '../../models/User';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: '',
      form: {}
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/user-hub');
    }
  },
  methods: {
    handleLogin() {
      console.log('Login user!', this.form.email, this.form.password);
      
      this.$store.dispatch('auth/login', this.form)
        .then((res) => {
          console.log('User Logged In Successfully!');
          this.message = res.message;
          this.successful = true;
          this.$router.push('/');
        })
        .catch((err) => {
          console.error(err);
          this.message = err.message;
          this.successful = false;
        });
      
      /*
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/login', this.user)
          .then(() => {
              this.$router.push('/');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
      */
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

.form-asterisk {
  font-weight: bold;
  color: #FF0000;
}

.help-block {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: small;
  color: #6c757d;
}
</style>