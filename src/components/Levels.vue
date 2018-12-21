<template>
  <div class="container">
    <h2> Please choose one level <br> <span>&#8595;</span></h2>
     <div class="difficulty">
    <div class='row'>
      <router-link to="/gamepage">  <div class="column">
      <button @click="easyNumbers()" id="eButton" type="button"> Easy Level </button>
     <!-- <img src="../assets/Wall-E.png"  class="pic" alt="easy level" @click="easyNumbers()"/>  easy -->
      </div></router-link>
      <div class="column">
    <!--  <img src="../assets/R2D2.png"  class="pic" alt="medium level" @click="mediumNumbers()"/>  medium -->
      <button @click="mediumNumbers()" id="eButton" type="button"> Medium Level </button>
      </div>
      <div class="column">
     <!-- <img src="../assets/terminator.png" class="pic" alt="hard level" @click="hardNumbers()"/>  hard -->
      <button @click="hardNumbers()" id="eButton" type="button"> Hard Level </button>
      </div>
       </div>
    </div>
    <!-- <router-link to="/gamepage"><button id="start-game">Starta spelet</button></router-link> -->

  </div>
</template>

<script>
export default {
    name: 'Levels',
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
        this.$store.state.easy = !this.$store.state.easy
        console.log(this.$store.state.easy)
      },
      mediumNumbers: function() {
        console.log("medium level here")
      },
      hardNumbers: function() {
        console.log("hard level here")
      }
    }
}
</script>

<style scoped>

.container button {
  background-color: transparent;
  width: 100px;
  color:black;
  border: none;
  padding: 10px;
  margin: 20px;
  cursor: pointer

}

#start-game {
  width: 200px;
  margin-top: 20px;
  font-size: 1.5em;
  border: 1px solid rgb(185, 77, 185);
   box-shadow: 0 0 10px rgb(185, 94, 185);
}


h2{
  text-align: center;
  padding: 10px;
  height:auto;
  max-width: 400px;
  margin: 0 auto;
  color: black;
  box-sizing: border-box;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 30px;
  box-shadow: 0 0 10px rgb(185, 86, 185);
  text-transform: uppercase;
}
@media only screen and (max-width: 1000px){
    h2{
      height: auto;
      width: 100%;
    }
}

* {
  box-sizing: border-box;
}

.column{
  max-width: 30%;
  padding: 5px;
  float: left;
}

.row::after {
  content: "";
  clear: both;
  display: table;
}
 .row{
   margin-left: auto;
   margin-right: auto;
   max-width: 27%;
 }
.pic{
  border: 3px solid rgb(185, 74, 185);
  border-radius: 50%;
  margin: 20px 5px 20px;

}

#eButton{
  border: 1px solid rgb(185, 78, 185);
  box-sizing: border-box;
  box-shadow: 0 0 10px rgb(185, 102, 185);
  height: auto;
  max-width: 100px;
  margin: 0 auto;
  padding: 15px;
  margin-top: 25px;
  font-size: 15px;

}
button:focus { outline: none; }



</style>
