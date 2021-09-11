<template>
  <b-container>
    <b-row>
      <b-col>
        <div>
          <h1>{{ $t("informedConsent.title") }}</h1>
        </div>
        <div>
          {{ $t("informedConsent.instructions1") }}
        </div>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-embed type="iframe" :src="consentDocument"></b-embed>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <div>
          {{ $t("informedConsent.instructions2") }}
        </div>
        <br>
        <b-form id="exit-survey" @submit="acceptConsent">
          <!-- Questions -->
          <b-row>
            <b-col>
              <!-- Name -->
              <div class="zero-margin">
                <div>
                  <b>{{ $t("informedConsent.fullName") }}</b>
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
                  <b>{{ $t("informedConsent.email") }}</b>
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
              <!-- Acepto -->
              <div class="zero-margin">
                <b-form-checkbox
                  id="checkbox-accept"
                  name="checkbox-accept"
                  v-model="form.accept"
                  required
                  :value="true"
                  :unchecked-value="false"
                >
                  <b>{{ $t("informedConsent.acceptance") }}</b>
                  <span class="form-asterisk">*</span>
                </b-form-checkbox>
              </div>
            </b-col>
          </b-row>
          <br>
          <!-- Buttons -->
          <b-row>
            <b-col cols="4" offset="2" class="text-center">
              <b-button block to="/" variant="link">{{ $t("informedConsent.backButton") }}</b-button>
            </b-col>
            <b-col cols="4" class="text-center">
              <b-button block type="submit" variant="success">{{ $t("informedConsent.continueButton") }}</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    <br>
    <!--
    <hr>
    <pre>{{ form }}</pre>
    -->
  </b-container>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../services/Constants';
import EventBus from '../modules/eventBus';

import ConsentDocument from '../assets/consent.pdf';

const API_URL = `${Constants.backendApiUrl}`;

export default {
  name: 'informed-consent',

  data() {
    return {
      form: {},
      error: {},
      consentDocument: ConsentDocument
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

      if (this.loggedIn) {
        let message = {
          name: this.form.name || '',
          email: this.form.email || '',
          username: this.currentUser.username,
          clientTimestamp: Date.now()
        };

        Axios.post(API_URL + '/consent', message)
          .then((res) => {
            // dgacitua: https://stackoverflow.com/a/57183854
            // this.$router.replace({ path: 'demographic' });

            this.$store.commit({ type: 'setAcceptedConsent', state: true });
            EventBus.$emit('leticia-next-stage');
          })
          .catch((err) => {
            console.error('ConsentError', err);
            alert('An error ocurred while submitting the Informed Consent [Code 461]');
          });
      }
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