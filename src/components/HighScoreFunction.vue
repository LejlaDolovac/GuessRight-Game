<template>
<div class="container">
  <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
  <h1>Highscore for Humans</h1>
  <table class="table is-bordered is-striped is-narrow is-hoverable">
    <thead style="background-color:#FAE100;">
      <th>Rank</th>
      <th>Name</th>
      <th>Score</th>
      <th>Date</th>
    </thead>
    <tr v-for="score in highscoreBS" :key="score.hRank">
      <td>{{score.hRank}}</td>
      <td>{{score.hName}}</td>
      <td>{{score.hDate}}</td>
      <td>{{score.hScore}}</td>
    </tr>
  </table>

  <form @submit="addHighscore(hRank, hName, hDate, hScore)">
    <h2>Add a New Highscore</h2>
    <input v-model="hRank" placeholder="rank" class="input" required>
    <input v-model="hName" placeholder="name" class="input" required>
    <input v-model="hDate" placeholder="date" class="input" required>
    <input v-model="hScore" placeholder="score" class="input" required>
    <button type="submit" class="button">Add New score</button>
  </form>

  <!--
  <h1>Highscore for Robots</h1>
  <table class="table is-bordered is-striped is-narrow is-hoverable">
    <thead style="background-color:#FAE100;">
      <th>Rank</th>
      <th>Name</th>
      <th>Score</th>
      <th>Date</th>
    </thead>
    <tr v-for="highscoreBot in highscoreBots" :key="highscoreBot['.key']">
      <td>{{highscoreBot.rank}}</td>
      <td>{{highscoreBot.name}}</td>
      <td>{{highscoreBot.date}}</td>
      <td>{{highscoreBot.score}}</td>
    </tr>
  </table>
  <br>

  <v-show="" form id="form" @submit="addHighscorePlayer">
    <input type="text" v-model="newHighscore.name" placeholder="Write your name here">
    <input type="submit" value="add to highscore">
-->
  <router-link to="/"><button class="button is-primary">Back to start page</button></router-link>
</div>
</template>

<script>
import {  fb,  db } from '../firebase-config'

export default {
  name: 'HighScoreFunction',
  data() {
    return {
      highscoreDatas: [],
      hRank: '',
      hName: '',
      hDate: '',
      hScore: ''
    }
  },

firebase: {
  highscoreBS: db.ref('highscoreData')
},
  methods: {

    addHighscore (hRank, hName, hDate, hScore) {
      db.ref('highscoreData').push({
        hRank:hRank,
        hName:hName,
        hDate:hDate,
        hScore:hScore
      });


    }
  }

}

  /*
      const createdate = new Date()
      //getFullYear() + "-" + getMonth() + "-" + getDate()

    if (this.$store.correctAnswers == hScore) {
      if (loggedIn: false) {        //show form      }
      if (this.$store.loggedIn: true) {
        //exportera var user från login  Google/facebook      }
    },
    if (this.$store.botWins == ) { //addHighscoreBot()
    },
    addHighscorePlayer: function() { //Function add data to hihgscoredatabas
      highscoreData.push(this.highscoreData);
      this.highscoreData.rank = '';
      this.highscoreData.name = '';
      this.highscoreData.date = '';
      this.highscoreData.score = '';
      //rank name date score
      //v-if newHighscore class="is-selected"
    },
*/
</script>

<style scoped>
h1 {
  font-size: 4em;
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
</style>
