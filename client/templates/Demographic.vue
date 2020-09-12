<template>
  <b-container>
    <b-row>
      <h2>Test Demográfico</h2>
    </b-row>
    <br>
    <b-row>
      <b-form id="demographic" @submit="submitDemographic">
        <!-- Sex -->
        <b-form-group
          id="input-group-sex"
          label="Sexo"
          label-for="input-sex"
          >
          <b-form-select
            id="input-sex"
            v-model="form.sex"
            :options="sex"
            required
            >
          </b-form-select>
        </b-form-group>
        <!-- Age -->
        <b-form-group
          id="input-group-age"
          label="Edad"
          label-for="input-age"
          description="Edad actual (en años)"
        >
          <b-form-input
            id="input-age"
            v-model="form.age"
            type="number"
            min="0"
            required
            >
          </b-form-input>
        </b-form-group>
        <!-- Handedness -->
        <b-form-group
          id="input-group-handedness"
          label="¿Cúal es su mano dominante al escribir?"
          label-for="input-handedness"
        >
          <b-form-select
            id="input-handedness"
            v-model="form.handedness"
            :options="handedness"
            required
          >
          </b-form-select>
        </b-form-group>
        <!-- NativeLanguage -->
        <b-form-group
          id="input-group-language"
          label="¿Cúal es su idioma nativo?"
          label-for="input-language"
        >
          <b-form-select
            id="input-language"
            v-model="form.language"
            :options="language"
            required
          >
          </b-form-select>
        </b-form-group>
        <b-form-group
          v-if="form.language === 'Other'"
          id="input-group-language-custom"
          label="Indique su idioma nativo"
          label-for="input-language-custom"
        >
          <b-form-input
            id="input-language-custom"
            v-model="form.customLanguage"
            type="text"
            required
          >
          </b-form-input>
        </b-form-group>
        <!-- KeyboardLayout -->
        <b-form-group
          id="input-group-keyboard"
          label="¿Cúal es la distribución de su teclado?"
          label-for="input-keyboard"
        >
          <b-form-select
            id="input-keyboard"
            v-model="form.keyboardLayout"
            :options="keyboardLayout"
            required
          >
          </b-form-select>
        </b-form-group>
        <b-form-group
          v-if="form.keyboardLayout === 'Other'"
          id="input-group-keyboard-custom"
          label="Indique su distribución de teclado"
          label-for="input-keyboard-custom"
        >
          <b-form-input
            id="input-keyboard-custom"
            v-model="form.customKeyboardLayout"
            type="text"
            required
          >
          </b-form-input>
        </b-form-group>
        <!-- FavoriteSearchEngine -->
        <b-form-group
          id="input-group-searchengine"
          label="¿Cual es su motor de búsqueda web preferido?"
          label-for="input-searchengine"
        >
          <b-form-select
            id="input-searchengine"
            v-model="form.searchEngine"
            :options="searchEngine"
            required
          >
          </b-form-select>
        </b-form-group>
        <b-form-group
          v-if="form.searchEngine === 'Other'"
          id="input-group-searchengine-custom"
          label="Indique su motor de búsqueda web preferido"
          label-for="input-searchengine-custom"
        >
          <b-form-input
            id="input-searchengine-custom"
            v-model="form.customSearchEngine"
            type="text"
            required
          >
          </b-form-input>
        </b-form-group>
        <!-- Education -->
        <b-form-group
          id="input-group-education"
          label="Nivel Educacional"
          label-for="input-education"
          description="Indicar último nivel cursado"
        >
          <b-form-select
            id="input-education"
            v-model="form.education"
            :options="educationLevels"
            required
          >
          </b-form-select>
        </b-form-group>
        <!-- IsStudent? -->
        <b-form-group
          id="input-group-student"
          label="¿Está estudiando una carrera ahora?"
          label-for="input-student"
        >
          <b-form-select
            id="input-student"
            v-model="form.isStudent"
            :options="isStudent"
            required
          >
          </b-form-select>
        </b-form-group>
        <!-- Career -->
        <b-form-group
          id="input-group-career"
          label="Carrera"
          label-for="input-career"
          description="(opcional) En caso de indicar nivel educacional Técnico-Profesional o Universitario, indicar la carrera en curso o cursada"
        >
          <b-form-input
            id="input-career"
            v-model="form.career"
          >
          </b-form-input>
        </b-form-group>
        <!-- HasDyslexia? TODO -->
        <!-- HasColorBlindness TODO -->
        <!-- Country -->
        <b-form-group
          id="input-group-country"
          label="País de residencia"
          label-for="input-country"
        >
          <v-select
            id="input-country"
            :options="countries"
            :reduce="country => country.value"
            label="text"
            v-model="form.country">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!(form.country)"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </v-select>
        </b-form-group>
        <!-- Region -->
        <b-form-group
          id="input-group-region"
          label="Región de residencia"
          label-for="input-region"
        >
          <v-select
            v-if="form.country === 'Chile'"
            id="input-region"
            :options="regions"
            :reduce="region => region.value"
            :required="!(form.region)"
            label="text"
            v-model="form.region">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!(form.region)"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </v-select>
          <b-form-input
            v-else
            id="input-region"
            v-model="form.region"
            type="text"
            required
          >
          </b-form-input>
        </b-form-group>
        <!-- City -->
        <b-form-group
          id="input-group-city"
          label="Ciudad/comuna de residencia"
          label-for="input-city"
        >
          <v-select
            v-if="form.country === 'Chile'"
            id="input-city"
            :options="citiesSelection"
            :reduce="city => city.value"
            :required="!(form.city)"
            label="text"
            v-model="form.city">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!(form.city)"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </v-select>
          <b-form-input
            v-else
            id="input-city"
            v-model="form.city"
            type="text"
            required
          >
          </b-form-input>
        </b-form-group>
        <!-- Town -->
        <b-form-group
          id="input-group-town"
          label="Villa/Población"
          label-for="input-town"
          description="(opcional)"
        >
          <b-form-input
            id="input-town"
            v-model="form.town"
            type="text"
          >
          </b-form-input>
        </b-form-group>
        <!-- Submit -->
        <b-button type="submit" variant="primary">Enviar</b-button>
      </b-form>
    </b-row>
  </b-container>
