<template>
  <b-container>
    <b-row class="space-bottom">
      <div>{{ $t("questionnaire.instructions") }}</div>
    </b-row>
    <br>
    <b-row class="space-bottom">
      <b-col>
        <b-form id="taskform" @submit="onSubmit" class="full-width">
          <b-row v-for="q in questions" :key="q.questionId" class="zero-margin">
            <b-col>
              <b-row v-if="q.type==='input'" :id="q.questionId" class="zero-margin">
                <b-col>
                  <inputquestion :props="q"></inputquestion>
                </b-col>
              </b-row>
              <b-row v-if="q.type==='likert'" :id="q.questionId" class="zero-margin">
                <b-col>
                  <likertscale :props="q"></likertscale>
                </b-col>
              </b-row>
              <b-row v-if="q.type==='paragraph'" :id="q.questionId" class="zero-margin">
                <b-col>
                  <paragraph :props="q"></paragraph>
                </b-col>
              </b-row>
              <b-row v-if="q.type==='multiquery'" :id="q.questionId" class="zero-margin">
                <b-col>
                  <multiquery :props="q"></multiquery>
                </b-col>
              </b-row>
              <br>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col class="text-right zero-margin">
              <b-button type="submit" variant="success">{{ $t("questionnaire.submitButtton") }}</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ActionSender from '../services/ActionSender';
import { getVueArray } from '../services/Utils';

import LikertScale from './formElements/LikertScale.vue';
import MultiQuery from './formElements/MultiQuery.vue';
import Input from './formElements/Input.vue';
import Paragraph from './formElements/Paragraph.vue';

export default {
  name: 'questionnaire',

  components: {
    likertscale: LikertScale,
    multiquery: MultiQuery,
    input: Input,
    paragraph: Paragraph
  },

  data() {
    return {
      task: {},
      questions: []
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  mounted() {
    let taskId = this.$route.query.task;
    let formId = this.$route.query.form;

    let p1 = Axios.get(`${Constants.backendApiUrl}/tasks/${taskId}`);
    let p2 = Axios.get(`${Constants.backendApiUrl}/forms/fetch/${formId}`);

    Promise.all([p1, p2])
      .then((values) => { 
        this.task = values[0].data;
        this.questions = values[1].data;
        console.log('TaskForm Questions Loaded!', this.questions);
      })
      .catch((err) => {
        console.error(err);
        alert('An error ocurred while loading the questions [Code 465]');
      });
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      if (this.loggedIn) {
        let taskId = deepCopy(this.$route.query.task);
        let formId = deepCopy(this.$route.query.form);
        let answers = getVueArray(this.questions).map(el => { return { questionId: el.questionId, answer: el.answer }});

        let response = {
          username: this.currentUser.username,
          taskId: taskId,
          formId: formId,
          clientTimestamp: Date.now(),
          answers: answers
        }

        console.log('Form Answer', response);

        Axios.post(`${Constants.backendApiUrl}/answers`, response)
          .then((res) => {
            if (formId === Constants.pretaskFormEx) {
              // dgacitua: https://stackoverflow.com/a/57183854
              //this.$router.replace({ path: 'query', query: { task: this.$route.query.task, form: Constants.queryForm }});
            }
            else {
              // dgacitua: https://stackoverflow.com/a/57183854
              this.$store.commit({ type: 'setTaskAsDone', id: taskId });
              //this.$router.replace({ path: 'tasks' });
            }

            EventBus.$emit('leticia-next-challenge');
          })
          .catch((err) => {
            console.error(err);
            alert('An error ocurred while submitting the answers [Code 466]');
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