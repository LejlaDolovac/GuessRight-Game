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
        <td>Arnold</td>
        <td>32</td>
        <td>2021-11-13</td>
      </tr>
      <tr class="is-selected">
        <td>Rank</td>
        <td>Arnold</td>
        <td>32</td>
        <td>2021-11-13</td>
      </tr>
</table>
  </div>
</template>

<script>

export default {
    name: 'HighScoreFunction'
      }
</script>

<style scoped>

h1 {
  font-size: 4em;
  font-family: 'Black Ops One', cursive;
  color: black;
}

.highscore {
  background-image: linear-gradient(to bottom right, yellow, #e01171, #ab0e86, #59057b, #0f0766);
  height: 1000px;
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
