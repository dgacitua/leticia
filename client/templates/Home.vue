<template>
  <b-container id="home" class="full-height">
    <b-row class="text-center">
      <!-- TODO put image -->
      <b-col>
        <h1>¡Bienvenido(a) a LeTiCiA!</h1>
      </b-col>
    </b-row>
    <br>
    <b-row class="full-height text-center" align-v="center">
      <b-col>
        <b-row align-h="center">
          <b-button-group>
            <b-button to="consent" variant="info">Participar en el estudio</b-button>
          </b-button-group>
        </b-row>
        <br>
        <b-row align-h="center">
          <b-button-group>
            <b-button to="admin-hub" variant="warning">Panel del Administrador</b-button>
          </b-button-group>
        </b-row>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <div>
          <b>Para participar debes:</b>
        </div>
        <ul>
          <li>Ser mayor de edad (18+)</li>
          <li>Usar un computador de escritorio o laptop</li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ActionSender from '../services/ActionSender';

export default {
  name: 'home',

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      else {
        return false;
      }
    }
  },
  
  created() {
    let jwtData = this.$cookies.get('jwt');
    let userData = this.$cookies.get('userdata') || {};
    let sessionFlow = this.$cookies.get('sessionflow') || {};
    
    if (jwtData) {
      localStorage.setItem('leticia-user', JSON.stringify(jwtData));
      
      this.$store.commit('auth/loginSuccess', jwtData);
      this.$store.commit({ type: 'setUserData', data: userData });
      this.$store.commit({ type: 'setSessionFlow', sessionFlow: sessionFlow });

      this.$cookies.remove('jwt');
      this.$cookies.remove('userdata');
      this.$cookies.remove('sessionflow');

      const sender = new ActionSender('UserLog');
      sender.userLog(true);
    }

    if (this.currentUser) {
      if (this.isAdmin) {
        this.$router.push('/admin-hub');
      }
      else {
        this.$router.push('/user-hub');
      }
    }
  }
}
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>