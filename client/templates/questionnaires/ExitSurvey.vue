<template>
  <b-container>
    <b-row>
      <h2>{{ $t("exitSurvey.title") }}</h2>
    </b-row>
    <b-row>
      <p>{{ $t("exitSurvey.instructions") }}</p>
    </b-row>
    <br>
    <b-row>
      <b-form id="exit-survey" @submit="onSubmit">
        <!-- Questions -->
        <b-row v-for="q in questions" :key="q.questionId"  class="zero-margin">
          <b-col>
            <b-row v-if="q.type==='input'" :id="q.questionId" class="zero-margin">
              <inputquestion :props="q"></inputquestion>
            </b-row>
            <b-row v-if="q.type==='likert'" :id="q.questionId" class="zero-margin">
              <likertscale :props="q"></likertscale>
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
            <b-button type="submit" variant="success">{{ $t("exitSurvey.submitButtton") }}</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-row>
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

import LikertScale from '../formElements/LikertScale.vue';
import MultiQuery from '../formElements/MultiQuery.vue';
import Input from '../formElements/Input.vue';
import Paragraph from '../formElements/Paragraph.vue';

export default {
  name: 'exit-survey',

  components: {
    likertscale: LikertScale,
    multiquery: MultiQuery,
    inputquestion: Input,
    paragraph: Paragraph
  },

  data() {
    return {
      formId: Constants.isPilotMode ? 'exit' : 'exit-final',
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
        console.log('ExitSurvey Questions Loaded!', this.questions);
      })
      .catch((err) => {
        console.error(err);
        alert('An error ocurred while loading the questions [Code 468]');
      });
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      if (this.loggedIn) {
        let formId = this.formId;
        let answers = getVueArray(this.questions).map(el => { return { questionId: el.questionId, answer: el.answer }});

        let response = {
          username: this.currentUser.username,
          taskId: formId,
          formId: formId,
          clientTimestamp: Date.now(),
          answers: answers
        }

        console.log('Form Answer', response);

        Axios.post(`${Constants.backendApiUrl}/answers`, response)
          .then((res) => {
            EventBus.$emit('leticia-next-stage');
          })
          .catch((err) => {
            console.error(err);
            alert('An error ocurred while submitting the answers [Code 469]');
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