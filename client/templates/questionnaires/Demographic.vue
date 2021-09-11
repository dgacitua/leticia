<template>
  <b-container>
    <b-row>
      <h2>{{ $t("demographic.title") }}</h2>
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
            <b>{{ $t("demographic.sex") }}</b>
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
            <b>{{ $t("demographic.age") }}</b>
            <span class="form-asterisk">*</span>
          </div>
          <div class="help-block">
            {{ $t("demographic.ageHint") }}
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
            <b>{{ $t("demographic.handedness") }}</b>
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
            <b>{{ $t("demographic.nativeLanguage") }}</b>
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
            <b>{{ $t("demographic.nativeLanguageCustom") }}</b>
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
            <b>{{ $t("demographic.keyboardLayout") }}</b>
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
            <b>{{ $t("demographic.keyboardLayoutCustom") }}</b>
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
            <b>{{ $t("demographic.searchEngine") }}</b>
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
            <b>{{ $t("demographic.searchEngineCustom") }}</b>
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
            <b>{{ $t("demographic.education") }}</b>
            <span class="form-asterisk">*</span>
          </div>
          <div class="help-block">
            {{ $t("demographic.educationHint") }}
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
            <b>{{ $t("demographic.career") }}/b>
          </div>
          <div class="help-block">
            {{ $t("demographic.careerHint") }}
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
            <b>{{ $t("demographic.isStudent") }}</b>
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
            <b>{{ $t("demographic.hasDyslexia") }}</b>
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
            <b>{{ $t("demographic.hasColorBlindness") }}</b>
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
            <b>{{ $t("demographic.country") }}</b>
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
            <b>{{ $t("demographic.region") }}</b>
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
            <b>{{ $t("demographic.city") }}</b>
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
            <b>{{ $t("demographic.town") }}</b>
          </div>
          <div class="help-block">
            {{ $t("demographic.townHint") }}
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
            <b-button type="submit" variant="success">
              {{ $t("demographic.submitButtton") }}
            </b-button>
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
        { text: this.$i18n.t('demographic.options.educationLevel.elementary'), value: 'ElementarySchool' },
        { text: this.$i18n.t('demographic.options.educationLevel.high'), value: 'HighSchool' },
        { text: this.$i18n.t('demographic.options.educationLevel.professional'), value: 'Professional' },
        { text: this.$i18n.t('demographic.options.educationLevel.undergraduate'), value: 'Undergraduate' },
        { text: this.$i18n.t('demographic.options.educationLevel.masters'), value: 'Masters' },
        { text: this.$i18n.t('demographic.options.educationLevel.phd'), value: 'PhD' },
        { text: this.$i18n.t('demographic.options.common.noneOfTheAbove'), value: 'NA' }
      ],
      sex: [
        { text: this.$i18n.t('demographic.options.sex.male'), value: 'Male' },
        { text: this.$i18n.t('demographic.options.sex.female'), value: 'Female' }
      ],
      language: [
        { text: this.$i18n.t('demographic.options.language.spanish'), value: 'Spanish' },
        { text: this.$i18n.t('demographic.options.language.english'), value: 'English' },
        { text: this.$i18n.t('demographic.options.common.other'), value: 'Other' }
      ],
      handedness: [
        { text: this.$i18n.t('demographic.options.handedness.right'), value: 'Right' },
        { text: this.$i18n.t('demographic.options.handedness.left'), value: 'Left' },
        { text: this.$i18n.t('demographic.options.handedness.both'), value: 'Both' }
      ],
      keyboardLayout: [
        { text: this.$i18n.t('demographic.options.keyboardLayout.spanishLatin'), value: 'es-LA' },
        { text: this.$i18n.t('demographic.options.keyboardLayout.spanishSpain'), value: 'es-ES' },
        { text: this.$i18n.t('demographic.options.keyboardLayout.english'), value: 'en' },
        { text: this.$i18n.t('demographic.options.common.other'), value: 'Other' },
        { text: this.$i18n.t('demographic.options.common.dontKnow'), value: 'NA' }
      ],
      searchEngine: [
        { text: 'Google', value: 'Google' },
        { text: 'Bing', value: 'Bing' },
        { text: 'Yahoo', value: 'Yahoo' },
        { text: 'DuckDuckGo', value: 'DuckDuckGo' },
        { text: this.$i18n.t('demographic.options.common.other'), value: 'Other' }
      ],
      isStudent: [
        { text: this.$i18n.t('demographic.options.isStudent.yes'), value: 'Yes' },
        { text: this.$i18n.t('demographic.options.isStudent.no'), value: 'No' }
      ],
      hasDyslexia: [
        { text: this.$i18n.t('demographic.options.common.no'), value: 'No' },
        { text: this.$i18n.t('demographic.options.common.yes'), value: 'Yes' }
      ],
      hasColorBlindness: [
        { text: this.$i18n.t('demographic.options.common.no'), value: 'No' },
        { text: this.$i18n.t('demographic.options.common.yes'), value: 'Yes' }
      ],
      country: [
        { text: 'Chile', value: 'Chile' },
        { text: this.$i18n.t('demographic.options.common.other'), value: 'Other' }
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
            alert('An error ocurred while submitting the answers [Code 467]');
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