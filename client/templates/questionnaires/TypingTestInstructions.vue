<template>
  <b-container>
    <b-row>
      <h1>Instrucciones Test de Escritura</h1>
    </b-row>
    <br>
    <b-row>
      <b-card :img-src="image" img-right>
        <b-card-text>
          En la siguiente prueba relizarás un test de escritura. Tipea cada extracto de texto que veas en el campo de texto tal cual como está escrito. Usa tu velocidad de tipeo natural, no te aceleres. Al terminar de redactar cada extracto, presiona Enter o Siguiente para continuar.
        </b-card-text>
      </b-card>
    </b-row>
    <br>
    <b-row>
      <b-col class="text-right">
        <b-button @click="nextStage" variant="success">Ir al test</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ActionSender from '../../services/ActionSender';
import EventBus from '../../modules/eventBus';

import Image from '../../assets/image02.jpg';

export default {
  name: 'typing-instructions',

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