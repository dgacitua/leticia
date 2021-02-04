<template>
  <b-container>
    <b-row>
      <h1>Instrucciones del desafío</h1>
    </b-row>
    <br>
    <b-row>
      <b-card :img-src="image" img-right>
        <b-card-text>
          <p>En este desafío se te presentarán una serie de tareas de búsqueda, para lo cual deberás hacer consultas de búsqueda para encontrar documentos que puedan resolver dichas tareas. Una vez introducida la tarea, deberás llenar los cuestionarios para poder acceder al motor de búsqueda de LeTiCiA. Tienes 25 minutos para completar el desafío.</p>
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