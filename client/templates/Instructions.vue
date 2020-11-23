<template>
  <b-container>
    <b-row>
      <h1>Instrucciones del desafío</h1>
    </b-row>
    <br>
    <b-row>
      <!-- TODO replace placekitten -->
      <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-right>
        <b-card-text>
          {{ instructions }}
        </b-card-text>
      </b-card>
    </b-row>
    <br>
    <b-row>
      <b-button @click="nextStage" variant="success">Ir a la tarea</b-button>
    </b-row>
  </b-container>
</template>

<script>
import EventBus from '../modules/eventBus';

export default {
  name: 'instructions',

  data() {
    return {
      instructions: ''
    }
  },

  mounted() {
    this.instructions = this.$store.getters.sessionFlow.instructions || 'No hay instrucciones';
  },

  methods: {
    nextStage() {
      EventBus.$emit('leticia-next-stage');
    }
  }
}
</script>

<style scoped>

</style>