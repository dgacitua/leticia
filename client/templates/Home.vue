<template>
  <b-container>
    <b-row>
      <h1>¡Bienvenido(a) a LeTiCiA!</h1>
    </b-row>
    <br>
    <b-row>
      <b-button-group>
        <b-button to="login" variant="success">Iniciar sesión</b-button>
        <b-button to="register" variant="info">Registrarse</b-button>
      </b-button-group>
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