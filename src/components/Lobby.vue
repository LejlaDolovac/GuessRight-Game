<template>
<div class="container">
  <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
  <Login></Login>
      <div class="nav is-centered">
        <figure class="image">
          <img src="../assets/loggo.png" alt="Guess the Number — a turn based game" title="Guess the Number — a turn based game"/>
        </figure>

        <a class="yellow button" tabindex="0" @click="openLevels()">Play</a>
          <Levels v-show="showLevelsPage"></Levels>
        <a class="orange button" tabindex="0" @keyup.enter="openRules" @click="openRules()">Rules</a>
          <Rules v-show="showRulesPage"></Rules>
        <router-link to="/highScore" tabindex="-1">
          <a @keyup.enter="openHighScore" tabindex="0" class="pink button">Highscore</a>
        </router-link>
      </div>
    </div>
  </template>

  <script>
  import Rules from './Rules.vue'
  import Levels from './Levels.vue'
  import HighScore from '../views/HighScore.vue'
  import {db} from '../firebase-config'
  import {fb} from '../firebase-config'
  import Login from './Login.vue'
  export default {
    name: 'Lobby',
    data() {
      return {
        numbers: [],
        active: true,
        showRules: true, // shows the rules page
        correctAnswers: 0, // reset player score
        botWins: 0          //reset bot score
      }
    },
    firebase: {
      // messages: db.ref('message')
    },
    components: {
      Rules,
      Levels,
      Login,
    },
    computed: {
      // if the rules page should be shown
      showRulesPage() {
        return this.$store.state.showRules;
      },
      // if the levels page should be shown
      showLevelsPage() {
        return this.$store.state.showLevels;
      },
    },
    methods: {
      // opens the rule page
      openRules: function() {
        this.$store.state.showRules = !this.$store.state.showRules
      },
      // opens the levels page
      openLevels: function() {
        this.$store.state.showLevels = !this.$store.state.showLevels
      },
      // opens the highscore page
      openHighScore() {
        this.$router.push('/highScore')
      },
      close: function() {
        this.active = !this.active
      },
    },
    mounted() {
      // stops the confetti from the highscore page
      this.$confetti.stop()
      // stops every interval just in case
      clearInterval(this.$store.state.numberInterval)
      clearInterval(this.$store.state.timerInterval)
      clearInterval(this.$store.state.countdownInterval)
      clearInterval(this.$store.state.timerBotInterval)
      clearInterval(this.$store.state.focusInterval)
    }
  }
  </script>

 <style scoped>
  .container {
    width: 100%;
    max-width: 1280px;
    margin: auto;
  }
  a:focus {
    background: lightgrey;
    border: thin solid black;
  }
  h1 {
    margin-bottom: 30px;
    padding-top: 3%;
  }
  .nav {
    max-width: 400px;
    margin: auto;
  }
  .button {
    width: 400px;
    background-color: Black;
    color: White;
    font-size: 1.4em;
    border-width: 5px;
    margin-top: 10px;
    text-transform: uppercase;
    font-family:  'Black Ops One', cursive;
  }
  .button:not(:last-child):not(.is-fullwidth) {margin-right: 0px;}
  .pink {border-color: #FF03A4;}
  .orange {border-color: #FF755F;}
  .yellow {border-color: #FFD150;}
  
  @media (max-width: 600px) {
    .button {
      width: 100%;
      font-size: 1.4em;
    }
    .nav {
      width: 75%;
    }
  }
  </style>
