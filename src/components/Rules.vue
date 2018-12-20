<template>
  <div>
      <div class="modal is-three-quarters-mobile is-active" v-show="showRules">
       <div class="modal-background"></div>
        <div class="modal-content is-size-5 has-background-black has-text-white">
          <h1 class="title is-2 has-text-warning">Game Rules</h1>
            <ul>
              <li>It is a turned based game.</li>
              <li>The Player starts to guess a number between 1-10.</li>
              <li>The turn then goes to the next AI-bots. First to guess the right number scores a point.</li>
              <li>A game where the player guesses a number and competes against AI.</li>
              <li>First to guess the right number gets one point. Get as many points as you can within the countdown.</li>
              <li>Compete for the #1 rank at the highscore board.</li>
            </ul>
          <br>
          <button class="button is-medium is-primary" @click="close">Oki-doki!</button>
        </div>
      </div>
  </div>
</template>


<script>
export default {
    name: 'rules',
    methods: {
      close() {
        this.$store.state.show = !this.$store.state.show 
      }
    },
    computed: {
      showRules() {
        return this.$store.state.show;
      }
    },
}
</script>

<style scoped>
.modal-content {
    padding: 3%;
    overflow-x: hidden;
}
li {
    margin: 1.5%;
}

</style>
