<template>
  <b-container>
    <b-row>
      <h2>{{ task.title }}</h2>
    </b-row>
    <b-row class="space-bottom">
      <span>{{ task.description }}</span>
    </b-row>
    <br>
    <b-row class="space-bottom">
      <div>Respecto a la tarea seleccionada, responde las siguientes preguntas:</div>
    </b-row>
    <b-row class="space-bottom">
      <b-col>
        <b-form id=taskform @submit="onSubmit" class="full-width">
          <b-row v-for="q in questions" :key="q.questionId"  class="zero-margin">
            <b-row v-if="q.type==='likert'" :id="q.questionId" class="zero-margin">
              <likertscale :props="q"></likertscale>
            </b-row>
            <b-row v-if="q.type==='paragraph'" :id="q.questionId" class="zero-margin">
              <paragraph :props="q"></paragraph>
            </b-row>
            <b-row v-if="q.type==='multiquery'" :id="q.questionId" class="zero-margin">
              <multiquery :props="q"></multiquery>
            </b-row>
          </b-row>
          <br>
          <b-row  class="zero-margin">
            <b-button type="submit" variant="success">Enviar respuesta</b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../../services/Constants';
import { getVueArray } from '../../services/Utils';

import LikertScale from '../formElements/LikertScale.vue';
import MultiQuery from '../formElements/MultiQuery.vue';
import Paragraph from '../formElements/Paragraph.vue';

export default {
  name: 'questionnaire',

  components: {
    likertscale: LikertScale,
    multiquery: MultiQuery,
    paragraph: Paragraph
  },

  data() {
    return {
      task: {},
      questions: []
    }
  },

  beforeMount() {
    //this.$store.commit({ type: 'setCurrentRoute', route: { path: 'taskform', query: { task: this.$route.query.task, form: this.$route.query.form }}});
  },

  mounted() {
    let taskId = this.$route.query.task;
    let formId = this.$route.query.form;

    let p1 = Axios.get(`${Constants.backendApiUrl}/tasks/${taskId}`);
    let p2 = Axios.get(`${Constants.backendApiUrl}/forms/${formId}`);

    Promise.all([p1, p2])
      .then((values) => { 
        this.task = values[0].data;
        this.questions = values[1].data;
      })
      .catch((err) => { console.error(err) });
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      let taskId = this.$route.query.task;
      let formId = this.$route.query.form;
      let answers = getVueArray(this.questions).map(el => { return { questionId: el.questionId, answer: el.answer }});

      let response = {
        userId: '',
        taskId: taskId,
        formId: formId,
        clientTimestamp: Date.now(),
        answers: answers
      }

      // console.log(response);

      Axios.post(`${Constants.backendApiUrl}/answers`, response)
        .then((res) => {
          if (formId === Constants.pretaskForm) {
            this.$router.push({ path: 'query', query: { task: this.$route.query.task, form: Constants.queryForm }});
          }
          else {
            this.$store.commit({ type: 'setTaskAsDone', taskId: taskId });
            this.$router.push({ path: 'tasks' });
          }
        })
        .catch((err) => {
          console.error(err);
          alert('Ha ocurrido un error');
        });
    }
  }
}
</script>

<style scoped>
.space-bottom {
  margin-bottom: 10px;
}

.zero-margin {
  margin: 0px 0px 0px 0px;
}

.full-width {
  max-width: 100%;
}
</style>