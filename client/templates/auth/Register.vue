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
            <h3>Registrarse en LeTiCiA</h3>
          </div>
          <br>
          <b-form name="register-form" @submit.prevent="handleRegister">
            <div>
              <!-- Email -->
              <div id="register-email">
                <div>
                  <b>Correo Electrónico</b>
                  <span class="form-asterisk">*</span>
                </div>
                <div>
                  <b-form-input
                    id="input-email"
                    v-model="form.email"
                    type="email"
                    required>
                  </b-form-input>
                </div>
                <br>
              </div>
              <!-- Password -->
              <div id="register-password">
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
</template>

<script>
import Axios from 'axios';

import User from '../../models/User';

import * as Constants from '../../services/Constants';

export default {
  name: 'Register',
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
    handleRegister() {
      console.log('Register user!', this.form.email, this.form.password);

      this.$store.dispatch('auth/register', this.form)
        .then((res) => {
          console.log('User Registered Successfully!');
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