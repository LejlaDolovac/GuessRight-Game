<template>
<div class="container">
  <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
  <h1>Highscore for Humans</h1>
  <table class="table is-bordered is-striped is-narrow is-hoverable">
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
  <router-link to="/"><button class="button is-primary">Back to start page</button></router-link>
  <h1>Highscore for Botar</h1>
  <table class="table is-bordered is-striped is-narrow is-hoverable">
    <thead style="background-color:#FAE100;">
      <th>Rank</th>
      <th>Bot</th>
      <th>Date</th>
      <th>Score</th>
    </thead>
    <tr v-for="(score, index) in highscoreBDS.slice().reverse()" :key="score.h">
      <td>{{ index+1 }}</td>
      <td>{{score.bName}}</td>
      <td>{{score.bDate}}</td>
      <td>{{score.bScore}}</td>
    </tr>
  </table>
  <router-link to="/"><button class="button is-primary">Back to start page</button></router-link>
</div>
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
      botHighscoreData: [],
      bScore:'',
      bDate: new Date(),
      bRank: 1,
      bName:''
    }
  },

  firebase: {
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

    },

  }

</script>

<style scoped>
h1 {
  font-size: 300%;
  font-family: 'Black Ops One', cursive;
  color: white;
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
