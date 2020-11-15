<template>
  <b-container>
    <b-row>
      <h1>¡Bienvenido(a) a LeTiCiA!</h1>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <b-row align-h="center">
          <b-button-group>
            <b-button to="consent" variant="info">Participar en el estudio</b-button>
            <b-button to="oauth" variant="success">Iniciar sesión</b-button>
          </b-button-group>
        </b-row>
        <br/>
        <!-- TODO disable Admin Hub -->
        <b-row align-h="center">
          <b-button-group>
            <b-button to="admin-hub" variant="warning">Panel del Administrador</b-button>
          </b-button-group>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'home',

  computed: {
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
  
  beforeMount() {
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
    }

    if (this.currentUser) {
      if (this.isAdmin) {
        this.$router.push('/admin-hub');
      }
      else {
        this.$router.push('/user-hub');
      }
    }
  },
}
</script>

<style scoped>

</style>