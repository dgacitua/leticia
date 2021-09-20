<template>
  <b-container id="home" class="full-height">
    <b-row class="text-center">
      <b-col>
        <b-carousel
          id="carousel-header"
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 3px 3px 3px #000;"
        >
          <b-carousel-slide :img-src="headerImage">
            <h1>¡Bienvenido(a) a LETICIA!</h1>
            <h5><i>simuLatEd Task and actIvity Capture Interactive plAtform</i></h5>
          </b-carousel-slide>
        </b-carousel>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <div>
          <b>Consideraciones para participar:</b>
        </div>
        <ul>
          <li>Debes ser mayor de edad (18+)</li>
          <li>Debes tener conocimientos básicos acerca del uso de buscadores web</li>
          <li>Debes usar un computador de escritorio o laptop</li>
          <li>Sitio web no compatible con dispositivos móviles (teléfonos y tablets)</li>
          <li>Métodos de entrada compatibles: Teclado y ratón</li>
          <li>Se recomienda utilizar un navegador web actualizado (como puede ser Chrome, Firefox o Edge)</li>
          <li>Resolución de pantalla recomedada: 1366x768 (o superior)</li>
        </ul>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <b-alert show variant="secondary">
          <b>IMPORTANTE:</b> En caso de presentar alguna dificultad con el sistema a la hora de realizar la actividad, puedes cerrar la pestaña (o cerrar la sesión) y luego ingresar nuevamente con las mismas credenciales para continuar la actividad en la etapa donde la dejaste.
        </b-alert>
      </b-col>
    </b-row>
    <br>
    <b-row class="text-center" align-v="center">
      <b-col>
        <b-row align-h="center">
          <b-button-group>
            <b-button to="oauth" variant="info">Participar en el estudio</b-button>
          </b-button-group>
        </b-row>
        <br>
        <!--
        <b-row align-h="center">
          <b-button-group>
            <b-button to="admin-hub" variant="warning">Panel del Administrador</b-button>
          </b-button-group>
        </b-row>
        -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ActionSender from '../services/ActionSender';

import HeaderImage from '../assets/image01.jpg';

export default {
  name: 'home',

  data() {
    return {
      headerImage: HeaderImage
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    acceptedConsent() {
      return this.$store.state.hasAcceptedConsent;
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
    let userData = this.$cookies.get('userdata');
    let sessionFlow = this.$cookies.get('sessionflow');

    //console.log('Retrieving UserData from cookies', jwtData, userData, sessionFlow);
    
    if (jwtData) {
      localStorage.setItem('leticia-user', JSON.stringify(jwtData));
      
      this.$store.commit('auth/loginSuccess', jwtData);

      if (userData) this.$store.commit({ type: 'setUserData', data: userData });
      if (sessionFlow) this.$store.commit({ type: 'setSessionFlow', sessionFlow: sessionFlow });

      this.$cookies.remove('jwt');
      this.$cookies.remove('userdata');
      this.$cookies.remove('sessionflow');

      const sender = new ActionSender('UserLog');
      sender.userLog(true);
    }

    if (this.currentUser) {
      if (this.isAdmin) {
        this.$router.replace('/admin-hub');
      }
      else {
        this.$router.replace('/user-hub');
        /*
        if (this.acceptedConsent) {
          this.$router.replace('/user-hub');
        }
        else {
          this.$router.replace('consent');
        }
        */
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