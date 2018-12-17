<template>
  <div>
    <button @click="close">test</button>
    <div id="rules" v-if="showRules">
       <div class="modal-background"></div>
        <div class="modal-content is-fluid-mobile is-size-5 has-background-black has-text-white">
          <h1 class="title is-2">Game Rules</h1>
            <ul>
              <li>It is a turned based game.</li>
              <li>The Player starts to guess a number between 1-10.</li>
              <li>The turn then goes to the next AI-bots. First to guess the right number scores a point.</li>
              <li>A game where the player guesses a number and competes against AI.</li>
              <li>First to guess the right number gets one point. Get as many points as you can within the countdown.</li>
              <li>Compete for the #1 rank at the highscore board.</li>
            </ul>
          <br>

          <button class="button is-medium is-dark" @click="close">Oki-doki!</button>
        </div>
    </div>
  </div>
</template>


<script>
export default {
    name: 'rules',
    data() {
        return {
            showRules: false
        }
    },
    methods: {
        close() {
            this.showRules = !this.showRules
        }
    }
}
</script>


<style scoped>
h1 {
    color: purple;
}
.modal-content {
    padding: 45px;
    margin-top: -5%;
}
.button:hover {
    background-color: limegreen;
}
li {
    margin: 1.5%;
}

</style>
