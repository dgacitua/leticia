<template>
  <b-row align-v="center" class="justify-content-md-center">
    <b-col class="login-card" cols="6">
      <b-card
        border-variant="primary"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <template v-slot:header>
          <div>
            LeTiCiA <sub>PILOT</sub>
          </div>
        </template>
        <b-form @submit.stop.prevent="login">
          <b-input-group class="mb-3">
            <template v-slot:prepend>
              <b-input-group-text>
                <font-awesome-icon icon="user" />
              </b-input-group-text>
            </template>
            <b-form-input type="text" v-model="user.name" :state="isValid" placeholder="Nombre de Usuario"></b-form-input>
            <template v-slot:append>
              <b-button variant="outline-info" @click="setRandomUsername">
                <font-awesome-icon icon="random" />
              </b-button>
            </template>
          </b-input-group>
          <b-input-group class="mb-3">
            <template v-slot:prepend>
              <b-input-group-text>
                <font-awesome-icon icon="lock" />
              </b-input-group-text>
            </template>
            <b-form-input :type="showPassword ? 'text' : 'password'" v-model="user.password" :state="isValid" placeholder="Contraseña"></b-form-input>
            <template v-slot:append>
              <b-button variant="outline-info" @click="showPassword = !showPassword">
                <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye' " />
              </b-button>
            </template>
          </b-input-group>
          <b-input-group class="mb-3">
            <small class="status-msg">{{ status }}</small>
          </b-input-group>
          <b-input-group>
            <b-button type="submit" variant="primary" block :disabled="loading">
              <b-spinner v-if="loading" small type="grow"></b-spinner>
              <span v-if="loading">Cargando...</span>
              <span v-if="!loading">Iniciar sesión</span>
              <font-awesome-icon icon="sign-in-alt" />
            </b-button>
          </b-input-group>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'login',

  data() {
    return {
      showPassword: false,
      user: {
        name: '',
        password: ''
      },
      status: '',
      isValid: null,
      loading: false
    }
  },

  methods: {
    login() {
      this.isValid = null;
      this.loading = true;

      this.$auth.login({
        data: this.user,
        rememberMe: true,
        fetchUser: true,
        success (response) {
          this.isValid = true;
          this.loading = false;
        },
        error (err) {
          this.loading = false;
          this.status = '';
          // 401: Unauthorized
          try {
            if (err.hasOwnProperty('response') === true && err.response.hasOwnProperty('status')) {
              if (err.response.status === 401) {
                this.status = 'E-mail o contraseña incorrecta.';
                this.isValid = false
                return;
              }
            }
          } catch (err) {
            console.log(JSON.stringify(err));
          }

          this.status = 'Ha ocurrido un error al intentar ingresar a la plataforma.';
        }
      })
    }
  }
}
</script>

<style scoped>
.zero-margin {
  margin: 0px 0px 0px 0px;
}
</style>