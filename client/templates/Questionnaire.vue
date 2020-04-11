<template>
  <form id="app" @submit="onSubmit">
    <div v-for="q in questions" :key="q.questionId">
      <div v-if="q.type==='likert'">
        <likertscale :props="q"></likertscale>
      </div>
      <div v-if="q.type==='paragraph'">
        <paragraph :props="q"></paragraph>
      </div>
      <div v-if="q.type==='multiquery'">
        <multiquery :props="q"></multiquery>
      </div>
    </div>
    <div>
      <input type="submit" value="Enviar respuesta">
    </div>
  </form>
</template>

<script>
import { getVueArray } from '../services/Utils'

import LikertScale from './formElements/LikertScale';
import MultiQuery from './formElements/MultiQuery';
import Paragraph from './formElements/Paragraph';

export default {
  name: 'questionnaire',

  components: {
    likertscale: LikertScale,
    multiquery: MultiQuery,
    paragraph: Paragraph
  },

  data() {
    return {
      questions: [
        {
          questionId: 'test1',
          type: 'likert',
          title: 'Q1?',
          hint: 'T1!',
          start: 1,
          stop: 6,
          step: 1,
          minLabel: 'Lo',
          maxLabel: 'Hi',
          required: true,
          answer: null
        },
        {
          questionId: 'test2',
          type: 'likert',
          title: 'Q2?',
          hint: 'T2!',
          start: 0,
          stop: 100,
          step: 10,
          minLabel: 'Lo',
          maxLabel: 'Hi',
          required: true,
          answer: null
        },
        {
          questionId: 'test3',
          type: 'paragraph',
          title: 'Q3?',
          hint: 'T3!',
          answer: ''
        },
        {
          questionId: 'test4',
          type: 'multiquery',
          title: 'Q4?',
          hint: 'T4!',
          queries: 3,
          answer: []
        }
      ],
    }
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      let answers = getVueArray(this.questions).map(el => { return { questionId: el.questionId, answer: el.answer }});
      console.log(answers);
    }
  }
}
</script>

<style scoped>

</style>