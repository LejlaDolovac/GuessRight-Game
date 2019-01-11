<template>
  <div>
    <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
    <div class="modal is-active" v-show="showRulesPage">
      <div class="modal-background"></div>
      <div class="container">
      <div class="modal-content is-size-5 has-background-black has-text-white">
        <h1 class="title is-size-1 heading">Game Rules</h1>
          <ul class="is-size-6">
            <li>This is a turned based game, Player vs AI.</li>
            <li>The Player selects a Level: <br/>
            <span class="has-text-dark is-size-4">Easy 1-10</span> or<span class="has-text-success is-size-4"> Medium 1-30</span> or <span class="has-text-light is-size-4">Hard 1-50</span></li>
            <li>A countdown starts the game Ready, Set, Go!</li>
            <li>The Player starts to type in any number between <br> the interval of numbers for the chosen level.</li>
            <li>The turn then goes to the next AI-bot. <br> First to guess the right number scores a point.</li>
            <li>Beat the BOT in best of 5 turns to earn your name on the scoreboard!</li>
            <li>First to guess the right number gets one point. <br> Get as many points as you can within the countdown.</li>
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
      // closes the rules page
      close() {
        this.$store.state.showRules = !this.$store.state.showRules
      }
    },
    computed: {
      // shows the rules page
      showRulesPage() {
        return this.$store.state.showRules;
      }
    },
}
</script>

<style scoped>
  .modal-content {
      padding: 3%;
      margin: 3px;
  }
  ul {
    list-style-type: disc;
    text-align: left;
    margin-left: 12%;
  }
  li {
      margin: 1.5%;
  }
  .container {
    width: auto;
    height: auto;
    overflow-y: scroll;
    background-color: red; /* For browsers that do not support gradients */
    background-image: linear-gradient(to right, #FF03A4 , #FF407E , #FF755F, #FFA64C, #FFD150, #F9F871); /* Standard syntax (must be last) */
  }
  .heading {
    text-transform: uppercase;
    font-family: 'Black Ops One', cursive;
    background: -webkit-linear-gradient(#FF03A4,#F9F871);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media only screen and (max-width: 768px) {
    .modal-content {
      width: 100%;
      margin-left: 3px;
      padding-top: 5%;
      max-height: 768px;
    }
    .container {
      background-image: none;
      background-color: black;
      width: 100%;
      height: 100%;
    }
  }
</style>
