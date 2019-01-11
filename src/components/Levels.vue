<template>

<div class="modal is-active" v-show="showLevelsPage">
    <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
  <div class="modal-background"></div>
  <div class="container">
    <div class="has-background-black">
    <h2 class="has-white-text"> CHOOSE LEVEL AND <router-link to="/gamepage" ><span class="has-white-text" @click="chuckNumbers()">AVATAR</span></router-link> </h2>
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
        <h4 class="is-size-4 has-text-white">Choose a level</h4>

        <div class="column" @click="easyNumbers()" @keyup.enter="easyNumbers()"> 
          <router-link to="/gamepage">
          <div class="eButton easy">
            <a class="gradient is-size-3 is-size-4-mobile has-text-white" tabindex="-1">
              Easy
            </a>
              <span class="has-text-white is-pulled-right is-size-6">Numbers 1-10</span>
          </div>
          </router-link>
        </div>

        <div class="column" @click="mediumNumbers()" @keyup.enter="mediumNumbers()">
          <router-link to="/gamepage">
          <div class="eButton medium is-dark">
            <a class="gradient is-size-3 is-size-4-mobile has-text-white" tabindex="-1" @keyup.enter="mediumNumbers()" @click="mediumNumbers()">
              Medium
            </a>
             <span class="has-text-white is-pulled-right is-size-6">Numbers 1-30</span>
          </div>
          </router-link>
        </div>

        <div class="column" @click="hardNumbers()" @keyup.enter="hardNumbers()">
          <router-link to="/gamepage">
          <div class="eButton hard is-dark">
            <a class="gradient is-size-3 is-size-4-mobile has-text-white" tabindex="-1" @keyup.enter="hardNumbers()" @click="hardNumbers()">
              Hard
            </a>
              <span class="has-text-white is-pulled-right is-size-6">Numbers 1-50</span>
          </div>
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
        this.$store.state.chuck = false
        this.$store.state.levelChosen = true
        this.$store.state.showLevels = !this.$store.state.showLevels
      },
      mediumNumbers: function() {   // function medium-level
        this.$store.state.medium = true
        this.$store.state.hard = false
        this.$store.state.easy = false
        this.$store.state.chuck = false
        this.$store.state.levelChosen = true
        this.$store.state.showLevels = !this.$store.state.showLevels
      },
      hardNumbers: function() {   // function hard-level
        this.$store.state.hard = true,
        this.$store.state.easy = false,
        this.$store.state.medium = false
        this.$store.state.chuck = false
        this.$store.state.levelChosen = true
        this.$store.state.showLevels = !this.$store.state.showLevels
        },
      chuckNumbers: function() {   // function hard-level
        this.$store.state.hard = false,
        this.$store.state.easy = false,
        this.$store.state.medium = false
        this.$store.state.chuck = true
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
  .container {
    width: 45%;
    background-color: red; /* For browsers that do not support gradients */
    background-image: linear-gradient(to right, #FF03A4 , #FF407E , #FF755F, #FFA64C, #FFD150, #F9F871); /* Standard syntax (must be last) */
  }
  .container a {
    text-align: left;
    background-color: transparent;
    color:black;
    border: none;
    cursor: pointer;
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
  h2 span {
    font-size: 1em;
  }
  h4 {
    font-family: 'Black Ops One', cursive;
    color: white;
    padding: 10px;
  }
  .gradient {
    font-family: 'Black Ops One', cursive;
  }
  .eButton {
    border: 1px solid rgb(185, 78, 185);
    box-shadow: 0 0 10px rgb(185, 102, 185);
    padding-left: 12%;
  }
  .easy:hover {
    background-color: #FFD150;
  }
  .medium:hover {
    background-color: #FF755F;
  }
  .hard:hover {
    background-color: #FF03A4;
  }
  .column {
    float: left;
    align-items: center;
    background-color: black;
    margin: 5px;
    border-radius: 10px;
  }
  .row {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
  }
  .has-background-black {
    border-radius: 10px;
    margin: 5px;
  }
  .is-pulled-right {
    padding-right: 7%;
    padding-top: 3%;
    text-align: right;
    font-family: 'Black Ops One', cursive;
  }
  span {
    font-size: 0.5em;
  }
  figure {
    display: inline-block;
    margin: 10px;
  }
  img:hover {
    opacity: 0.5;
  }

  @media only screen and (max-width: 1010px) {
    .container {
      width: 55%;
    }
    .image {
      margin: 0 auto;
      padding: 2%;
    }
  }

  @media only screen and (max-width: 720px) {
    .container {
      width: 85%;
    }
    .image {
      padding: 2%;
    }
    .is-pulled-right {
      padding-top: 2%;
    }
  }

  @media only screen and (max-width: 500px) {
    .container {
      width: 95%;
    }
    .image {
      padding: 3%;
    }
    .eButton {
      padding-left: 3%;
    }
    .is-pulled-right {
      padding-right: 2%;
      padding-top: 1.5%;
    }
  }
</style>
