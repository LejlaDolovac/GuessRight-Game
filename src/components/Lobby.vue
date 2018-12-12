<template>
  <div class="container">
    <h2>Welcome to Guess Right</h2>
    <p>{{ rules }} <br> {{ rules }} <br> {{ rules }}</p>
    <div class="difficulty">
      <button @click="easyNumbers()">Easy</button>
      <button @click="mediumNumbers()">Medium</button>
      <button @click="hardNumbers()">Hard</button>
    </div>
    <button id="start-game">Starta spelet</button>
  </div>
</template>

<script>
export default {
    name: 'Lobby',
    data() {
      return {
        numbers: [],
        rules: "This is how you play the game. Lorem ipsum dolor sit amet."
      }
    },
    computed: {
    },
    methods: {
      easyNumbers: function() {
        this.numbers = [];
        for(var i = 1; i <= 10; i++) {
          this.numbers.push(i);
        }
        console.log(this.numbers)
      },
      mediumNumbers: function() {
        this.numbers = [];
        for(var i = 1; i <= 50; i++) {
          this.numbers.push(i);
        }
        console.log(this.numbers)
      },
      hardNumbers: function() {
        this.numbers = [];
        for(var i = 1; i <= 100; i++) {
          this.numbers.push(i);
        }
        console.log(this.numbers)
      }
    }
}
</script>

<style scoped>

.difficulty {
}

.container button {
  width: 150px;
  background-color: #42b883;
  color: White;
  border: none;
  padding: 10px;
  margin: 1px;
  cursor: pointer
}

#start-game {
  width: 200px;
  margin-top: 20px;
  font-size: 1.5em;
}

</style>
