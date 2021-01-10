<template>
  <div>
    <b-navbar variant="dark" type="dark" class="d-flex justify-content-between">
      <router-link to="/">
        <b-navbar-brand tag="h1" class="mb-0">LeTiCiA <sub>PILOT</sub></b-navbar-brand>
      </router-link>

      <b-navbar-nav v-if="currentTimer">
        <b-nav-text>
          <b>{{ currentTimer }}</b>
        </b-nav-text>
      </b-navbar-nav>

     <b-navbar-nav v-if="currentUser">
        <b-nav-item>
          <font-awesome-icon icon="user"/>
        </b-nav-item>
        <b-nav-text to="/profile">
          {{ currentUser.email || currentUser.username }}
        </b-nav-text>
        <b-nav-item @click.prevent="logout">
          <font-awesome-icon icon="sign-out-alt" />
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import ActionSender from '../services/ActionSender';
import EventBus from '../modules/eventBus';

import Timer from '../services/Timer';
import { toHHMMSS } from '../services/Utils';

export default {
  name: 'navbar',

  data() {
    return {
      timer: null
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      else {
        return false;
      }
    },
    currentTimer() {
      if (Number.isInteger(this.$store.state.timerTime) && this.$store.state.timerTime >= 0) {
        return toHHMMSS(this.$store.state.timerTime);
      }
      else {
        return null;
      }
    }
  },

  created() {
    EventBus.$on('leticia-timer-create', (data) => {
      this.timer = new Timer(data.totalTime);
      this.timer.start();
    });

    EventBus.$on('leticia-timer-stop', () => {
      if (this.timer) {
        this.timer.stop();
        this.timer = null;
      }
    });

    EventBus.$on('leticia-timer-pause', () => {
      if (this.timer) {
        this.timer.pause();
      }
    });

    EventBus.$on('leticia-timer-resume', () => {
      if (this.timer) {
        this.timer.resume();
      }
    });
  },

  methods: {
    logout() {
      EventBus.$emit('leticia-timer-stop');

      const sender = new ActionSender('UserLog');
      sender.userLog(false);

      this.$store.dispatch('auth/logout');
      //this.$store.dispatch('eraseAll');
      this.$router.replace('/');
    }
  }
}
</script>

<style scoped>
</style>