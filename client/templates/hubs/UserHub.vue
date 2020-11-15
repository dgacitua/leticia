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
export default {
  name: 'UserHub',

  methods: {
    resumeStudy() {
      // TODO fix resume route
      if (this.$store.getters.flowIndex >= 0) {
        console.log('Resuming Challenge!');
            
        let nextFlowStage = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].name;
        this.$router.replace(nextFlowStage);
      }
      else {
        console.log('Starting Challenge!');
        this.$store.commit({ type: 'setFlowIndex', amount: 0 });
        
        let nextFlowStage = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].name;
        this.$router.replace(nextFlowStage);
      }
    }
  }
}
</script>

<style scoped>
</style>