<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> {{ $t("profile.title") }}
      </h3>
    </header>
    <p>
      <strong>{{ $t("profile.token") }}:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>{{ $t("profile.id") }}:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>{{ $t("profile.email") }}:</strong>
      {{currentUser.email}}
    </p>
    <strong>{{ $t("profile.roles") }}:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
  </div>
</template>

<script>
import ActionSender from '../services/ActionSender';

export default {
  name: 'Profile',

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>