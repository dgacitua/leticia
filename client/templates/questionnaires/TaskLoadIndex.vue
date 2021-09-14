<template>
  <b-container>
    <div>
      <b-row>
        <h2>{{ $t("taskLoadIndex.title") }}</h2>
      </b-row>
      <b-row>
        <div>{{ $t("taskLoadIndex.instructions") }}</div>
      </b-row>
    </div>
    <br>
    <div>
      <b-row>
        <b-form id="nasa-tlx" @submit="onSubmit">
          <!-- Questions -->
          <b-row v-for="q in questions" :key="q.questionId"  class="zero-margin">
            <b-col>
              <b-row v-if="q.type==='likert'" :id="q.questionId" class="zero-margin">
                <likertscale :props="q"></likertscale>
              </b-row>
              <b-row v-if="q.type==='anonlikert'" :id="q.questionId" class="zero-margin">
                <anonlikert :props="q"></anonlikert>
              </b-row>
              <b-row v-if="q.type==='paragraph'" :id="q.questionId" class="zero-margin">
                <paragraph :props="q"></paragraph>
              </b-row>
              <b-row v-if="q.type==='multiquery'" :id="q.questionId" class="zero-margin">
                <multiquery :props="q"></multiquery>
              </b-row>
              <br>
            </b-col>
          </b-row>
          <!-- Submit -->
          <b-row>
            <b-col class="text-right">
              <b-button type="submit" variant="success">{{ $t("taskLoadIndex.submitButtton") }}</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-row>
    </div>
    <!--
    <hr>
    <pre>{{ form }}</pre>
    -->
  </b-container>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../../services/Constants';
import { getVueArray, deepCopy } from '../../services/Utils';
import ActionSender from '../../services/ActionSender';
import EventBus from '../../modules/eventBus';

import LikertScale from '../formElements/LikertScale';
import AnonLikert from '../formElements/AnonLikert';
import MultiQuery from '../formElements/MultiQuery';
import Paragraph from '../formElements/Paragraph';

export default {
  name: 'nasa-tlx',

  components: {
    likertscale: LikertScale,
    multiquery: MultiQuery,
    paragraph: Paragraph,
    anonlikert: AnonLikert
  },

  data() {
    return {
      formId: this.$route.query.form || 'nasatlx',
      form: {},
      questions: []
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
    Axios.get(`${Constants.backendApiUrl}/forms/fetch/${this.formId}`)
      .then((res) => {
        this.questions = res.data;
        console.log('NASA-TLX Questions Loaded!', this.questions);
      })
      .catch((err) => {
        console.error(err);
        alert('An error ocurred while loading the questions [Code 473]');
      });
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      if (this.loggedIn) {
        let answers = getVueArray(this.questions).map(el => { return { questionId: el.questionId, answer: el.answer }});
        let partialScore = answers.map(el => (el.answer - 1) * 5);
        let finalScore = partialScore.reduce((a, b) => a + b, 0) / partialScore.length;

        let response = {
          username: this.currentUser.username,
          taskId: deepCopy(this.$route.query.task || 'no-task'),
          formId: deepCopy(this.$route.query.form || this.formId),
          clientTimestamp: Date.now(),
          answers: answers,
          score: finalScore
        }

        console.log('Form Answer', response);

        Axios.post(`${Constants.backendApiUrl}/answers`, response)
          .then((res) => {
            EventBus.$emit('leticia-next-challenge');
          })
          .catch((err) => {
            console.error(err);
            alert('An error ocurred while submitting the answers [Code 474]');
          });
      }
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