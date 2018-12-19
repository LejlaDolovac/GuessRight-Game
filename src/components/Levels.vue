<template>
<div class="modal is-active" v-show="showLevelsPage">
  <div class="modal-background"></div>
  <div class="modal-content has-background-primary has-text-white">
  <div class="container">
    <h2> Please choose one level <br> <span>&#8595;</span></h2>
     <div class="difficulty">
    <div class='row'>
      <div class="column">
      <router-link to="/gamepage">
        <button @click="easyNumbers()" id="eButton" type="button"> Easy Level </button>
      </router-link>
     <!-- <img src="../assets/Wall-E.png"  class="pic" alt="easy level" @click="easyNumbers()"/>  easy -->
      </div>
      <div class="column">
    <!--  <img src="../assets/R2D2.png"  class="pic" alt="medium level" @click="mediumNumbers()"/>  medium -->
      <router-link to="/gamepage">
        <button @click="mediumNumbers()" id="eButton" type="button"> Medium Level </button>
      </router-link>
      </div>
      <div class="column">
     <!-- <img src="../assets/terminator.png" class="pic" alt="hard level" @click="hardNumbers()"/>  hard -->
      <router-link to="/gamepage">
        <button @click="hardNumbers()" id="eButton" type="button"> Hard Level </button>
      </router-link>
      <button class="modal-close is-large has-background-black" @click="close">x</button>
      </div>
      </div>
    </div>
<<<<<<< HEAD
    <router-link to="/gamepage"><button id="start-game">Starta spelet</button></router-link>

=======
    </div>
>>>>>>> eb83a3079fa4cb2094a3733beb59c76d8d7968d7
  </div>
</div>
</template>

<script>
export default {
    name: 'Levels',
    data() {
      return {
        numbers: []
      }
    },
    computed: {
      showLevelsPage() {
        return this.$store.state.showLevels;
      }
    },
    
    methods: {
<<<<<<< HEAD
      easyNumbers: function() {
      this.$store.state.easy = true,
      this.$store.state.medium = false,
      this.$store.state.hard= false

=======
      close() {
        this.$store.state.showLevels = !this.$store.state.showLevels
      },
      easyNumbers: function() { 
      this.$store.state.easy = true
      this.$store.state.medium = false
      this.$store.state.hard= false
      this.$store.state.levelChosen = true
>>>>>>> eb83a3079fa4cb2094a3733beb59c76d8d7968d7
      },
      mediumNumbers: function() {
        this.$store.state.medium = true
        this.$store.state.easy = false
        this.$store.state.hard = false
<<<<<<< HEAD
        }

=======
        this.$store.state.levelChosen = true
        console.log(this.$store.state.medium)
>>>>>>> eb83a3079fa4cb2094a3733beb59c76d8d7968d7
      },
      hardNumbers: function() {
        this.$store.state.hard = true
        this.$store.state.easy = false
        this.$store.state.medium = false
        this.$store.state.levelChosen = true
        console.log(this.$store.state.hard)
      }
<<<<<<< HEAD

=======
     }
  }
    
</script>
>>>>>>> eb83a3079fa4cb2094a3733beb59c76d8d7968d7

</script>
<!-- STYLES GOES DOWN HERE -->
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




h2{
  text-align: center;
  padding: 10px;
  height:auto;
  max-width: 400px;
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
<<<<<<< HEAD

=======
>>>>>>> eb83a3079fa4cb2094a3733beb59c76d8d7968d7
}

<<<<<<< HEAD
</style>
=======
button:focus { outline: none; }
</style>
>>>>>>> eb83a3079fa4cb2094a3733beb59c76d8d7968d7
