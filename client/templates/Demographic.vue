<template>
  <b-container>
    <b-row>
      <h2>Test Demográfico</h2>
    </b-row>
    <br>
    <b-row>
      <b-form id="demographic" @submit="submitDemographic">
        <b-form-group
          id="input-group-1"
          label="Edad"
          label-for="input-1"
          description="Edad actual (en años)"
        >
          <b-form-input
            id="input-1"
            v-model="form.age"
            type="number"
            min="0"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Sexo" label-for="input-2">
          <b-form-select
            id="input-2"
            v-model="form.sex"
            :options="sex"
            required
          >
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="Nivel Educacional"
          label-for="input-3"
          description="Indicar nivel en curso, o bien, último nivel cursado"
        >
          <b-form-select
            id="input-3"
            v-model="form.education"
            :options="educationLevels"
            required
          >
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-4"
          label="Carrera"
          label-for="input-4"
          description="En caso de indicar nivel educacional Superior o Universitario, indicar la carrera en curso (o cursada)"
        >
          <b-form-input
            id="input-4"
            v-model="form.career"
          >
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Enviar</b-button>
      </b-form>
    </b-row>
  </b-container>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../services/Constants';
import { getVueObject } from '../services/Utils';

export default {
  name: 'demographic',

  data() {
    return {
      form: {},
      educationLevels: [
        { text: 'Enseñanza Básica/Primaria', value: 'ElementarySchool' },
        { text: 'Enseñanza Media/Secundaria', value: 'HighSchool' },
        { text: 'Enseñanza Superior Técnica (CFT)', value: 'TechSchool' },
        { text: 'Enseñanza Superior Profesional (IP)', value: 'ProfessionalSchool' },
        { text: 'Enseñanza Universitaria Pregrado', value: 'UndergraduateSchool' },
        { text: 'Enseñanza Universitaria Postgrado', value: 'GraduateSchool' },
        { text: 'Ninguna de las anteriores', value: 'NA' }
      ],
      sex: [
        { text: 'Masculino', value: 'Male' },
        { text: 'Femenino', value: 'Female' }
      ]
    }
  },

  computed: {
    userId() {
      return this.$store.state.userId;
    }
  },

  methods: {
    submitDemographic(evt) {
      evt.preventDefault();

      if (this.$store.getters.isValidParticipant) {
        let type = 'Demographic';
        let answers = Object.entries(getVueObject(this.form)).map(([question, answer]) => ({question, answer}));  // dgacitua: https://stackoverflow.com/a/49629733 

        let response = {
          userId: this.userId,
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
</style>