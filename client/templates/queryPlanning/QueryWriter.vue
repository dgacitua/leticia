<template>
  <b-container>
    <b-row>
      <h2>{{ task.title }}</h2>
    </b-row>
    <b-row class="space-bottom">
      <span>{{ task.description }}</span>
    </b-row>
    <b-row class="space-bottom">
      <b-form id="app" @submit="onSubmit">
        <b-row v-for="q in questions" :key="q.questionId">
          <!--
          <b-row v-if="q.type==='likert'">
            <likertscale :props="q"></likertscale>
          </b-row>
          <b-row v-if="q.type==='paragraph'">
            <paragraph :props="q"></paragraph>
          </b-row>
          -->
          <b-row v-if="q.type==='multiquery'">
            <multiquery :props="q"></multiquery>
          </b-row>
        </b-row>
        <b-row>
          <input type="submit" value="Enviar respuesta">
        </b-row>
      </b-form>
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
    this.$store.commit({ type: 'setCurrentRoute', route: { path: 'query', query: { task: this.$route.query.task, form: this.$route.query.form }}});
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
      let answers = getVueArray(this.questions).map(el => { return { questionId: el.questionId, answer: el.answer }});

      let response = {
        userId: '',
        taskId: taskId,
        formId: formId,
        answers: answers
      }

      console.log(response);  // TODO Store answer in backend

      this.$router.push({ path: 'taskform', query: { task: this.$route.query.task, form: Constants.posttaskForm }});
    }
  }
}
</script>

<style scoped>
.space-bottom {
  margin-bottom: 10px;
}
</style>