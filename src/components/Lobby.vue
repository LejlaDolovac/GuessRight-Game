<template>
  <div class="container">
    <h2> Please choose one level <br> <span>&#8595;</span></h2>
     <div class="difficulty">
    <div class='row'>
      <div class="column">
      <img src="../assets/Wall-E.png"  @click="easyNumber"/> <!-- easy -->
      </div>
      <div class="column">
      <button class="button"  @click="mediumNumbers()">Medium</button>
      </div>
      <div class="column">
      <button class=" button" @click="hardNumbers()">Hard</button>
      </div>
       </div>
    </div>
    <router-link to="/gamepage"><button id="start-game">Starta spelet</button></router-link>
  </div>
</template>

<script>
export default {
    name: 'Lobby',
    data() {
      return {
        numbers: [],
        level: 'Please choose one level'
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

.container button {
  width: 100px;
  background-color:black;
  color:darksalmon;
  border: none;
  padding: 10px;
  margin: 20px;
  cursor: pointer
  
}

#start-game {
  width: 200px;
  margin-top: 20px;
  font-size: 1.5em;
}
p{
  color: midnightblue;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 20px;
  box-sizing: border-box;
  
}

h2{
  border: 5px solid orange;
  text-align: center;
  padding: 10px;
  margin-left: 100px;
  margin-right: 100px;
  height:auto;
  color: black;
  box-sizing: border-box;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
@media only screen and (max-width: 1000px){
    h2{
      margin-left: 100px;
      margin-right: 100px;
    }
}

.column{
  float: left;
  height: 80px;
  margin: 20px;
  width: 80px;
}


</style>
