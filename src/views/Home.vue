<template>
  <div class="home">
    <Guessfunction/>
    <Countdown/>
  </div>
</template>

<script>
// @ is an alias to /src
import Guessfunction from '@/components/Guessfunction.vue'
import Countdown from '@/components/Countdown.vue'

export default {
  name: 'home',
  components: {
    Guessfunction,
    Countdown
  }
}
</script>
