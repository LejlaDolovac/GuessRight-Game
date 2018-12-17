<template>
  <div class="container">
    <!-- <div class="header is-centered">
      <h1 class="title is-size-3-mobile is-size-1-tablet">Guess Right</h1>
    </div>
    <div class="nav buttons is-centered">
      <router-link to="/gamepage"><button class="yellow button">Play</button></router-link>
      <button class="purple button" @click="openRules()">Rules</button>
      <button class="pink button">High score</button>  router-link till high score-sida -->
    <h2> Please choose one level <br> <span>&#8595;</span></h2>
     <div class="difficulty">
    <div class='row'>
      <div class="column">
      <img src="../assets/Wall-E.png"  @click="easyNumbers()"/> <!-- easy -->
      </div>
      <div class="column">
      <button class="button"  @click="mediumNumbers()">Medium</button>
      </div>
      <div class="column">
      <button class=" button" @click="hardNumbers()">Hard</button>
      </div>
       </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Lobby',
    data() {
      return {
        numbers: [],
        active: true,
        level: 'Please choose one level'
      }
    },
    computed: {
    },
    methods: {
      openRules: function() {
        alert("HON HETER ANNA. ANNA HETER HON.")
        // öppna regelmodulen
      },
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
      close: function() {
        this.active = !this.active
        console.log("hi")
      }
    }
  }
</script>

<style scoped>

.container {
  width: 95%;
  margin: auto;
  margin-top: 60px;
}

h1 {
  margin-bottom: 30px;
}
.container button {
  width: 100px;
  background-color:black;
  color:darksalmon;
  border: none;
  padding: 10px;
  margin: 20px;
  cursor: pointer
  
}

.nav {
  max-width: 300px;
  margin: auto;
}

.button {
  width: 200px;
  background-color: Black;
  color: White;
  border-width: 5px;
  padding: 20px;
  margin-top: 10px;
  text-transform: uppercase;
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


.button:not(:last-child):not(.is-fullwidth) {margin-right: 0px;}

.pink {border-color: #ab0e86;}
.purple {border-color: #59057b;}
.yellow {border-color: #fae100;}

@media (min-width: 600px) {
  .button {
    width: 300px;
    font-size: 1.4em;
  }
}

@media (min-width: 992px) {
  .nav {
    max-width: 400px;
  }
  .button {
    width: 400px;
    font-size: 1.6em;
  }
}


</style>
