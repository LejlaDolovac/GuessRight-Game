<template>

<div class="brain">
        <div id="player-bot-div modal">
           <img alt="Player vs bot" id="player-bot-img" src="../assets/player.jpg">
        </div>
        <div class="game-div">
        <button class="start-btn button is-medium" v-if="startShow" @click="timerFunction(); startShow = false; timerShow = true; inputDisabled = false; timer = 10;" v-show="startShow">START</button>
        <div v-else ref="timeLeft" class="message-body timer">{{ timer }}</div>
        <p v-if="message != ''" class="message-body winner-loser-message"> {{ message }} </p>
        <!--<p v-show="hideNum"> {{ this.$store.state.number }} </p>-->
        <div>
        <input v-if="!startShow" class="search" type="number" v-model="guessedNumber" @keyup.enter="guessNumber" :disabled="inputDisabled">
        </div>
        <button v-if="!startShow" class="button btn" @click="guessNumber" :disabled="inputDisabled">Press</button>
        <br>
        </div>
        <p class="message-body wins-correct-message">Score: <span>{{ this.$store.state.correctAnswers }}</span> Tries left: <span>{{ numberOfTries }}</span> </p>
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
        startShow: true,
        numberOfTries: 5,
        timerShow: false,
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
                this.timerShow = false
                if(this.numberOfTries == 0) {
                    this.message = "Tries up, my man! Winner?"
                    this.startShow = true
                    this.$refs.timeLeft.value = '';
                }
                clearInterval(this.numberInterval)
              }, 2000);
          } else if (this.$store.state.number > this.guessedNumber) {
              this.message = "The number is higher!";
          } else if (this.$store.state.number < this.guessedNumber) {
              this.message = "The number is lower!";
          }
          },
        timerFunction() {
            this.numberOfTries--
            this.message = ''
            this.timerInterval = setInterval(() => {
                this.timer--
                if(this.timer == 0) {
                    clearInterval(this.timerInterval)
                    this.$store.commit('newRandomNumber')
                    this.inputDisabled = true
                    this.timer = "Loser!"
                    this.startShow = true
                    this.message = ''
                    this.timerShow = false
                    if (this.numberOfTries == 0) {
                        this.message = "Tries up! loser?"
                        this.startShow = false;
                        this.$refs.timeLeft.value = '';
                        this.startShow = true
                        this.numberOfTries = 5;
                    }
                }
              }, 1000);
          }
      },
    }
</script>

<style scoped>
* {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
h3 {
    padding: 20px 0 5px;
    color: #351304;
}
p{
    color: midnightblue;
    /*font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;*/
}
.timer {
    padding: 20px;
    background-color: #351304;
    color:cornsilk;
    text-align: center;
    font-size: 30px;
}
#player-bot-div {
    width: 100%;
    height: 100px;
    justify-content: center;
}
#player-bot-img {
    width: 30%;
    height: auto;
    position: relative;
}
.start-btn {
  background: #351304;
  font-weight: bold;
  color: cornsilk;
  margin-bottom: 20px;
}
.search{
    background-color: cornsilk;
	width: 150px;
	height: 17px;
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
    z-index: 10;
    border-radius: 50px;
    padding: 10px;
    margin: 10px;
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
    margin-top: 10px;
    color: cornsilk;
    background-color: #351304;
}
.btn:focus {
    outline:0;
}
.wins-correct-message {
    padding: 20px;
    background-color: #351304;
    color:cornsilk;
    text-align: center;
    font-size: 25px;
}
.wins-correct-message span {
    background-color: #351304;
    color:cornsilk;
    text-align: center;
    font-size: 25px;
}
@media only screen and (max-width: 600px) {
    #player-bot-img {
        width: 100%;
        border-bottom: 2px solid white;
    }
    .start-btn {
        width: 90%;
        height: 350px;
        margin-top: 10px;
        font-size: 60px;
        margin-bottom: 10px;
    }
    .winner-loser-message {
        padding: 20px;
        background-color: #351304;
        color:cornsilk;
        text-align: center;
        font-size: 20px;
        }
    .winner-loser-message span {
        background-color: #351304;
        color:cornsilk;
        text-align: center;
        font-size: 20px;
    }
    .search {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        font-size: 35px;
        text-align: center;
        margin: 10px;
    }
    .search:hover {
        transform: scale(1.2);
    }
    #time-left-timer {
        height: 60px;
    }
    .btn {
        width: 210px;
        height: 70px;
        font-size: 25px;
        margin: 5px;
    }

.button{
 background-color:black;
 color:white;
 width: 30%;
 border: 3px solid purple;
 font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
}
</style>
