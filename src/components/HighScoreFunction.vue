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
    <tr v-for="score in highscoreBS" :key="score.h">
      <td>{{score.hRank}}</td>
      <td>{{score.hName}}</td>
      <td>{{score.hDate}}</td>
      <td>{{score.hScore}}</td>
    </tr>
  </table>

  <input v-model="hName" placeholder="name" class="input" required type="text" >
  <br><button @click="addHighscorePlayer(hName)" class="button">Add New score</button>


  <br><br>
  <form @submit="addHighscore(hRank, hName, hDate, hScore)">
    <h2>Add a New Highscore</h2>
    <input v-model="hRank" placeholder="rank" class="input" required>
    <br><input v-model="hName" placeholder="name" class="input" required>
    <br><input v-model="hDate" placeholder="date" class="input" required>
    <br><input v-model="hScore" placeholder="score" class="input" required>
    <br><button type="submit" class="button">Add New score</button>
  </form>


  <!--
  <v-show="" form id="form" @submit="addHighscorePlayer">
    <input type="text" v-model="newHighscore.name" placeholder="Write your name here">
    <input type="submit" value="add to highscore">
-->
<br><br>
  <router-link to="/"><button class="button is-primary">Back to start page</button></router-link>
</div>
</template>

<script>
import {  db} from '../firebase-config'

export default {
  name: 'HighScoreFunction',
  data() {
    return {
      highscoreDatas: [],
      hName: '',
      hDate: '',
      hScore: '',
      hRank:''
    }
  },

  firebase: {
    highscoreBS: db.ref('highscoreData')
  },

  methods: {
    addHighscore(hName, hDate, hScore) {
      db.ref('highscoreData').push({
        hName: hName,
        hDate: hDate,
        hScore: hScore
      });
    }
    /*
    ,
    addHighscorePlayer(hName) {
    addDate(){getFullYear() + "-" + getMonth() + "-" + getDate()}
    addScore(){this.$store.correctAnswers}
    addHighscore(hName, hDate, hScore)
   }
  */
  }
}
/*
    if (this.$store.correctAnswers == hScore) {
      if (loggedIn: false) {        //show form      }
      if (this.$store.loggedIn: true) {
        //exportera var user från login  Google/facebook      }
    },
    if (this.$store.botWins == ) { //addHighscoreBot()
    }
*/
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
