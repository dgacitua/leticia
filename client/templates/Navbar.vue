<template>
  <div>
    <b-navbar variant="primary" type="dark" class="d-flex justify-content-between">
      <router-link to="/">
        <b-navbar-brand tag="h1" class="mb-0">LeTiCiA <sub>PILOT</sub></b-navbar-brand>
      </router-link>

     <b-navbar-nav v-if="currentUser">
        <b-nav-item>
          <font-awesome-icon icon="user"/>
        </b-nav-item>
        <b-nav-text to="/profile">
          {{ currentUser.username }}
        </b-nav-text>
        <b-nav-item @click.prevent="logout">
          <font-awesome-icon icon="sign-out-alt" />
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar',

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
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$store.dispatch('eraseAll');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
</style>