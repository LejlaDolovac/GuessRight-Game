<template>

<div class="modal is-active" v-show="showLevelsPage">
    <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
  <div class="modal-background"></div>
  <div class="container">
    <div class="has-background-black">
    <h2 class="has-white-text"> Please choose level and avatar </h2>
     <h3>Please choose an avatar</h3>
    <figure  class="image is-128x128">
      <img v-bind:class="{imageBorder: this.$store.state.imageBorder1}" @click="selectedImage1();" class="image is-rounded" :alt="`Your profile picture`" src="../assets/homer_mindre.jpg"> 
    </figure>
    <figure class="image is-128x128">
      <img v-bind:class="{imageBorder: this.$store.state.imageBorder2}" @click="selectedImage2();" class="image is-rounded" :alt="`Your profile picture`" src="../assets/kenny.jpg"> 
    </figure>
    <figure class="image is-128x128">
      <img v-bind:class="{imageBorder: this.$store.state.imageBorder3}" @click="selectedImage3();" class="image is-rounded " :alt="`Your profile picture`" src="../assets/kermit.jpg">  
    </figure>
   
    </div>
      
      <div class="row">
        <h3> Please choose a level</h3>
        <div class="column" @keyup.enter="easyNumbers()"> 
          <router-link to="/gamepage">
            <button class="eButton button is-medium is-dark has-text-white" tabindex="-1" @keyup.enter="easyNumbers()" @click="easyNumbers()" type="button"> Easy Level <br />Numbers <br />1-10</button>
          </router-link>
        </div>

        <div class="column" @keyup.enter="mediumNumbers()">
          <router-link to="/gamepage">
            <button class="eButton button is-medium is-success has-text-white" tabindex="-1" @keyup.enter="mediumNumbers()" @click="mediumNumbers()" type="button"> Medium Level <br />Numbers <br />1-30</button>
          </router-link>
        </div>

        <div class="column" @keyup.enter="hardNumbers()">
          <router-link to="/gamepage">
            <button class="eButton button is-medium is-light has-text-white" tabindex="-1"  @click="hardNumbers()" type="button"> Hard Level <br />Numbers <br />1-50</button>
          </router-link> 
        </div>

        <button class="modal-close is-large is-marginless has-background-black" @keyup.enter="close" @click="close">x</button>
    </div>
   </div>
   </div>

</template>

<script>

export default {
    name: 'Levels',
    data() {
      return {
        numbers: [],
        selectedFile: null,
      }
    },
    computed: {
      showLevelsPage() {
        return this.$store.state.showLevels;  // opens the level page
      }
    },
    methods: {
     
      close (){
        this.$store.state.showLevels = !this.$store.state.showLevels // closes the menu by clicking on the 'X'
      },
      // Selects the image and selects the selected image with a border
      selectedImage1(){
        this.$store.state.imageNumber = 1,
        this.$store.state.imageBorder1 = true;
        this.$store.state.imageBorder2 = false;
        this.$store.state.imageBorder3 = false;
      },
      selectedImage2(){
        this.$store.state.imageNumber = 2
        this.$store.state.imageBorder2 = true;
        this.$store.state.imageBorder1 = false;
        this.$store.state.imageBorder3 = false;
        
      },
      selectedImage3(){
        this.$store.state.imageNumber = 3
        this.$store.state.imageBorder3 = true;
        this.$store.state.imageBorder1 = false;
        this.$store.state.imageBorder2 = false;
      },
      easyNumbers: function() {   // function easy-level
        this.$store.state.easy = true
        this.$store.state.medium = false
        this.$store.state.hard= false
        this.$store.state.levelChosen = true
        this.$store.state.showLevels = !this.$store.state.showLevels
      },
      mediumNumbers: function() {   // function medium-level
        this.$store.state.medium = true
        this.$store.state.hard = false
        this.$store.state.easy = false
        this.$store.state.levelChosen = true
        this.$store.state.showLevels = !this.$store.state.showLevels
      },
      hardNumbers: function() {   // function hard-level
        this.$store.state.hard = true,
        this.$store.state.easy = false,
        this.$store.state.medium = false
        this.$store.state.levelChosen = true
          this.$store.state.showLevels = !this.$store.state.showLevels
        },
      }
     }
</script>

<style scoped>


 .imageBorder{
   border: 7px solid #FF03A4;
    box-shadow: 0 0  15px  #FF03A4;
 }
 
.image{
  margin: 10px;
}
.container {
  width: 75%;
  overflow-y: scroll;
  background-color: red; /* For browsers that do not support gradients */
  background-image: linear-gradient(to right, #FF03A4 , #FF407E , #FF755F, #FFA64C, #FFD150, #F9F871); /* Standard syntax (must be last) */
}
.container button {
  background-color: transparent;
  width: 100%;
  color:black;
  border: none;
  padding: 10px;
  margin: 40px;
  cursor: pointer
}
h2 {
  text-align: center;
  padding: 10px;
  height: auto;
  font-family:  'Black Ops One', cursive;
  font-size: 2.8em;
  text-transform: uppercase;
  background-color: black;
  background: -webkit-linear-gradient(#FF03A4,#F9F871);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.eButton {
  border: 1px solid rgb(185, 78, 185);
  box-shadow: 0 0 10px rgb(185, 102, 185);
  height: auto !important;
  margin: 0 auto !important;
  font-size: 1.5em;
}
.column {
  max-width: 100%;
  padding: 10px;
  float: left;
  align-items: center;
  background-color: black;
  margin: 3px;
}
.row {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.has-background-black {
  margin: 3px;
}
span {
  font-size: 0.5em;
}
figure{
  display: inline-block;
  margin: 10px;
}
h3{
  background: -webkit-linear-gradient(#FF03A4,#F9F871);
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: black;
}
img:hover{
  opacity: 0.5;
}
</style>
