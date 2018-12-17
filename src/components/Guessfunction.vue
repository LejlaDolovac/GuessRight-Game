<template>

<div class="brain">
       <div class="intro">
        <h3> Guess the number homie </h3>
        </div>
        <button class="button" @click="timerFunction(); startShow = false; inputDisabled = false; timer = 10" v-show="startShow">Start</button>
        <p>Time left: <span>{{ timer }}</span></p>
        <p> {{ message }} </p>
        <p v-show="hideNum"> {{ this.$store.state.number }} </p>
        <div>

        <input  class="search" type="number" v-model="guessedNumber" @keyup.enter="guessNumber" :disabled="inputDisabled">
        </div>
        <button  class="button btn" @click="guessNumber">Press</button>

        <br>
        <br>
        <p>Your result is: <span>{{ this.$store.state.correctAnswers }}</span> </p>
    </div>
   
</template>

<script>
export default {
    name: 'Guessfunction',
    data() {
      return {
        guessedNumber: '',
        message: '',
        hideNum: false,
        numberInterval: '',
        timerInterval: '',
        timer: 10,
        inputDisabled: true,
        startShow: true
      }
    },
    computed: {
    },
    methods: {
        guessNumber: function () {
          if (this.$store.state.number == this.guessedNumber) {
              this.message = "Correct, my man!";
              this.hideNum = !this.hideNum;
              this.$store.state.correctAnswers++;
              console.log(this.$store.state.correctAnswers);
              this.inputDisabled = true;
              clearInterval(this.timerInterval)
              this.numberInterval = setInterval(() => {
                this.hideNum = false
                this.$store.commit('newRandomNumber')
                this.message = '';
                this.guessedNumber = '';
                this.inputDisabled = true
                this.timer = 10
                this.startShow = true
                clearInterval(this.numberInterval)
              }, 2000);
          } else if (this.$store.state.number > this.guessedNumber) {
              this.message = "The number is higher!";
          } else if (this.$store.state.number < this.guessedNumber) {
              this.message = "The number is lower!";
          }
          },
        timerFunction() {
            this.timerInterval = setInterval(() => {
                this.timer--
                if(this.timer == 0) {
                    clearInterval(this.timerInterval)
                    this.$store.commit('newRandomNumber')
                    this.inputDisabled = true
                    this.timer = "Loser!"
                    this.startShow = true
                    this.message = ''
                }
              }, 1000);
          }
      },
    }
</script>

<style scoped>

p{
    color: midnightblue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.search{
	width: 150px;
	height: 17px;
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
    z-index: 10;
    border-radius: 50px;
}
.search:hover {
	box-shadow: 0px 0px 150px grey;
    z-index: 2;
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(1.5);
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(1.5);
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(1.5);
    transition: all 200ms ease-in;
    transform: scale(1.8);
}
.btn{
background-color:black;
color: white;
}

.button{
 background-color:black;
 color:white;
 width: 30%;
 border: 3px solid purple;
 font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.btn:focus {outline:0;}


</style>
