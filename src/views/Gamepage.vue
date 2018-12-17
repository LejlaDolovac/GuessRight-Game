<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Guessfunction/>
  </div>
</template>

<script>
// @ is an alias to /src
import Guessfunction from '@/components/Guessfunction.vue'

export default {
  name: 'home',
  components: {
    Guessfunction
  }
}
</script>
