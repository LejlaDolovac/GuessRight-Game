<template>
  <body>
    <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
  <div class="has-background-black">
    <h1>Highscore for Humans</h1>
  </div>
  <div class="container">
  <table class="table is-bordered is-striped is-narrow is-hoverable has-background-black has-text-primary">
    <thead style="background-color:#FAE100;">
      <th>Rank</th>
      <th>Name</th>
      <th>Date</th>
      <th>Score</th>
    </thead>
    <tr v-for="(score, index) in highscoreBS.slice().reverse()" :key="score.h">
      <td>{{ index+1 }}</td>
      <td>{{score.hName}}</td>
      <td>{{score.hDate}}</td>
      <td>{{score.hScore}}</td>
    </tr>
  </table>
</div>
  <router-link to="/"><button class="button is-primary">Back to start page</button></router-link>
  <div class="container">
    <div>
      <h1>Highscore for Botar</h1>
    </div>
  <table class="table is-bordered is-striped is-narrow is-hoverable">
    <thead style="background-color:#FAE100;">
      <th>Rank</th>
      <th>Bot</th>
      <th>Date</th>
      <th>Score</th>
    </thead>
    <tr v-for="(score, index) in highscoreBS.slice().reverse()" :key="score.h">
      <td>{{ index+1 }}</td>
      <td>{{score.bName}}</td>
      <td>{{score.bDate}}</td>
      <td>{{score.bScore}}</td>
    </tr>
  </table>
</div>
  <router-link to="/"><button class="button is-primary">Back to start page</button></router-link>
</body>
</template>

<script>
import {
  db
} from '../firebase-config'

export default {
  name: 'HighScoreFunction',
  data() {
    return {
      isClicked: false,
      highscoreDatas: [],
      hName: '',
      hDate: new Date(),
      hScore: '',
      hRank: 1,
      bScore: '',
      bName: '',
      bDate: new Date(),
      bRank: 1,
      easy: this.$store.state.easy,
      medium: this.$store.state.medium,
      hard: this.$store.state.hard,
    }
  },

  firebase: {
    highscoreBS: db.ref('highscoreData').orderByChild('hScore').limitToLast(10)
  },

  mounted() {
    if (this.$store.state.currentUser != null && this.$store.state.correctAnswers > 0) {
      this.addHighscorePlayer()

      if (this.$store.state.botWins > 0) {
        this.addHighscoreBot()
      }
    }
  },

  methods: {
    // stores the player scores
    addHighscorePlayer() {
      db.ref('highscoreData').push({
        hName: this.$store.state.currentUser,
        hDate: this.hDate.getFullYear() + "-" + (this.hDate.getMonth() + 1) + "-" + this.hDate.getDate(),
        hScore: this.$store.state.correctAnswers
      });
    },
    // stores the bot scores
    addHighscoreBot() {
      if (this.$store.state.easy == true) {
        bName: "Wall-E"
      }
      else if (this.$store.state.medium == true) {
        bName: "R2D2"
      }
      else if (this.$store.state.hard == true) {
        bName: "Terminator"
      }

      db.ref('botHighscoreData').push({
        bName: bName,
        bDate: this.hDate.getFullYear() + "-" + (this.hDate.getMonth() + 1) + "-" + this.hDate.getDate(),
        bScore: this.$store.state.botWins
      });
    }

    },
  // starts the confetti
  mounted() {
	    this.$confetti.start()
    }
  }


</script>

<style scoped>
.container {
  width: 75%;
  background-color: red; /* For browsers that do not support gradients */
  background-image: linear-gradient(to right, #FF03A4 , #FF407E , #FF755F, #FFA64C, #FFD150, #F9F871); /* Standard syntax (must be last) */
}
h1 {
  font-size: 300%;
  font-family: 'Black Ops One', cursive;
  text-transform: uppercase;
  font-family: 'Black Ops One'; /*Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif*/
  background: -webkit-linear-gradient(#FF03A4,#F9F871);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

th {
  font-family: 'Black Ops One', cursive;
  color: black;
}

table {
  margin-left: auto;
  margin-right: auto;
}

input {
  width: 20%;
}
</style>
