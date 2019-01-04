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

    <tr v-for="score in highscoreBS" :key="score.h">
      <td>{{score.hRank}}</td>
      <td>{{score.hName}}</td>
      <td>{{score.hDate}}</td>
      <td>{{score.hScore}}</td>
    </tr>
  </table>

  <br><button v-show="isClicked = !isClicked" @click="addHighscorePlayer(), isClicked=true" class="button">Add New score</button>
  <br><br>
  <router-link to="/"><button class="button is-primary">Back to start page</button></router-link>
</div>
</template>

<script>
import { db } from '../firebase-config'
import firebase from 'firebase'

export default {
  name: 'HighScoreFunction',
  data() {
    return {
      isClicked : false,
      highscoreDatas: [],
      hName: '',
      hDate: new Date(),
      hScore: '',
      hRank: ''
    }
  },

  firebase: {
    highscoreBS: db.ref('highscoreData').orderByChild("hScore")
  },

  methods: {

    addHighscorePlayer() {

      db.ref('highscoreData').push({

        hName: this.$store.state.currentUser,
        hDate: this.hDate.getFullYear() + "-" + (this.hDate.getMonth() + 1) + "-" + this.hDate.getDate(),
        hScore: this.$store.state.correctAnswers

      });

    }

  }
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
