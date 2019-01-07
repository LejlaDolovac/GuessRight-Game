<template>
  <div class="about">
    <HighScoreFunction/>
  </div>
</template>

<script>
import {db} from '../firebase-config'
import HighScoreFunction from '@/components/HighScoreFunction.vue'

export default {
  name: 'highscore',
  firebase: {
    numbers: db.ref('numbers')
  },
  components: {
    HighScoreFunction
  }
}
</script>


<style scoped>
h1 {
  font-size: 4em;
  font-family: 'Black Ops One', cursive;
  color: black;
}

.highscore {
  background-image: linear-gradient(to bottom right, yellow, #e01171, #ab0e86, #59057b, #0f0766);
  height: 1000px;
}
