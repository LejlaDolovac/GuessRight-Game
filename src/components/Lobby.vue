<template>
  <div class="container">

    <!-- fontawesome-->
    <div class="navbar has-text-white has-background-black">
      <div class="fontawesome-container">
        <span class="is-size-5">Login with:</span>
        <br>
        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="fontawesome"/> Facebook <br>
        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }" class="fontawesome" @click="googleLogin"/> Google
      </div>
    </div>

        <div class="nav buttons is-centered">
          <figure class="image">
            <img src="../assets/loggo.png" />
          </figure>
          <button class="yellow button" @click="openLevels()">Play</button>
            <Levels v-show="showLevelsPage"></Levels>
          <button class="purple button" @click="openRules()">Rules</button>
            <Rules v-show="showRulesPage"></Rules>
          <router-link to="/highScore"> <button class="pink button">High score</button> </router-link> <!-- router-link till high score-sida -->
        </div>
      </div>
    </template>

  <script>
  import Rules from './Rules.vue'
  import Levels from './Levels.vue'
  import HighScore from '../views/HighScore.vue'
  import {db} from '../firebase-config'
  import {fb} from '../firebase-config'

  export default {
    name: 'Lobby',
    data() {
      return {
        numbers: [],
        active: true,
      }
    },
    firebase: {
      // messages: db.ref('message')
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
      },
      googleLogin() {
        const provider = new fb.auth.GoogleAuthProvider();
        fb.auth().signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        })
       },
    }
  }
  </script>

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
  .fontawesome-container {
  position: absolute;
  right: 0;
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
