<template>
  <b-container>
    <b-row>
      <!-- TODO replace placekitten -->
      <b-card img-src="https://placekitten.com/300/300" img-right>
        <b-card-text>A continuación se te presentará una nueva tarea de búsqueda. Léela con atención y realiza las actividades indicadas. Cuando estés listo(a), presiona Siguiente para continuar.</b-card-text>
      </b-card>
    </b-row>
    <br>
    <b-row>
      <b-col class="text-right zero-margin">
        <b-button type="button" variant="success" @click="nextStage">Siguiente</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EventBus from '../../modules/eventBus';

export default {
  methods: {
    nextStage(evt) {
      evt.preventDefault();
      EventBus.$emit('leticia-next-challenge');
    }
  }
}
</script>

<style scoped>

</style>