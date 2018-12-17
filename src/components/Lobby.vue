<template>
  <div class="container">
    <div class="header is-centered">
      <h1 class="title is-size-3-mobile is-size-1-tablet">Guess Right</h1>
    </div>
    <div class="nav buttons is-centered">
      <router-link to="/gamepage"><button class="yellow button">Play</button></router-link>
      <button class="purple button" @click="openRules()">Rules</button>
      <router-link to="/highscore"><button class="pink button">High score</button></router-link>
      <Rules />
    </div>
  </div>
</template>

<script>
import Rules from '@/components/Rules.vue'

export default {
    name: 'Lobby',
    components: {
      Rules
    },
    data() {
      return {
        showRules: true // något med detta för att visa regler
      }
    },
    computed: {
    },
    methods: {
      openRules: function() {
        alert("HON HETER ANNA. ANNA HETER HON.")
        this.showRules = !this.showRules
        // öppna regelmodulen
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
  .nav {
    max-width: 400px;
  }
  .button {
    width: 400px;
    padding: 25px;
    margin-top: 15px;
    font-size: 1.4em;
  }
}
@media (min-width: 992px) {
  .nav {
    max-width: 450px;
  }
  .button {
    width: 450px;
    padding: 30px;
    font-size: 1.6em;
  }
}
</style>
