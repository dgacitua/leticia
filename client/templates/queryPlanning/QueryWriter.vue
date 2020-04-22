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
      <b-form id="query-writer" @submit="onSubmit" class="full-width">
        <b-row v-for="q in questions" :key="q.questionId" class="zero-margin">
          <b-row v-if="q.type==='multiquery'" class="zero-margin">
            <multiquery :props="q"></multiquery>
          </b-row>
        </b-row>
        <br>
        <b-row  class="zero-margin">
          <b-button type="submit" variant="success">Enviar respuesta</b-button>
        </b-row>
      </b-form>
    </b-row>
  </b-container>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../../services/Constants';
import { getVueArray, cleanArray } from '../../services/Utils';

import LikertScale from '../formElements/LikertScale.vue';
import MultiQuery from '../formElements/MultiQuery.vue';
import Paragraph from '../formElements/Paragraph.vue';

export default {
  name: 'query-planning',

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
    //this.$store.commit({ type: 'setCurrentRoute', route: { path: 'query', query: { task: this.$route.query.task, form: this.$route.query.form }}});
  },

  mounted() {
    let taskId = this.$route.query.task;
    let formId = this.$route.query.form;

    let p1 = Axios.get(`${Constants.backendApiUrl}/tasks/${taskId}`);
    let p2 = Axios.get(`${Constants.backendApiUrl}/forms/${formId}`);

    Promise.all([p1, p2])
      .then((values) =>{ 
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
      let formAnswer = getVueArray(this.questions).map(el => { return { questionId: el.questionId, answer: cleanArray(el.answer) }});

      let response = {
        userId: '',
        taskId: taskId,
        formId: formId,
        clientTimestamp: Date.now(),
        answers: formAnswer
      }

      // console.log(response);

      Axios.post(`${Constants.backendApiUrl}/answers`, response)
        .then((res) => {
          this.$router.push({ path: 'taskform', query: { task: this.$route.query.task, form: Constants.posttaskForm }});
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
</style>