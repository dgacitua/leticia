<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card :header="currentTask.title" class="text-center">
          <b-card-text>{{ currentTask.description }}</b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <br>
    <b-row class="text-right">
      <b-col>
        <b-button @click="nextStage" variant="success">Continuar</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EventBus from '../../modules/eventBus';

export default {
  data() {
    return {
      currentStage: this.$store.getters.stages[this.$store.getters.stageIndex],
      currentTask: {}
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  mounted() {
    this.currentTask = this.$store.getters.tasks.find((e) => { return e.searchTaskId === this.currentStage.query.task });
    this.$store.commit({ type: 'setCurrentTask', task: this.currentTask });
    console.log('CurrentTask', this.currentTask, this.currentStage.query.task);
    //let nextStage = this.$store.getters.stages[this.$store.getters.stageIndex];
    //this.$router.replace(nextStage);
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