<template>
<div class="modal is-active" v-show="showLevelsPage">
  <div class="modal-background"></div>
  <div class="modal-content has-background-black has-text-white">
  <div class="container">
    <h2 class="title is-2 has-text-warning">Please choose one level <br> <span>&#8595;</span></h2>
     <div class="difficulty">
    <div class='row'>
      <router-link to="/gamepage">  <div class="column">
      <button class="button is-medium is-primary" @click="easyNumbers()" id="eButton" type="button"> Easy Level </button>
      </div></router-link>
      <div class="column">
      <router-link to="/gamepage">
        <button class="button is-medium is-primary" @click="mediumNumbers()" id="eButton" type="button"> Medium Level </button>
      </router-link>
      </div>
      <div class="column">
      <router-link to="/gamepage">
        <button class="button is-medium is-primary" @click="hardNumbers()" id="eButton" type="button"> Hard Level </button>
      </router-link>
      <button class="modal-close is-large has-background-black" @click="close">x</button>
      </div>
      </div>
    </div>
    </div>

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
        return this.$store.state.showLevels;  // öppnar ( ?)
      }
    },
    methods: {
      close() {
        this.$store.state.showLevels = !this.$store.state.showLevels // stänger när man valt en nivå
      },
      easyNumbers: function() {   // funktion för easy-nivåm
      this.$store.state.easy = true
      this.$store.state.medium = false
      this.$store.state.hard= false
      this.$store.state.levelChosen = true
        this.$store.state.showLevels = !this.$store.state.showLevels
      },
      mediumNumbers: function() {   // funktion för medium-nivån
        this.$store.state.medium = true
        this.$store.state.hard = false
        this.$store.state.easy = false
        this.$store.state.levelChosen = true
          this.$store.state.showLevels = !this.$store.state.showLevels
        
        
      },
      hardNumbers: function() {   // funktion för hard-nivån
        this.$store.state.hard = true,
        this.$store.state.easy = false,
        this.$store.state.medium = false
        this.$store.state.levelChosen = true
          this.$store.state.showLevels = !this.$store.state.showLevels
        }
      }
     }
  

</script>

<style scoped>
.modal, .modal-content {
  width: 100%;
  overflow-x: hidden;
}
h2{
  padding: 20px;
  margin: 20px;
  color: black;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 30px;
  box-shadow: 0 0 10px rgb(185, 86, 185);
  text-transform: uppercase;
}
#eButton{
  border: 1px solid rgb(185, 78, 185);
  box-shadow: 0 0 10px rgb(185, 102, 185);
  height: auto;
  width: 100px;
  padding: 15px;
  margin-top: 25px; 
  font-size: 15px;
}
@media only screen and (max-width: 1000px){
.pic{
  border: 3px solid rgb(155, 123, 155);
  border-radius: 50%;
  margin: 20px 5px 20px;
}
button:focus { outline: none; }
}
</style>
