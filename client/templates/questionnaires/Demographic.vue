<template>
  <b-container>
    <b-row>
      <h2>Cuestionario Demográfico</h2>
    </b-row>
    <br>
    <b-row>
      <b-form id="demographic" @submit="submitDemographic">
        <!-- Example -->
        <!--
        <div>
          <b>{{ props.title }}</b>
          <span v-if="props.required" class="form-asterisk">*</span>
        </div>
        <div v-if="props.hint" class="help-block">
          {{ props.hint }}
        </div>
        <div>
          <b-form-input
            v-model="props.answer"
            :required="props.required"
            :id="`input-${props.questionId}`"
            :name="`input-${props.questionId}`"
            @focus="focus"
            @blur="blur"
            class="input-box">
          </b-form-input>
        -->
        <!-- Sex -->
        <div id="demo-sex">
          <div>
            <b>Sexo</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
            <b-form-radio-group
              id="input-sex"
              v-model="form.sex"
              :options="sex"
              required>
            </b-form-radio-group>
          </div>
          <br>
        </div>
        <!-- Age -->
        <div id="demo-age">
          <div>
            <b>Edad</b>
            <span class="form-asterisk">*</span>
          </div>
          <div class="help-block">
            Edad actual (en años)
          </div>
          <div>
            <b-form-input
              id="input-age"
              v-model="form.age"
              type="number"
              min="1"
              required>
            </b-form-input>
          </div>
          <br>
        </div>
        <!-- Handedness -->
        <div id="demo-handedness">
          <div>
            <b>¿Cúal es su mano dominante al escribir?</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
            <b-form-radio-group
              id="input-handedness"
              v-model="form.handedness"
              :options="handedness"
              required>
            </b-form-radio-group>
          </div>
          <br>
        </div>
        <!-- NativeLanguage -->
        <div id="demo-language">
          <div>
            <b>¿Cúal es su idioma nativo?</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
            <b-form-radio-group
              id="input-language"
              v-model="form.language"
              :options="language"
              required>
            </b-form-radio-group>
          </div>
          <br>
        </div>
        <div v-if="form.language === 'Other'" id="demo-custom-language">
          <div>
            <b>Indique su idioma nativo</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
            <b-form-input
              id="input-language-custom"
              v-model="form.customLanguage"
              type="text"
              required>
            </b-form-input>
          </div>
          <br>
        </div>
        <!-- KeyboardLayout -->
        <div id="demo-keyboard">
          <div>
            <b>¿Cúal es la distribución de su teclado?</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
            <b-form-radio-group
              id="input-keyboard"
              v-model="form.keyboardLayout"
              :options="keyboardLayout"
              required>
            </b-form-radio-group>
          </div>
          <br>
        </div>
        <div v-if="form.keyboardLayout === 'Other'" id="demo-custom-keyboard">
          <div>
            <b>Indique su distribución de teclado</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
            <b-form-input
              id="input-keyboard-custom"
              v-model="form.customKeyboardLayout"
              type="text"
              required>
            </b-form-input>
          </div>
          <br>
        </div>
        <!-- FavoriteSearchEngine -->
        <div id="demo-searchengine">
          <div>
            <b>¿Cual es su motor de búsqueda web preferido?</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
            <b-form-radio-group
              id="input-searchengine"
              v-model="form.searchEngine"
              :options="searchEngine"
              required>
            </b-form-radio-group>
          </div>
          <br>
        </div>
        <div v-if="form.searchEngine === 'Other'" id="demo-custom-searchengine">
          <div>
            <b>Indique su motor de búsqueda web preferido</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
            <b-form-input
              id="input-searchengine-custom"
              v-model="form.customSearchEngine"
              type="text"
              required>
            </b-form-input>
          </div>
          <br>
        </div>
        <!-- Education -->
        <div id="demo-education">
          <div>
            <b>Nivel Educacional</b>
            <span class="form-asterisk">*</span>
          </div>
          <div class="help-block">
            Indicar último nivel cursado o en curso
          </div>
          <div>
            <b-form-select
              id="input-education"
              v-model="form.education"
              :options="educationLevels"
              required>
            </b-form-select>
          </div>
          <br>
        </div>
        <!-- Career -->
        <div id="demo-career">
          <div>
            <b>Carrera</b>
          </div>
          <div class="help-block">
            (OPCIONAL) En caso de indicar nivel educacional Técnico-Profesional o Universitario, indicar la carrera en curso o cursada
          </div>
          <div>
            <b-form-input
              id="input-career"
              v-model="form.career">
            </b-form-input>
          </div>
          <br>
        </div>
        <!-- IsStudent? -->
        <div id="demo-student">
          <div>
            <b>¿Está estudiando ahora?</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
            <b-form-radio-group
              id="input-student"
              v-model="form.isStudent"
              :options="isStudent"
              required>
            </b-form-radio-group>
          </div>
          <br>
        </div>
        <!-- HasDyslexia? -->
        <div id="demo-dyslexia">
          <div>
            <b>¿Usted tiene Dislexia?</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
            <b-form-radio-group
              id="input-dyslexia"
              v-model="form.hasDyslexia"
              :options="hasDyslexia"
              required>
            </b-form-radio-group>
          </div>
          <br>
        </div>
        <!-- HasColorBlindness -->
        <div id="demo-colorblindness">
          <div>
            <b>¿Usted tiene algún tipo de Daltonismo?</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
            <b-form-radio-group
              id="input-colorblindness"
              v-model="form.hasColorBlindness"
              :options="hasColorBlindness"
              required>
            </b-form-radio-group>
          </div>
          <br>
        </div>
        <!-- Country -->
        <div id="demo-country">
          <div>
            <b>País de residencia</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
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
                  v-on="events" />
              </template>
            </v-select>
          </div>
          <br>
        </div>
        <!-- Region -->
        <div id="demo-region">
          <div>
            <b>Región/Estado/Provincia/Departamento de residencia</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
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
                  v-on="events" />
              </template>
            </v-select>
            <b-form-input
              v-else
              id="input-region"
              v-model="form.region"
              type="text"
              required>
            </b-form-input>
          </div>
          <br>
        </div>
        <!-- City -->
        <div id="demo-city">
          <div>
            <b>Ciudad/Comuna de residencia</b>
            <span class="form-asterisk">*</span>
          </div>
          <div>
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
                  v-on="events" />
              </template>
            </v-select>
            <b-form-input
              v-else
              id="input-city"
              v-model="form.city"
              type="text"
              required>
            </b-form-input>
          </div>
          <br>
        </div>
        <!-- Town -->
        <div id="demo-town">
          <div>
            <b>Villa/Población de residencia</b>
          </div>
          <div class="help-block">
            (OPCIONAL)
          </div>
          <div>
            <b-form-input
              id="input-town"
              v-model="form.town"
              type="text">
            </b-form-input>
          </div>
          <br>
        </div>
        <!-- Submit -->
        <b-row>
          <b-col class="text-right">
            <b-button type="submit" variant="success">Enviar respuesta</b-button>
          </b-col>
        </b-row>
      </b-form>
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
import { ModelSelect } from 'vue-search-select';

import * as Constants from '../../services/Constants';
import { getVueObject } from '../../services/Utils';
import ActionSender from '../../services/ActionSender';
import EventBus from '../../modules/eventBus';

import Countries from '../../assets/countries.json';
import Cities from '../../assets/cities-CL.json';

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
      hasDyslexia: [
        { text: 'No', value: 'No' },
        { text: 'Si', value: 'Yes' },
        
      ],
      hasColorBlindness: [
        { text: 'No', value: 'No' },
        { text: 'Si', value: 'Yes' }
      ],
      country: [
        { text: 'Chile', value: 'Chile' },
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

      if (this.loggedIn) {
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
            // this.$router.replace({ path: 'instructions' });

            EventBus.$emit('leticia-next-stage');
          })
          .catch((err) => {
            console.error(err);
            alert('Ha ocurrido un error al enviar las respuestas [Código 467]');
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