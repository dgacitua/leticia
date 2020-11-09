<template>
  <div>
    <h2>{{ currentTask.title }}</h2>
    <div>{{ currentTask.description }}</div>
    <b-button @click="nextStage">Continuar</b-button>
  </div>
</template>

<script>
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
      window.dispatchEvent(new CustomEvent('leticia-next-stage'));
    }
  }
}
</script>

<style scoped>

</style>