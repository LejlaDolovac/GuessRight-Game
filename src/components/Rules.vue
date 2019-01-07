<template>
  <div>
      <div class="modal is-three-quarters-mobile is-active" v-show="showRulesPage">
       <div class="modal-background"></div>
       <div class="container">
        <div class="modal-content is-size-5 has-background-black has-text-white">
          <h1 class="title is-2 has-text-warning">Game Rules</h1>
            <ul>
              <li>This is a turned based game, Player vs AI.</li>
              <!-- <li>A game where the player guesses a number and competes against AI.</li> -->
              <li>The Player selects a Level:</li>
              <li><span class="has-text-dark is-size-4">Easy 1-10</span> or<span class="has-text-success is-size-4"> Medium 1-30</span> or <span class="has-text-light is-size-4">Hard 1-50</span></li>
              <li>A countdown starts the game Ready,Set,Go!</li>
              <li>The Player starts to type in any number between the interval of numbers for the chosen level.</li>
              <li>The turn then goes to the next AI-bot. First to guess the right number scores a point.</li>
              <li>Beat the BOT in best of 5 turns to earn your name on the scoreboard!</li>
              <li>First to guess the right number gets one point. Get as many points as you can within the countdown.</li>
              <li>Compete for the #1 rank at the highscore board against other players.</li>
            </ul>
          <br>
          <button class="button is-medium is-primary" @click="close">Oki-doki!</button>
        </div>
      </div>
      </div>
  </div>
</template>


<script>
export default {
    name: 'rules',
    methods: {
      // stänger regelsidan
      close() {
        this.$store.state.showRules = !this.$store.state.showRules
      }
    },
    computed: {
      // öppnar regelsidan
      showRulesPage() {
        return this.$store.state.showRules;
      }
    },
}
</script>

<style scoped>
.modal-content {
    padding: 3%;
    overflow-x: hidden;
    margin: 3px;
}
h1 {
  text-decoration: underline;
  /* line-height: 2px; */
}
li {
    margin: 1.5%;
}
.container {
  width: auto;
  height: auto;
  background-color: red; /* For browsers that do not support gradients */
  background-image: linear-gradient(to right, #FF03A4 , #FF407E , #FF755F, #FFA64C, #FFD150, #F9F871); /* Standard syntax (must be last) */
}
</style>
