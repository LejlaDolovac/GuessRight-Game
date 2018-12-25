<template>
<div class="container">
  <!--

    <div class="navbar has-text-white has-background-black">
      <div class="fontawesome-container">
        <span class="is-size-5">Login with:</span>
        <br>
        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="fontawesome"/> Facebook <br>
        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }" class="fontawesome" @click="googleLogin"/> Google
      </div>
    </div> -->
  <Login></Login>
      <div class="nav buttons is-centered">
        <figure class="image">
          <img src="../assets/loggo.png" />
        </figure>
        <a class="yellow button" @click="openLevels()">Play</a>
          <Levels v-show="showLevelsPage"></Levels>
        <a class="purple button" @click="openRules()">Rules</a>
          <Rules v-show="showRulesPage"></Rules>
        <router-link to="/highScore"><a class="pink button">High score</a></router-link>
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
      HighScore,
      Levels,
      Login
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
      },
    }
  }
  </script>

<style scoped>
.container {
  width: 95%;
  margin: auto;
  margin-top: 60px;
}
h1 {
  margin-bottom: 30px;
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
  padding: 20px;
  margin-top: 10px;
  text-transform: uppercase;
}
.buttons .button:not(:last-child):not(.is-fullwidth) {margin-right: 0px;}

.pink {border-color: #ab0e86;}
.purple {border-color: #59057b;}
.yellow {border-color: #fae100;}

@media (min-width: 600px) {
  .nav {
    max-width: 400px;
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
    font-size: 1.4em;
    border-width: 5px;
    margin-top: 10px;
    text-transform: uppercase;
  }
  .fontawesome-container {
    position: absolute;
    right: 0;
  }
}

  @media (min-width: 992px) {
    .nav {
      max-width: 400px;
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
  }
  </style>
