<template>
  <div class="about">
    <h1>Welcome</h1>
    <Guessfunction/>
  </div>
</template>

<script>
// @ is an alias to /src
import Guessfunction from '@/components/Guessfunction.vue'

export default {
  name: 'gamepage',
  components: {
    Guessfunction
  }
}
</script>
