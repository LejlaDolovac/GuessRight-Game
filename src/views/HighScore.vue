<template>
<div class="highscore">
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
      <td>1</td>
      <td>Arnold</td>
      <td>32</td>
      <td>2021-11-13</td>
    </tr>
    <tr class="is-selected" style="background-color:#ab0e86;">
      <td>2</td>
      <td>Francisco</td>
      <td>21</td>
      <td>2017-07-14</td>
    </tr>
    <tr>
      <td>3</td>
      <td>WAll-E</td>
      <td>12</td>
      <td>2041-11-13</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Arnold</td>
      <td>32</td>
      <td>2021-11-13</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Francisco</td>
      <td>21</td>
      <td>2017-07-14</td>
    </tr>
    <tr>
      <td>6</td>
      <td>WAll-E</td>
      <td>12</td>
      <td>2041-11-13</td>
    </tr>
    <tr>
      <td>7</td>
      <td>WAll-E</td>
      <td>12</td>
      <td>2041-11-13</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Arnold</td>
      <td>32</td>
      <td>2021-11-13</td>
    </tr>
    <tr>
      <td>9</td>
      <td>Francisco</td>
      <td>21</td>
      <td>2017-07-14</td>
    </tr>
    <tr>
      <td>10</td>
      <td>WAll-E</td>
      <td>12</td>
      <td>2041-11-13</td>
    </tr>
  </table>
  <br>
  <router-link to="/"><button class="button is-black">Back to start page</button></router-link>
</div>
</template>

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
