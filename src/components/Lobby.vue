<template>
  <div class="container">
    <figure class="imageis-16by9">
      <img src="../assets/loggo.png" />
    </figure>
    <div class="nav buttons is-centered">
      <button class="yellow button" @click="openLevels()">Play</button>
        <Levels v-show="showLevelsPage"></Levels>
      <button class="purple button" @click="openRules()">Rules</button>
<<<<<<< HEAD
        <Rules v-show="showRules"></Rules>
      <button class="pink button">Highscores</button> <!-- router-link till high score-sida -->
    </div>
    <div class="icon">
      <font-awesome-icon icon="user-secret"></font-awesome-icon>
      <P>
        Login
      </P>
=======
        <Rules v-show="showRulesPage"></Rules>
      <router-link to="/highScore"> <button class="pink button">High score</button> </router-link> <!-- router-link till high score-sida -->
>>>>>>> eb83a3079fa4cb2094a3733beb59c76d8d7968d7
    </div>
  </div>
</template>

<script>
import Rules from './Rules.vue'
import Levels from './Levels.vue'
import HighScore from '../views/HighScore.vue'

export default {
    name: 'Lobby',
    data() {
      return {
        numbers: [],
        active: true
      }
    },
    components: {
      Rules,
      HighScore,
      Levels
    },
    computed: {
      showRulesPage() {
        return this.$store.state.showRules;
      },
      showLevelsPage() {
        return this.$store.state.showLevels;
      },
    },
    methods: {
      openRules: function() {
         this.$store.state.showRules = !this.$store.state.showRules
      },
      openLevels: function() {
         this.$store.state.showLevels = !this.$store.state.showLevels
      },
      close: function() {
        this.active = !this.active
        console.log("hi")
      }
    }
  }
</script>



<!-- STYLES GOES DOWN HERE -->
<style scoped>
.container {
  width: 95%;
  margin: auto;
}
h1 {
  margin-bottom: 30px;
  padding-top: 3%;
}
.nav {
  max-width: 300px;
  margin: auto;
}
.button {
  width: 200px;
  background-color: Black;
  color: White;
  border-width: 5px;
  margin-top: 10px;
  text-transform: uppercase;
}
.button:not(:last-child):not(.is-fullwidth) {margin-right: 0px;}
.pink {border-color: #ab0e86;}
.purple {border-color: #59057b;}
.yellow {border-color: #fae100;}
@media (min-width: 600px) {
  .button {
    width: 300px;
    font-size: 1.4em;
  }
}
@media (min-width: 992px) {
  .nav {
    max-width: 400px;
  }
  .button {
    width: 400px;
    font-size: 1.6em;
  }
}
</style>
