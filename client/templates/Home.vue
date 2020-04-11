<template>
  <div>
    <h1>¡Bienvenido a LeTiCiA!</h1>
    <questionnaire></questionnaire>
  </div>
</template>

<script>
import Questionnaire from './Questionnaire';

export default {
  name: 'home',

  components: {
    questionnaire: Questionnaire
  }
}
</script>

<style scoped>

</style>