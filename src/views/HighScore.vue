<template>
  <div class="highscore">
    <HighScoreFunction/>
  </div>
</template>

<script>
import {db} from '../firebase-config'
import HighScoreFunction from '@/components/HighScoreFunction.vue'

export default {
  name: 'highscore',

  components: {
    HighScoreFunction
  },
}
</script>

<style scoped>
</style>
