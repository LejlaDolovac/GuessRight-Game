<template>
  <body>
    <div class="container">
  <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
  <div class="columns">
    <div class="column">
    <h1 class="is-size-1-desktop is-size-2-tablet is-size-2-mobile has-background-black">Highscore for <br> Humans</h1>
      <div class="gradient">
        <div>
        <table class="table is-bordered is-striped is-narrow is-hoverable has-background-black has-text-white">
          <thead class="has-text-white" style="background-color:#FAE100;">
            <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Date</th>
            <th>Score</th>
            </tr>
          </thead>
          <tr v-for="(score, index) in highscoreBS.slice().reverse()" :key="score.h">
            <td>{{ index+1 }}</td>
            <td>{{score.hName}}</td>
            <td>{{score.hDate}}</td>
            <td>{{score.hScore}}</td>
          </tr>
        </table>
      </div>
      </div>
    </div>

    <div class="column">
      <h1 class="is-size-1-desktop is-size-2-tablet is-size-2-mobile has-background-black has-text-success">Highscore for <br> Bots</h1>
      <div class="gradient">
      <table class="table is-bordered is-striped is-narrow is-hoverable has-background-black has-text-primary">
        <thead class="has-text-white" style="background-color:#FAE100;">
          <th>Rank</th>
          <th>Bot Name</th>
          <th>Date</th>
          <th>Score</th>
        </thead>
        <tbody v-for="(score, index) in highscoreBDS.slice().reverse()" :key="score.h" class="has-text-white">
          <tr>
          <td>{{ index+1 }}</td>
          <td>{{score.bName}}</td>
          <td>{{score.bDate}}</td>
          <td>{{score.bScore}}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    
  </div>
  <router-link to="/">
    <button class="button is-primary" style="margin: 20px;">Back to start page</button>
  </router-link>
</div>
</body>
</template>

<script>
import {  db  } from '../firebase-config'

export default {
  name: 'HighScoreFunction',
  data() {
    return {
      highscoreDatas: [],
      hName:'',
      hDate: new Date(),
      hScore:'',
      hRank: 1,
      botHighscoreDatas: [],
      bScore:'',
      bDate: new Date(),
      bRank: 1,
      bName:'',
      saveBot: '',

    }
  },

  firebase: {
    // gets the highscore from the database
    highscoreBS: db.ref('highscoreData').orderByChild('hScore').limitToLast(10),
    highscoreBDS: db.ref('botHighscoreData').orderByChild('bScore').limitToLast(10)
  },

  mounted() {
    if (this.$store.state.currentUser != null && this.$store.state.correctAnswers > 0) {
      this.addHighscorePlayer()

      if (this.$store.state.botWins > 0) {
        this.addHighscoreBot()
      }
    }
     // starts the confetti
      this.$confetti.start()
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

      db.ref('botHighscoreData').push({
        bName: this.$store.state.botName,
        bDate: this.hDate.getFullYear() + "-" + (this.hDate.getMonth() + 1) + "-" + this.hDate.getDate(),
        bScore: this.$store.state.botWins
      });
    }
    }
  }


</script>

<style scoped>
.container {
  width: auto;
  height: auto;
}
.gradient {
  margin: 20px;
  padding: 10px;
  justify-content: space-around;
  width: auto;
  height: auto;
  background-color: red; /* For browsers that do not support gradients */
  background-image: linear-gradient(to right, #FF03A4 , #FF407E , #FF755F, #FFA64C, #FFD150, #F9F871); /* Standard syntax (must be last) */
}
h1 {
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
  width: 99%;
    margin-right: .5%;
    margin-left: .5%;
  height: 99%;
    margin-bottom: .5%;
    margin-top: .5%;
}

input {
  width: 20%;
}
.column {
  margin-top: 10px;
  justify-content: center;
}
</style>
