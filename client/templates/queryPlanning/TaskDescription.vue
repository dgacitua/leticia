<template>
  <div>
    <b-row>
      <b-card :header="currentTask.title" class="text-center">
        <b-card-text>{{ currentTask.description }}</b-card-text>
      </b-card>
    </b-row>
    <br>
    <b-row class="text-right">
      <b-col>
        <b-button @click="nextStage" variant="success">Continuar</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import EventBus from "../../modules/eventBus";

export default {
  data() {
    return {
      currentStage: this.$store.getters.stages[this.$store.getters.stageIndex],
      currentTask: {}
    }
  },

  mounted() {
    this.currentTask = this.$store.getters.tasks.find((e) => { return e.searchTaskId === this.currentStage.query.task });
    console.log('CurrentTask', this.currentTask, this.currentStage.query.task);
    //let nextStage = this.$store.getters.stages[this.$store.getters.stageIndex];
    //this.$router.replace(nextStage);
  },

  methods: {
    nextStage() {
      //window.dispatchEvent(new CustomEvent('leticia-next-stage'));
      EventBus.$emit('leticia-next-stage');
    }
  }
}
</script>

<style scoped>

</style>