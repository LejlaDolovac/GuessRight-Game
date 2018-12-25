<template>
  <div class="about">
    <HighScoreFunction/>
  </div>
</template>

<script>
// @ is an alias to /src
import HighScoreFunction from '@/components/HighScoreFunction.vue'

export default {
  name: 'highScore',
  components: {
    HighScoreFunction
  }
  
}
</script>
