<template>
  <b-container>
    <b-row>
      <b-card :img-src="image" img-right>
        <b-card-text>{{ $t("taskReady.instructions") }}</b-card-text>
      </b-card>
    </b-row>
    <br>
    <b-row>
      <b-col class="text-right zero-margin">
        <b-button type="button" variant="success" @click="nextStage">{{ $t("taskReady.nextStageButton") }}</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EventBus from '../../modules/eventBus';

import Image from '../../assets/image03.jpg';

export default {
  data() {
    return {
      image: Image
    }
  },

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