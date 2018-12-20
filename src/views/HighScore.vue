<template>
<div class="highscore">
  <Highscorefunction/>

  <router-link to="/"><button class="button is-black">Back to start page</button></router-link>
</div>
</template>

<script>

import HighScoreFunction from '@/components/HighScoreFunction.vue'

export default {
    name: 'HighScoreFunction'

  }


</script>
