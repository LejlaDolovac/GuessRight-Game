<template>
  <transition name="rules">
    <div id="rules" v-show="!showRules">
       <div class="modal-background"></div>
        <div class="modal-content">
          <h1 class="title is-2">RULES</h1>
            <ul>
              <li>It is a turned based game.</li>
              <li>The Player starts to guess a number between 1-10.</li>
              <li>The turn then goes to the next AI-bots. First to guess the right number scores a point.</li>
              <li>A game where the player guesses a number and competes against AI.</li>
              <li>First to guess the right number gets one point. Get as many points as you can within the countdown.</li>
              <li>Compete for the #1 rank at the highscore board.</li>
            </ul>
          <button class="button is-medium is-dark" @click="close">Oki-doki!</button>
        </div>
    </div>
  </transition>
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
.modal-content {
    background-color: linen;
    padding: 2%;
}
.container {
    width: 80%;
    padding: 2%;
    background-color: linen;
}
.button:hover {
    background-color: limegreen;
}
ul {
    list-style-type: none;
}
li {
    margin: 2%;
}

</style>