</template>

<script>
import Axios from 'axios';
import { ModelSelect } from 'vue-search-select';

import * as Constants from '../services/Constants';
import { getVueObject } from '../services/Utils';
import Countries from '../assets-client/countries.json';
import Cities from '../assets-client/cities-CL.json';

export default {
  name: 'demographic',

  data() {
    return {
      form: {},
      error: {},
      educationLevels: [
        { text: 'Enseñanza Básica/Primaria', value: 'ElementarySchool' },
        { text: 'Enseñanza Media/Secundaria', value: 'HighSchool' },
        { text: 'Enseñanza Técnico-Profesional', value: 'Professional' },
        { text: 'Enseñanza Universitaria (Pregrado)', value: 'Undergraduate' },
        { text: 'Enseñanza Universitaria (Magíster)', value: 'Masters' },
        { text: 'Enseñanza Universitaria (Doctorado)', value: 'PhD' },
        { text: 'Ninguna de las anteriores', value: 'NA' }
      ],
      sex: [
        { text: 'Masculino', value: 'Male' },
        { text: 'Femenino', value: 'Female' }
      ],
      language: [
        { text: 'Español', value: 'Spanish' },
        { text: 'Inglés', value: 'English' },
        { text: 'Otro', value: 'Other' }
      ],
      handedness: [
        { text: 'Diestro', value: 'Right' },
        { text: 'Zurdo', value: 'Left' },
        { text: 'Ambidiestro', value: 'Both' }
      ],
      keyboardLayout: [
        { text: 'Español (Latinoamérica)', value: 'es-LA' },
        { text: 'Español (España)', value: 'es-ES' },
        { text: 'Inglés', value: 'en' },
        { text: 'Otro', value: 'Other' },
        { text: 'No lo sé', value: 'NA' }
      ],
      searchEngine: [
        { text: 'Google', value: 'Google' },
        { text: 'Bing', value: 'Bing' },
        { text: 'Yahoo', value: 'Yahoo' },
        { text: 'DuckDuckGo', value: 'DuckDuckGo' },
        { text: 'Otro', value: 'Other' }
      ],
      isStudent: [
        { text: 'Si, soy estudiante', value: 'Yes' },
        { text: 'No, ya egresé', value: 'No' }
      ],
      country: [
        { text: 'Chile', value: '' },
        { text: 'Otro', value: 'Other' }
      ],
      allCities: Cities,
      regions: Cities.map((r) => { return { value: r.region, text: r.region } }),
      cities: Cities.map((r) => r.cities).reduce((prev, curr) => prev.concat(curr)),
      countries: Countries.map((cn) => { return { value: cn.name, text: cn.name } })
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    citiesSelection() {
      if (this.form.region) {
        return this.allCities.find((r) => r.region === this.form.region).cities.map((c) => { return { value: c, text: c } });
      }
      else {
        return [];
      }
    }
  },

  methods: {
    submitDemographic(evt) {
      evt.preventDefault();

      //if (this.$store.getters.isValidParticipant) {
      //if (this.checkSearchSelectors()) {
      if (true) {
        let type = 'Demographic';
        let answers = Object.entries(getVueObject(this.form)).map(([question, answer]) => ({question, answer}));  // dgacitua: https://stackoverflow.com/a/49629733 

        let response = {
          username: this.currentUser.username,
          type: type,
          clientTimestamp: Date.now(),
          answers: answers
        }

        console.log('Demographic Answer', response);

        Axios.post(`${Constants.backendApiUrl}/demographic`, response)
          .then((res) => {
            // dgacitua: https://stackoverflow.com/a/57183854
            this.$router.replace({ path: 'instructions' });
          })
          .catch((err) => {
            console.error(err);
            alert('Ha ocurrido un error');
          });
      }
    }
  }
}
</script>

<style scoped>
.zero-margin {
  margin: 0px 0px 0px 0px;
}

.required {
  font-weight: bold;
  color: red;
}
</style>