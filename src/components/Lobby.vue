<template>
  <div class="container">
    <div class="header is-centered">
      <h1 class="title is-size-3-mobile is-size-1-tablet">Guess Right</h1>
    </div>
    <div class="nav buttons is-centered">
      <router-link to="/gamepage"><button class="yellow button">Play</button></router-link>
      <button class="purple button" @click="openRules()">Rules</button>
      <button class="pink button">High score</button> <!-- router-link till high score-sida -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'Lobby',
    data() {
      return {
        numbers: [],
        active: true
      }
    },
    computed: {
    },
    methods: {
      openRules: function() {
        alert("HON HETER ANNA. ANNA HETER HON.")
        // öppna regelmodulen
      },
      close: function() {
        this.active = !this.active
        console.log("hi")
      }
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
