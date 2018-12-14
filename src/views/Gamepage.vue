<template>
  <div class="about">
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
