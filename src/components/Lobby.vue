<template>
  <div class="container">
    <h1>Guess Right</h1>
    <div class="nav">
      <router-link to="/gamepage"><button>Start game</button></router-link>
      <button @click="openRules()">Rules</button>
      <button>High score</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Lobby',
    data() {
      return {
        numbers: []
      }
    },
    computed: {
    },
    methods: {
      openRules: function() {
        alert("HON HETER ANNA. ANNA HETER HON.")
        // öppna regelmodulen
      }
    }
  }
</script>

<style scoped>

.container {
  width: 90%;
  margin: auto;
  margin-top: 60px;
}

.nav {
  max-width: 300px;
  margin: auto;
}

button {
  width: 200px;
  display: inline-block;
  clear: left;
  background-color: LightSteelBlue;
  color: White;
  border: none;
  padding: 15px;
  margin-top: 25px;
  cursor: pointer;
  font-size: 1.2em;
}

@media (min-width: 600px) {
  h1 {
    font-size: 2.2em;
  }
  button {
    width: 300px;
    font-size: 1.4em;
  }
}

@media (min-width: 992px) {
  h1 {
    font-size: 3em;
  }
  .nav {
    max-width: 400px;
  }
  button {
    width: 400px;
    font-size: 1.6em;
  }
}


</style>
