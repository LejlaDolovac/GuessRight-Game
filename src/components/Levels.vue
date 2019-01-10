<template>
  <div class="modal is-active" v-show="showLevelsPage">
  <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
    <div class="modal-background"></div>
    <div class="container">
      <div class="has-background-black">
      <h2 class="has-white-text"> Choose level and avatar </h2>
      <h3>Choose an avatar</h3>
        <figure class="image is-128x128">
          <img tabindex="0" @keyup.enter="selectedImage1()" @click="selectedImage1();" class="image is-rounded" :alt="`Your profile picture`" src="../assets/homer_mindre.jpg"> 
        </figure>
        <figure class="image is-128x128">
          <img tabindex="0" @keyup.enter="selectedImage2()" @click="selectedImage2();" class="image is-rounded" :alt="`Your profile picture`" src="../assets/kenny.jpg"> 
        </figure>
        <figure class="image is-128x128">
          <img tabindex="0" @keyup.enter="selectedImage3()" @click="selectedImage3();" class="image is-rounded " :alt="`Your profile picture`" src="../assets/kermit.jpg">  
        </figure>
      </div>
        
      <div class="row">
        <h3>Choose a level</h3>

        <div class="column" @keyup.enter="easyNumbers()"> 
          <router-link to="/gamepage">
          <div class="eButton easy">
            <button class="button gradient is-size-3 has-text-white" tabindex="-1" @keyup.enter="easyNumbers()" @click="easyNumbers()" type="button">
              Easy Level 
              <span style="margin:0 15%;"></span>
              <span class="has-text-white is-size-6">Numbers 1-10</span>
            </button>
          </div>
          </router-link>
        </div>

        <div class="column" @keyup.enter="mediumNumbers()">
          <router-link to="/gamepage">
          <div class="eButton medium is-dark">
            <button class="button gradient is-size-3 has-text-white" tabindex="-1" @keyup.enter="mediumNumbers()" @click="mediumNumbers()" type="button">
              Medium Level 
             <span style="margin:0 15%;"></span>
              <span style="margin: 0 4.5% 0 -1%;" class="has-text-white is-size-6">Numbers 1-30</span>
            </button>
          </div>
          </router-link>
        </div>

        <div class="column" @keyup.enter="hardNumbers()">
          <router-link to="/gamepage">
          <div class="eButton hard is-dark">
            <button class="button gradient is-size-3 has-text-white" tabindex="-1" @keyup.enter="hardNumbers()" @click="hardNumbers()" type="button">
              Hard Level 
              <span style="margin:0 15%;"></span>
              <span class="has-text-white is-size-6">Numbers 1-50</span>
            </button>
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
        dataImages: 3 // when you select an avatar
      }
    },
    computed: {
      // shows the levelpage
      showLevelsPage() {
        return this.$store.state.showLevels;  // opens the level page
      }
    },
    methods: {
      closeLevels() {
        this.$store.state.closeLevels = true  // closes the level menu by clicking anywhere - behövs jobba vidare på
      },
      close (){
        this.$store.state.showLevels = !this.$store.state.showLevels // closes the menu by clicking on the 'X'
      },
      selectedImage1(){
        this.$store.state.imageNumber = 1
      },
      selectedImage2(){
        this.$store.state.imageNumber = 2
      },
      selectedImage3(){
        this.$store.state.imageNumber = 3
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
  .image {
    margin: 10px;
  }
  .container {
    width: 60%;
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
  .gradient {
    font-family:  'Black Ops One', cursive;
  }
  .eButton {
    border: 1px solid rgb(185, 78, 185);
    box-shadow: 0 0 10px rgb(185, 102, 185);
    height: auto !important;
    margin: 0 auto !important;
    font-size: 1.5em;
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
  figure {
    display: inline-block;
    margin: 10px;
  }
  h3 {
    background: -webkit-linear-gradient(#FF03A4,#F9F871);
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: black;
  }
  img:hover {
    opacity: 0.5;
  }
</style>
