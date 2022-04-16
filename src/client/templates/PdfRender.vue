<template>
  <object id="pdf-viewer" :data="dataUrl" type="application/pdf"></object>
</template>
 
<script>
import * as Constants from '../services/Constants';

export default {
  data() {
    return {
      dataUrl: `${Constants.frontendUrl}/assets/sample.pdf`
    }
  }
}
</script>

<style scoped>
#pdf-container {
  width: 100%;
  height: 100%;
}

#pdf-viewer{
  width: 100%;
  height: 100%;
}

</style>