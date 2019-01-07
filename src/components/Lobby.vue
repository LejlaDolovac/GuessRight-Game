<template>
<div class="container">
  <Login></Login>
      <div class="nav buttons is-centered">
        <figure class="image">
          <img src="../assets/loggo.png" alt="Guess the Number — a turn based game" title="Guess the Number — a turn based game"/>
        </figure>
        <a class="yellow button" tabindex="0" @keyup.enter="openLevels" @click="openLevels()">Play</a>
          <Levels v-show="showLevelsPage"></Levels>
        <a class="purple button" tabindex="0" @keyup.enter="openRules" @click="openRules()">Rules</a>
          <Rules v-show="showRulesPage"></Rules>
        <router-link to="/highScore" tabindex="-1"><a @keyup.enter="openHighScore" tabindex="0" class="pink button">Highscore</a></router-link>
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
        showRules: true // något med detta för att visa regler
      }
    },
    firebase: {
      // messages: db.ref('message')
    },
    components: {
      Rules,
      Levels,
      Login
    },
    computed: {
      // om regelrutan ska visas
      showRulesPage() {
        return this.$store.state.showRules;
      },
      // om nivårutan ska visas
      showLevelsPage() {
        return this.$store.state.showLevels;
      },
    },
    methods: {
      // öppnar regelrutan
      openRules: function() {
        this.$store.state.showRules = !this.$store.state.showRules
      },
      // öppnar nivårutan
      openLevels: function() {
        this.$store.state.showLevels = !this.$store.state.showLevels
      },
      openHighScore() {
        this.$router.push('/highScore')
      },
      close: function() {
        this.active = !this.active
        console.log("hi")
      },
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
  }
  .button:not(:last-child):not(.is-fullwidth) {margin-right: 0px;}
  .pink {border-color: #ab0e86;}
  .purple {border-color: #59057b;}
  .yellow {border-color: #fae100;}
  
  @media (min-width: 992px) {
    .button {
      font-size: 1.6em;
      background-color: Black;
      color: White;
      border-width: 5px;
      margin-top: 10px;
      text-transform: uppercase;
    }
  }
  @media (max-width: 600px) {
    .button {
      width: 300px;
      font-size: 1.4em;
    }
    .nav {
      max-width: 300px;
    }
  }
  </style>
