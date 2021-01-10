<template>
  <b-container>
    <b-row class="text-center" align-v="center">
      <b-col>
        <b-carousel
          id="carousel-header"
          background="#ababab"
          img-width="1024"
          img-height="480"
          class="text-carousel"
        >
          <b-carousel-slide :img-src="headerImage">
            <h1>¡Gracias por participar!</h1>
          </b-carousel-slide>
        </b-carousel>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HeaderImage from '../assets/image05.jpg';

export default {
  name: 'end',

  data() {
    return {
      headerImage: HeaderImage
    }
  },

  mounted() {
    //this.$store.commit({ type: 'eraseAll' })
  }
}
</script>

<style scoped>
.text-carousel {
  text-shadow: 3px 3px 3px #000;
}
</style>