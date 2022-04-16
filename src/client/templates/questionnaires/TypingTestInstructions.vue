<template>
  <b-container>
    <b-row>
      <h1>{{ $t("typingTest.titleInstructions") }}</h1>
    </b-row>
    <br>
    <b-row>
      <b-card :img-src="image" img-right>
        <b-card-text>
          <p>{{ $t("typingTest.instructions[0]") }}</p>
          <p>{{ $t("typingTest.instructions[1]") }}</p>
          <p>{{ $t("typingTest.instructions[2]") }}</p>
          <p>{{ $t("typingTest.instructions[3]") }}</p>
        </b-card-text>
      </b-card>
    </b-row>
    <br>
    <b-row>
      <b-col class="text-right">
        <b-button @click="nextStage" variant="success">{{ $t("typingTest.nextStageButton") }}</b-button>
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