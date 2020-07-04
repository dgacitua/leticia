<template>
  <div>
    <b-navbar variant="primary" type="dark" class="d-flex justify-content-between">
      <!--
      <div>
        <router-link v-show="$route.name !== 'home' " to="/">
          <span class="text-white">
            <span class="mr-2">
              <font-awesome-icon icon="chevron-left" />
            </span>
            Volver
          </span>
        </router-link>
      </div>
      -->

      <router-link to="/">
        <b-navbar-brand tag="h1" class="mb-0">LeTiCiA <sub>PILOT</sub></b-navbar-brand>
      </router-link>

      <!--
      <b-navbar-nav>
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <span>{{ $auth.user().name }}</span>
          </template>
          <b-dropdown-item @click="logout">Salir</b-dropdown-item>
      </b-navbar-nav>
      -->

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

      <!--
      <b-navbar-nav v-if="isValidParticipant">
        <b-button @click="finalize" variant="success">Finalizar</b-button>
      </b-navbar-nav>
      -->
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

      return false;
    },
    /*
    isValidParticipant() {
      return this.$store.getters.isValidParticipant;
    }
    */
  },

  methods: {
    finalize() {
      this.$store.dispatch({ type: 'finishParticipant', reason: 'VoluntaryQuit' })
      .then((res) => {
        // dgacitua: https://stackoverflow.com/a/57183854
        this.$router.replace({ path: 'end' });
      })
      .catch((err) => {
        console.error(err);
        alert('Ha ocurrido un error');
      });
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$store.dispatch('eraseAll');
      this.$router.push('/');
    }
    /*
    logout() {
      this.$auth.logout({
        success (response) {
          this.$router.push('/login');
        },
        error () {
          alert('No se ha podido cerrar su sesión.');
        }
      });
    }
    */
  }
}
</script>

<style scoped>
</style>