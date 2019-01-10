<template>
  <div class="highscore">
    <HighScoreFunction></HighScoreFunction>
  </div>
</template>

<script>
import HighScoreFunction from '@/components/HighScoreFunction.vue'

export default {
  name: 'highscore',

  components: {
    HighScoreFunction
  },
}
</script>
