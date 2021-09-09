<template>
  <b-container>
    <b-row>
      <h1>{{ $t("search.instructions.title") }}</h1>
    </b-row>
    <br>
    <b-row>
      <b-card :img-src="image" img-right>
        <b-card-text>
          <p>{{ $t("search.instructions.text[0]") }}</p>
          <p>{{ $t("search.instructions.text[1]", { numDocs: minDocs }) }}</p>
          <p>{{ $t("search.instructions.text[2]") }}</p>
          <div class="text-center">
            <b-button variant="primary">
              <font-awesome-icon :icon="['fas', 'bookmark']"></font-awesome-icon>
              {{ $t("navbar.bookmark") }}
            </b-button>
            <b-button variant="primary">
              <font-awesome-icon :icon="['fas', 'file']"></font-awesome-icon>
              {{ $t("navbar.unbookmark") }}
            </b-button>
          </div>
          <br>
          <p>{{ $t("search.instructions.text[3]") }}</p>
          <div class="text-center">
            <b-button variant="info">
              <font-awesome-icon :icon="['fas', 'arrow-left']"></font-awesome-icon>
              {{ $t("navbar.backButton") }}
            </b-button>
          </div>
          <br>
          <p>{{ $t("search.instructions.text[4]", { numDocs: minDocs }) }}</p>
          <div class="text-center">
            <b-button variant="success">
              <font-awesome-icon :icon="['fas', 'check']"></font-awesome-icon>
              {{ $t("navbar.finishSearch") }}
            </b-button>  
          </div>        
        </b-card-text>
      </b-card>
    </b-row>
    <br>
    <b-row>
      <b-col class="text-right">
        <b-button @click="nextStage" variant="success">{{ $t("search.instructions.continueButton") }}</b-button>
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
      image: Image,
      minDocs: 0
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  mounted() {
    this.instructions = this.$store.getters.sessionFlow.instructions || 'No hay instrucciones';
    this.minDocs = this.$store.getters.sessionFlow.minDocs || 3;
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