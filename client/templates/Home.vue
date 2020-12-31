<template>
  <b-container id="home" class="full-height">
    <b-row class="text-center">
      <b-col>
        <b-carousel
          id="carousel-header"
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
        >
          <b-carousel-slide :img-src="headerImage">
            <h1>¡Bienvenido(a) a LeTiCiA!</h1>
            <h5><i>tooL for Task diffiCulty Assessment</i></h5>
          </b-carousel-slide>
        </b-carousel>
      </b-col>
    </b-row>
    <br>
    <b-row class="full-height text-center" align-v="center">
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

import HeaderImage from '../assets-client/image01.jpg';

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
        this.$router.replace('/admin-hub');
      }
      else {
        if (this.acceptedConsent) {
          this.$router.replace('/user-hub');
        }
        else {
          this.$router.replace('consent');
        }
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