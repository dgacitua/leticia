<template>
  <b-container>
    <b-row class="space-bottom">
      <b-col>
        <b-card :header="task.title" class="text-center">
          <b-card-text>{{ task.description }}</b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <br>
    <b-row class="space-bottom">
      <b-col>
        <b-form id="query-writer" @submit="onSubmit" class="full-width">
          <b-row v-for="q in questions" :key="q.questionId" class="zero-margin">
            <b-col>
              <b-row v-if="q.type==='multiquery'" class="zero-margin">
                <b-col>
                  <multiquery :props="q"></multiquery>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <br>
          <b-row class="zero-margin text-right">
            <b-col>
              <b-button type="submit" variant="success">{{ $t("queryPlanning.queryWriter.submitButton") }}</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../../services/Constants';
import { getVueArray, cleanArray } from '../../services/Utils';
import ActionSender from '../../services/ActionSender';
import EventBus from '../../modules/eventBus';

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
      questions: [],
      sender: new ActionSender('QueryPlanning')
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  mounted() {
    let taskId = this.$route.query.task;
    let formId = this.$route.query.form;

    let p1 = Axios.get(`${Constants.backendApiUrl}/tasks/${taskId}`);
    let p2 = Axios.get(`${Constants.backendApiUrl}/forms/${formId}`);

    Promise.all([p1, p2])
      .then((values) => { 
        this.task = values[0].data;
        this.questions = values[1].data.map(el => ({ ...el, keystrokeBuffer: [] }));
      })
      .catch((err) => {
        console.error(err);
        alert('Ha ocurrido un error al cargar la tarea [Código 463]');
      });
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      let taskId = this.$route.query.task;
      let formId = this.$route.query.form;
      let formAnswer = getVueArray(this.questions).map(el => { return { questionId: el.questionId, answer: cleanArray(el.answer) }});
      let keystrokeBuffer = getVueArray(this.questions).map(el => el.keystrokeBuffer).reduce((prev, curr) => prev.concat(curr));

      let response = {
        username: this.currentUser.username,
        taskId: taskId,
        formId: formId,
        clientTimestamp: Date.now(),
        answers: formAnswer
      }

      //console.log(response);
      //console.log('KSB!', keystrokeBuffer);

      let p1 = Axios.post(`${Constants.backendApiUrl}/answers`, response);
      let p2 = this.sender.sendKeystrokeBuffer(keystrokeBuffer);

      Promise.all([p1, p2])
        .then((res) => {
          // dgacitua: https://stackoverflow.com/a/57183854
          //this.$router.replace({ path: 'taskform', query: { task: this.$route.query.task, form: Constants.posttaskForm }});
          EventBus.$emit('leticia-next-challenge');
        })
        .catch((err) => {
          console.error(err);
          alert('Ha ocurrido un error al enviar las respuestas [Código 464]');
        });

      /*
      Axios.post(`${Constants.backendApiUrl}/answers`, response)
        .then((res) => {
          // dgacitua: https://stackoverflow.com/a/57183854
          this.$router.replace({ path: 'taskform', query: { task: this.$route.query.task, form: Constants.posttaskForm }});
        })
        .catch((err) => {
          console.error(err);
          alert('Ha ocurrido un error');
        });
      */
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