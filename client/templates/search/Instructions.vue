<template>
  <b-container>
    <b-row>
      <h1>Instrucciones del desafío</h1>
    </b-row>
    <br>
    <b-row>
      <b-card :img-src="image" img-right>
        <b-card-text>
          <!-- TODO Task Description -->
          <p>A continuación se te habilitará un motor de búsqueda en el cual podrás relizar consultas y buscar documentos (páginas web) adecuados para resolver la necesidad de información de la tarea indicada.</p>
          <p>Debes marcar 3 o más documentos que sean relevantes para la tarea.</p>
          <p>Para marcar o desmarcar documentos, ingresa al documento desde la lista de resultados de búsqueda y utiliza los botones de marcar/desmarcar documento en la barra superior.</p>
          <div class="text-center">
            <b-button variant="primary">
              <font-awesome-icon :icon="['fas', 'bookmark']"></font-awesome-icon>
              Marcar documento
            </b-button>
            <b-button variant="primary">
              <font-awesome-icon :icon="['fas', 'file']"></font-awesome-icon>
              Desmarcar documento
            </b-button>
          </div>
          <br>
          <p>Para volver al motor de búsqueda, utiliza el botón atrás en la barra superior.</p>
          <div class="text-center">
            <b-button variant="info">
              <font-awesome-icon :icon="['fas', 'arrow-left']"></font-awesome-icon>
              Atrás
            </b-button>
          </div>
          <br>
          <p>Cuando tengas 3 o más documentos marcados, puedes terminar la búsqueda con el botón "Terminar búsqueda" en la barra superior.</p>
          <div class="text-center">
            <b-button variant="success">
              <font-awesome-icon :icon="['fas', 'check']"></font-awesome-icon>
              Terminar búsqueda
            </b-button>  
          </div>        
        </b-card-text>
      </b-card>
    </b-row>
    <br>
    <b-row>
      <b-col class="text-right">
        <b-button @click="nextStage" variant="success">Continuar</b-button>
      </b-col>
    </b-row>
    <br>
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
      EventBus.$emit('leticia-next-challenge');
    }
  }
}
</script>

<style scoped>

</style>