<template>
  <b-container>
    <b-row>
      <h1>Instrucciones del desafío</h1>
    </b-row>
    <br>
    <b-row>
      <b-card :img-src="image" img-right>
        <b-card-text>
          <p>En este desafío se te presentarán una serie de tareas de búsqueda, para las cuales deberás crear al menos 3 consultas de búsqueda para cada una, como si fueras a plantearlas en un motor de búsqueda web. Tienes 15 minutos para realizar este desafío.</p>
          <p></p>
          <p></p>
          <p></p>
        </b-card-text>
      </b-card>
    </b-row>
    <br>
    <b-row>
      <b-col class="text-right">
        <b-button @click="nextStage" variant="success">Ir al desafío</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ActionSender from '../../services/ActionSender';
import EventBus from '../../modules/eventBus';

import Image from '../../assets/image04.jpg';

export default {
  name: 'instructions',

  data() {
    return {
      instructions: '',
      image: Image
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
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