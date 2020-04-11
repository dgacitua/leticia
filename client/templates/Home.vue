<template>
  <div>
    <h1>Hello World!</h1>
    <div>
      <likertscale v-for="q in questions" :key="q.questionId" :data="q"></likertscale>
    </div>
  </div>
</template>

<script>
import LikertScale from './LikertScale';

export default {
  name: 'home',

  components: {
    likertscale: LikertScale
  },

  data() {
    return {
      questions: [
        {
          questionId: 1,
          title: 'Q?',
          hint: 'T!',
          start: 1,
          stop: 6,
          step: 1,
          minLabel: 'Lo',
          maxLabel: 'Hi',
          required: true
        }
      ],
      values: []
    }
  }
}
</script>

<style scoped>

</style>