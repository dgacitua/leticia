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
            <h1>{{ $t("home.title") }}</h1>
            <h5><i>{{ $t("home.subtitle") }}</i></h5>
          </b-carousel-slide>
        </b-carousel>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <div>
          <b>{{ $t("home.considerations") }}:</b>
        </div>
        <ul>
          <li>{{ $t("home.considerationsText[0]") }}</li>
          <li>{{ $t("home.considerationsText[1]") }}</li>
          <li>{{ $t("home.considerationsText[2]") }}</li>
          <li>{{ $t("home.considerationsText[3]") }}</li>
          <li>{{ $t("home.considerationsText[4]") }}</li>
          <li>{{ $t("home.considerationsText[5]") }}</li>
          <li>{{ $t("home.considerationsText[6]") }}</li>
        </ul>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <b-alert show variant="secondary">
          <b>{{ $t("home.troubleshootingText[0]") }}</b> {{ $t("home.troubleshootingText[1]") }}
        </b-alert>
      </b-col>
    </b-row>
    <br>
    <b-row class="text-center" align-v="center">
      <b-col>
        <b-row align-h="center">
          <b-button-group>
            <b-button to="oauth" variant="info">{{ $t("home.participate") }}</b-button>
          </b-button-group>
        </b-row>
        <br>
        <!--
        <b-row align-h="center">
          <b-button-group>
            <b-button to="admin-hub" variant="warning">Admin Panel</b-button>
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