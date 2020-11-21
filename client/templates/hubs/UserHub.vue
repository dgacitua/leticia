<template>
  <b-container id="user-hub">
    <b-row>
      <h1>Panel del usuario</h1>
    </b-row>
    <b-row>
      <b-col>
        <b-button-group vertical>
            <b-button @click="resumeStudy" variant="success">Iniciar/Continuar</b-button>            
          </b-button-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EventBus from '../../modules/eventBus';

export default {
  name: 'UserHub',

  methods: {
    resumeStudy() {
      // Resume stage from challenge
      if (this.$store.getters.flowIndex >= 0) {
        console.log('Resuming Challenge!');
            
        let nextFlowStage = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].path;
        let nextFlowParams = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].params;
        let nextFlowTimeLimit = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].timeLimit;

        if (nextFlowTimeLimit > 0) {
          EventBus.$emit('leticia-timer-create', { totalTime: this.$store.state.timerTime });
        }

        this.$router.replace({ path: nextFlowStage });
      }
      // Start new challenge
      else {
        console.log('Starting Challenge!');
        this.$store.commit({ type: 'setFlowIndex', amount: 0 });
        
        let nextFlowStage = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].path;
        let nextFlowParams = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].params;
        let nextFlowTimeLimit = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].timeLimit;
        
        if (nextFlowTimeLimit > 0) {
          EventBus.$emit('leticia-timer-create', { totalTime: nextFlowTimeLimit });
        }

        this.$router.replace({ path: nextFlowStage });
      }
    }
  }
}
</script>

<style scoped>
</style>