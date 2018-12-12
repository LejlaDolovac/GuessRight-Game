<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
      <Lobby/>
      <Guessfunction/>
  </div>
</template>

<script>
// @ is an alias to /src
import Guessfunction from '@/components/Guessfunction.vue'
import Lobby from '@/components/Lobby.vue'

export default {
  name: 'home',
  components: {
    Guessfunction,
    Lobby
  }
}
</script>

<style scoop>


</style>
