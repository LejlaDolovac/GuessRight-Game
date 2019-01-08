<template>
<div class="modal is-active" v-show="showLevelsPage">
  <div class="modal-background"></div>
  <div class="container">
    <div class="has-background-black">
    <h2 class="has-white-text"> Please choose level and avatar </h2>
    <p> or upload your own image </p>
    <button @click="onUpload">Upload</button> <!-- Uploads the file -->
    <input type="file" @change="onFileSelected">
    </div>
    <div class='row'>

      <div class="column" @keyup.enter="easyNumbers()"> 
        <router-link to="/gamepage">
          <button class="button is-medium is-dark has-text-white" tabindex="-1" @keyup.enter="easyNumbers()" @click="easyNumbers()" id="eButton" type="button"> Easy Level <br />Numbers <br />1-10</button>
        </router-link>
      </div>

        <div class="column" @keyup.enter="mediumNumbers()">
          <router-link to="/gamepage">
            <button class="button is-medium is-success has-text-white" tabindex="-1" @keyup.enter="mediumNumbers()" @click="mediumNumbers()" id="eButton" type="button"> Medium Level <br />Numbers <br />1-30</button>
          </router-link>
        </div>

        <div class="column" @keyup.enter="hardNumbers()">
          <router-link to="/gamepage">
            <button class="button is-medium is-light has-text-white" tabindex="-1"  @click="hardNumbers()" id="eButton" type="button"> Hard Level <br />Numbers <br />1-50</button>
          </router-link> 
        </div>

        <button class="modal-close is-large has-background-black" @keyup.enter="close" @click="close">x</button>
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
        numbers: [],
        selectedFile: null
      }
    },
    computed: {
      showLevelsPage() {
        return this.$store.state.showLevels;  // opens the level page
      }
    },
    
    methods: {
      close() {
        this.$store.state.showLevels = !this.$store.state.showLevels // closes the level menu by clicking anywhere
      },
      
      easyNumbers: function() {   // funktion easy-level
      this.$store.state.easy = true
      this.$store.state.medium = false
      this.$store.state.hard= false
      this.$store.state.levelChosen = true
        this.$store.state.showLevels = !this.$store.state.showLevels
      },
      mediumNumbers: function() {   // funktion medium-level
        this.$store.state.medium = true
        this.$store.state.hard = false
        this.$store.state.easy = false
        this.$store.state.levelChosen = true
          this.$store.state.showLevels = !this.$store.state.showLevels
        
        
      },
      hardNumbers: function() {   // funktion hard-level
        this.$store.state.hard = true,
        this.$store.state.easy = false,
        this.$store.state.medium = false
        this.$store.state.levelChosen = true
          this.$store.state.showLevels = !this.$store.state.showLevels
        },
        onFileSelected (event) {
          this.selectedFile = event.target.files[0] // this is the file the user selected

        },
        // here you upload your own avatar-image
        onUpload() {
          const fd = new FormData(); // sends form-data object
          fd.append('image', this.selectedFile, this.selectedFile.name) 
          axios.post('', fd, {
          onUploadProgress: uploadEvent => {
            console.log('Upload Progress:' + Math.round(uploadEvent / uploadEvent.total * 100)+ '%')
          }
           })
           .then(res =>{
           console.log(res)})
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
  font-size: 2.8em;
  text-transform: uppercase;
  background-color: black;
  background: -webkit-linear-gradient(#FF03A4,#F9F871);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#eButton {
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
}
button:focus { outline: none; }
</style>
