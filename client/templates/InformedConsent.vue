<template>
  <b-container>
    <b-row>
      <h1>Consentimiento Informado</h1>
      <div>
        Para participar de este estudio, debes leer el siguiente consentimiento informado, completar con tus datos y aceptar.
      </div>
    </b-row>
    <br>
    <b-row>
      TODO Consentimiento Informado (PDF)
    </b-row>
    <br>
    <b-row>
      <b-col>
        <b-form id="exit-survey" @submit="acceptConsent">
          <!-- Questions -->
          <b-row>
            <b-col>
              <!-- Name -->
              <div class="zero-margin">
                <div>
                  <b>Nombre Completo</b>
                  <span class="form-asterisk">*</span>
                </div>
                <div>
                  <b-form-input
                    v-model="form.name"
                    :name="`consent-name`"
                    required>
                  </b-form-input>
                </div>
                <br>
              </div>
              <!-- Email -->
              <div class="zero-margin">
                <div>
                  <b>Correo electrónico de contacto</b>
                  <span class="form-asterisk">*</span>
                </div>
                <div>
                  <b-form-input
                    v-model="form.email"
                    type="email"
                    :name="`consent-email`"
                    required>
                  </b-form-input>
                </div>
                <br>
              </div>
            </b-col>
          </b-row>
          <br>
          <!-- Buttons -->
          <b-row>
            <b-col class="text-center">
              <b-button type="submit" variant="success">Acepto participar en el estudio</b-button>
            </b-col>
            <b-col class="text-center">
              <b-button to="/" variant="danger">No acepto participar en el estudio</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    
    <hr>
    <pre>{{ form }}</pre>
    
  </b-container>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../services/Constants';

const API_URL = `${Constants.backendApiUrl}`;

export default {
  name: 'informed-consent',

  data() {
    return {
      form: {},
      error: {}
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    acceptConsent(evt) {
      evt.preventDefault();

      let message = {
        name: this.form.name || '',
        email: this.form.email || '',
        clientTimestamp: Date.now()
      };

      Axios.post(API_URL + '/consent', message)
        .then((res) => {
          // dgacitua: https://stackoverflow.com/a/57183854
          this.$router.replace({ path: 'oauth' });
        })
        .catch((err) => {
          alert('Ha ocurrido un error al aceptar el Consentimiento Informado');
        });
    }
  }
}
</script>

<style scoped>
.form-asterisk {
  font-weight: bold;
  color: #FF0000;
}

.input-box {
  max-width: 90%;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.zero-margin {
  margin: 0px 0px 0px 0px;
}
</style>