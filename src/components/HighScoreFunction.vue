<template>
  <div class="container">
    <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
    <h1>HighScore</h1>
    <table class="table is-bordered is-striped is-narrow is-hoverable">
      <thead style="background-color:#FAE100;">
        <th>Rank</th>
        <th>Name</th>
        <th>Score</th>
        <th>Date</th>
      </thead>
      <tr>
        <td>Rank</td>
        <td>Wall-E</td>
        <td>32</td>
        <td>2021-11-13</td>
      </tr>
      <tr class="is-selected">
        <td>rank</td>
        <td>Arnold</td>
        <td>32</td>
        <td>2021-11-13</td>
      </tr>
</table>
<br>
 <router-link to="/"><button class="button is-primary">Back to start page</button></router-link>
  </div>
</template>

<script>

//v-if newHighscore   class="is-selected"



export default {
    name: 'HighScoreFunction'
          }


/*
Funktion för att få datum
getFullYear() + "-" + getMonth() + "-" + getDate()

Function add data.
rank name date score

How do we get score. bots/players
input only when entering highscore.
diffrent highscore players/bots
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
