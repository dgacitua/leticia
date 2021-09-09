<template>
  <b-container id="admin-hub">
    <b-row>
      <h1>Admin Hub</h1>
    </b-row>
    <b-row>
      <b-col>
        <b-row>
          <h2>Short Challenge Stages</h2>
        </b-row>
        <b-row>
          <b-button-group vertical>
            <b-button @click="simulateLogin">Simulate Login</b-button>
            <b-button to="consent">Informed Consent</b-button>
            <b-button to="demographic">Demographic Questionnaire</b-button>
            <b-button to="typing">Typing Test (baseline)</b-button>
            <b-button to="instructions">General Instructions</b-button>
            <b-button to="tasks">Query Planning</b-button>
            <b-button to="exit-survey">Exit Survey</b-button>
            <b-button to="short-challenge">Short Challenge</b-button>
            <b-button to="consent">Full Short Challenge</b-button>
          </b-button-group>
        </b-row>
      </b-col>
      <b-col>
        <b-row>
          <h2>Extended Challenge Stages</h2>
        </b-row>
        <b-row>
          <b-button-group vertical>
            <b-button @click="simulateLogin">Simulate Login</b-button>
            <b-button to="/extended-challenge/search">Search</b-button>
            <b-button to="extended-challenge">Extended Challenge</b-button>
            <b-button to="consent">Full Extended Challenge</b-button>
          </b-button-group>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ActionSender from '../../services/ActionSender';

export default {
  name: 'AdminHub',

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  
  methods: {
    simulateLogin() {
      this.$store.dispatch('auth/simulatedLogin');
    } 
  }
}
</script>

<style scoped>
</style>